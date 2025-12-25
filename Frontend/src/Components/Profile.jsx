import { useEffect, useState } from 'react';
import {useLocation, NavLink, useNavigate} from 'react-router-dom'
import { FaLinkedin, FaGithub, FaYoutube} from 'react-icons/fa6'
import { PiDevToLogoLight } from 'react-icons/pi'
import { callApi } from '../Helpers';
import ProfilePath from '../assets/image/profile.png';
import { gql, useLazyQuery } from '@apollo/client'


const downloadResumeFile = (event)=>{
    const aTag = document.createElement('a');
    aTag.href = '../assets/pdf/Resume_Akash_karmokar.pdf'
    aTag.setAttribute('download','Resume_Akash_karmokar.pdf')
    aTag.click();
    aTag.remove();
}




const Profile = ()=>{
    const [designation, setDesignatioin] = useState('Software Engineer')
    const [organizationName, setOrganizationName]  = useState('VALT')

    const [ bio_info, setBioInfo ] = useState({
        id: null,
        name: null,
        note: null,
        image_key: null
    })

    const [ profileData, setProfileData ] = useState(null);
    const navigate = useNavigate();

    const GetProfile = gql`
        query GetProfile {
            GetProfile {
                id
                name
                email
                phone
                designation
                company
                
            }
        }
    `;
    const [ fetchProfile, { loading, error, data }] = useLazyQuery(GetProfile);

    useEffect(()=> {
        try {
            const fetchData = async ()=> {
                const response = await fetchProfile({
                    fetchPolicy: 'no-cache',
                });
                // console.log("Response from GraphQL:", response);
                setProfileData(()=> response?.data?.GetProfile || null);
            }
            fetchData()

        }catch(err) {
            console.error("Error fetching profile data:", err);
        }
        return ()=> {
            console.log("Cleanup function called");
            setProfileData(null);
        }
    }, [])
    


    console.log(profileData)
    return (
        <div className=' main-container flex flex-wrap items-center justify-center '>
            <div className='rounded-full overflow-hidden ring-2 ring-[#ffffff] w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shrink-0'>
                <img src={ProfilePath} loading='lazy' alt="profile"  className='object-cover w-full h-full'/>
            </div>
            <div className='flex flex-col justify-item-stretch p-5'>
                <p className='text-center md:text-left'><span className='text-[#00DF9A]'> as </span><span className='font-bold text-3xl'>{ profileData?.name }</span></p>
                <p className='text-center md:text-left'>{profileData?.designation} @  <span onClick={()=> { navigate("/experiences")}} className="underline cursor-pointer">{profileData?.company}</span></p>
                <div className='text-center md:text-left'>
                    <p>{bio_info.note}</p>
                </div>
                <div className='text-center md:text-left'>
                    <p>{profileData?.email}</p>
                </div>
                <div className='flex flex-row gap-3 justify-center mt-2 md:justify-start'>
                    <NavLink to={"https://www.linkedin.com/in/akashcsemu/"} target='_blank'><FaLinkedin className='text-xl'/></NavLink>
                    <NavLink to={"https://github.com/Akashkarmokar"} target='_blank'><FaGithub className='text-xl'/></NavLink>
                    <NavLink to={"https://dev.to/akashcsemu"} target='_blank'><PiDevToLogoLight className='text-xl'/></NavLink>
                    {/* <NavLink to={"https://www.youtube.com/@OpenTerminal108"} target='_blank'><FaYoutube className='text-xl'/></NavLink> */}
                </div>
                {/* <div className='text-center md:text-left'>
                    <p>{profileData?.phone}</p>
                </div> */}
                {/* <div className='my-2 flex flex-row gap-3 justify-center mt-2 md:justify-start'>
                    <button onClick={downloadResumeFile} className='p-1 border border-[#00DF9A]  rounded-md'>Resume</button>
                </div> */}
            </div>
        </div>
    )
}

export default Profile