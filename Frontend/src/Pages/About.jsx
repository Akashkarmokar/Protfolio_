import { useEffect, useState } from 'react';
import { Blog, BlogList, Counter, Profile,Skills } from '../Components'
import { gql, useLazyQuery, useMutation } from "@apollo/client";





const TagQuery = gql`
  query TagListing {
    TagListing {
      _id
      title
    }
  }
`



const About = ()=>{
    const [ tagList, setTagList ] = useState([]);

    const [ selectedTag, setSelectedTag ] = useState([]);

    const [ Tagsercher, { error, loading, data }] = useLazyQuery(TagQuery, {
            fetchPolicy: 'no-cache'
        }
    ); 

    useEffect(()=> {
        try {
            const searchTag = async ()=> {
                const response = await Tagsercher({
                    variables: {
                        inputData: {

                        }
                    }
                })
                if(response.data.TagListing){
                    setTagList(prev => [...prev, ...response.data.TagListing]);
                }
            };
            searchTag()
        }catch(err) {
            console.log("ER:" , err)
        }
    }, []);

    const handleTagSelection = (tag_id)=> {
        const existedTags = [ ...selectedTag ];
        if(existedTags.includes(tag_id)) {
            setSelectedTag(prev => prev.filter(item => item != tag_id))
        }else {
            setSelectedTag(prev => [...prev, tag_id])
        }
    };

    return (
            <div className='main-container space-y-5'>
                <div className='main-container p-10'>
                    <Profile/>
                </div>
                <div className='main-container flex items-start justify-center '>
                    <div className='min-w-[75%]'>
                        <BlogList selectedTags = {selectedTag}/>
                    </div>

                    
                    {/**
                     * Tags Section
                     */}
                    {
                        tagList.length ?

                        <div className='ml-5 flex flex-col items-center justify-center rounded-md border '>
                            <h2 className='text-2xl font-bold'>Selected Tags {selectedTag.length ? selectedTag.length : 0}</h2>
                            <div className='m-2'>
                                <ul className='flex flex-row gap-2 items-center justify-start flex-wrap'>
                                    { 
                                        tagList.map((each_tag)=> {
                                            return <li onClick={(e)=> handleTagSelection(each_tag._id)} className={`bg-[#242424] text-white p-1 rounded-md border ${ selectedTag.includes(each_tag._id) ? 'border-[#00DF9A]' : 'border-[#00000]'}  cursor-pointer`}>{each_tag.title}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                </div>
                
    )
}

export default About;