import { GrFormClose } from "react-icons/gr";
import { useState, useEffect } from 'react'
import { Sidebar, DashboardRightBar } from '../Components'
import { GoArrowRight } from "react-icons/go";
import { callApi, makeToast } from '../Helpers'
import axios from 'axios';

// const Dashboard = () => {
//   const [ wantChangeProfile, setWantChangeProfile ] = useState(false);
//   const [ selectedImageFile, setSelectedImageFile ] = useState(null);

//   const [ bioInformation, setBioInformation ] = useState({
//     name: null,
//     note: null,
//     image_url: null
//   });


//   useEffect(()=> {
//     (async ()=> {
//       try {
//         const bio_data = await callApi('get','bio/info')
//         if (bio_data) {
//           setBioInformation(()=> ({
//             ...bioInformation,
//             name: bio_data.name,
//             note: bio_data.note,
//             image_url: bio_data.image_key
//           }))
//         }
//       } catch(err) {
//         console.log(err)
//       }
//     })()
//   },[])

//   const ProfileImageChangeHandler = async (e) => {
//     const imageFile = e.target.files[0]
//     setSelectedImageFile(imageFile)
//   }



//   const handleOnchangeBio = (e) => {
//     console.log("Target :", e)
//     setBioInformation((prevValue)=>({
//       ...prevValue,
//       name: e.target.value
//     }))
//     const field_name = e.target.name ;
//     const value = e.target.value
//     if (field_name == 'name') {
//       setBioInformation({
//         ...bioInformation,
//         name: value
//       })
//     }

//     if (field_name == 'note') {
//       setBioInformation({
//         ...bioInformation,
//         note: value
//       })
//     }
//   }

//   const UploadToS3 = async ()=> {
//     try {
//       const {presigned_url, image_key} = await callApi('post','bio/update', { action: 'get_url', image_key: selectedImageFile.name })
//       const res = await axios.put(presigned_url, selectedImageFile, {
//         headers:{
//           'Content-Type': selectedImageFile.type
//         }
//       })
//       const { status } = res
//       if(status == 200) {
//         makeToast("Image Upload Successfully !!")
//         await callApi('post', 'bio/update', { action: 'save_key', image_key: image_key })
//         const bio_data = await callApi('get','bio/info')
//         setBioInformation(()=> ({
//           ...bioInformation,
//           name: bio_data.name,
//           note: bio_data.note,
//           image_url: bio_data.image_key
//         }))
//         setWantChangeProfile(false)
//       }else {
//         makeToast("Image upload Failed !!")
//       }
//     } catch(error) {
//       makeToast("Something Went Wrong !!")
//     }
//   }

//   const UpdateBio = async (fieldName)=> {
//     try {
//       if(fieldName == 'name') {
//         const bio_data = await callApi('post','bio/update', { action: 'regular', name: bioInformation.name })
//         setBioInformation((prevValue) => ({
//           ...prevValue,
//           name: bio_data.name 
//         }))
//       }
//       if(fieldName == 'note') {
//         const bio_data = await callApi('post', 'bio/update', { action: 'regular', note: bioInformation.note })
//         setBioInformation((prevValue) => ({
//           ...prevValue,
//           note: bio_data.note
//         }))
//       }
//       makeToast("Updated Successfully !!")
//     } catch(err) {
//       console.log("Error: ", err)
//     }
//   }

//   const ProfileChangeFileSelector = (
//     wantChangeProfile == true ?
//     <div className="flex items-center justify-center space-x-[5px]">
//       <input onChange={ProfileImageChangeHandler} type="file"  className="my-5 h-1/2 w-min block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input"/>
//       <div>
//         <GrFormClose onClick={()=> setWantChangeProfile((wantChangeProfile)=> !wantChangeProfile)} className="cursor-pointer"/>
//       </div>
      
//       { selectedImageFile ? <div>
//         <button onClick={ UploadToS3 }><GoArrowRight /></button>
//       </div> : null }
//     </div>    
//     : <a onClick={()=> setWantChangeProfile((wantChangeProfile)=> !wantChangeProfile)} className="underline cursor-pointer">Change Profile</a>
//     ) 

  
//   return (
//     <>
//       <div className="main-container">
//         <div className="flex">
//           <Sidebar/>
//           <div className="w-[100%] flex flex-col justify-start">
//                 <div className='flex flex-row justify-start'>
//                   <div className="flex flex-row justify-start mx-2 space-x-10">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className='h-40 w-40 mx-auto my-auto rounded-full overflow-hidden ring-4 ring-[#ffffff]'>
//                             <img src={bioInformation.image_url} loading='lazy' alt="profile"  className='object-cover w-full  '/>
//                         </div>
//                         {ProfileChangeFileSelector}
                        
//                       </div>
//                       <div className='flex flex-col justify-center items-center space-y-3'>
//                         <div className='flex justify-center items-center space-x-2'>
//                             <input value={ bioInformation.name} onChange={handleOnchangeBio} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = { bioInformation.name || 'Name'} required />
//                             <button onClick={ ()=> { UpdateBio('name') }}><GoArrowRight /></button>
//                         </div>
//                         <div className='flex justify-center items-center space-x-2'>
//                             <input value={ bioInformation.note } onChange={handleOnchangeBio} type="text" name="note" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder = { bioInformation.note || 'Note' } required />
//                             <button onClick={ ()=> { UpdateBio('note') }}><GoArrowRight /></button>
//                         </div>
//                       </div>
                      
//                   </div>
                  
//                 </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


const Dashboard = () => {
  const [ selectedMenu, setSelectedMenu ] = useState('profile');

  return (
    <>
      <div className="main-container mt-5">
        <div className="flex items-start justify-start m-2">
          <Sidebar props_data = { {selectedMenu: selectedMenu, setSelectedMenu: setSelectedMenu }}/>
          <div className="w-[80%] flex flex-col justify-start mx-5 ">
            <div className='flex flex-row justify-center items-center'>
              <div className="flex flex-col items-center justify-center">
                <DashboardRightBar props_data = { { selectedMenu: selectedMenu } }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard;
