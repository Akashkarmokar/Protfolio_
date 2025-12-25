import React, { useState, useEffect, useRef } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { makeToast } from "../Helpers";



const TagQuery = gql`
  query TagListing {
    TagListing {
      _id
      title
    }
  }
`


const CreateTag = gql`
  mutation Mutation($inputData: CreateTagInput) {
    CreateTag(inputData: $inputData) {
      _id
      title
    }
  }
`

export default function MultiSelectDropdown( { setItems, givenOptionList}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);
  const [optionsList, setOptionsList] = useState([]);

  const [ Tagsercher, { error, loading, data }] = useLazyQuery(TagQuery, {
    fetchPolicy: 'no-cache'
  });  

  const [ CrateTagMutation ] = useMutation(CreateTag);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    
    setSelected(prev => prev.findIndex((each_option)=> each_option._id == option._id ) != -1 ? prev.filter(item => item._id !== option._id) : [ ...prev, option] )
    
    setItems(prev => {
      console.log("PREV: ", prev)
      return prev.findIndex((each_id)=> each_id == option._id ) != -1 ? prev.filter(item => item !== option._id ) : [ ...prev, option._id ] 
    })

  };

  const filteredOptions = optionsList.filter((opt) =>
    opt.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if(givenOptionList && Array.isArray(givenOptionList) && givenOptionList.length > 0) {
      givenOptionList.forEach((item)=> {
        handleSelect(item)
      })
    }
  }, []);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=> {
    try {
      const GetTags = async ()=> {
        const response = await Tagsercher({
          variables: {
            
          },
          
        });
        if(response.data.TagListing) {
          setOptionsList((prev)=> [...prev, ...response.data.TagListing ]);
        }
      }
      GetTags()
      
    }catch(err){
      console.log("ERROR: ", err)
    }
  }, []);


  const handleSaveTag = (e)=> {
    try {
      const createTag = async ()=> {
        const response = await CrateTagMutation({
          variables: {
            inputData: {
              title: search
            }
          }
        });
        if(response.data.CreateTag) {
          makeToast("Tag Created Successfully")
          // setOptionsList(prev => [...prev, CreateTag])
          setSearch("")
        }
      }
      createTag();
    }catch(err){
      console.log("ERROR of save Tag: ", err.message);
    }
  } 



  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
      >
        {selected.length === 0 ? "Select options..." : selected.map(option => option.title).join(", ")}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
          <input
            type="text"
            className="w-full text-black p-2 border-b border-gray-200 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredOptions.map((option) => (
            <label
              key={option._id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer "
            >
              <input
                type="checkbox"
                // checked={selected.includes(option)}
                checked={ selected.findIndex((item)=> item._id == option._id) !== -1 }

                onChange={() => handleSelect(option)}
                className="mr-2"
              />
              <p className="text-sm text-gray-700 scroll-hide">{option.title}</p>
            </label>
          ))}

          {filteredOptions.length === 0 && (
            <div>
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
              <button onClick={handleSaveTag} className="text-black border border-[#000000] rounded-md">Save it</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
