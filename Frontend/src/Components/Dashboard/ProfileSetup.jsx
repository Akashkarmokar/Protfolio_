import {gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor/Tiptap'; 
import { makeToast } from '../../Helpers';



const Experiences = ({ experiences, setExperiences }) => {

    
    const handleAddMoreExperience = () => {
        setExperiences((preValue)=> {
            return [
                ...preValue,
                {
                    company_name: "",
                    designation: "",
                    description: "",
                    website_link: "",
                    linkedin_link: "",
                    start_date: "",
                    end_date: "",
                    description: "",
                    tech_skills: "",
                    work_place: ""
                }
            ]
        })
    }

    const handleExperienceChange = (index, field, value) => {
        setExperiences((prevExperiences) => {
            const updatedExperiences = [...prevExperiences];
            updatedExperiences[index] = {
                ...updatedExperiences[index],
                [field]: value
            };
            return updatedExperiences;
        });
    }
    return (
        <>
            {
                experiences.map((experience, index) => (
                    <div key={index} className="space-y-2">
                        <input 
                            value={experience.company_name} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="Company Name"
                            onChange={(e)=> { handleExperienceChange(index, 'company_name', e.target.value) }}
                        />
                        <input 
                            value={experience.designation} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="Designation"
                            onChange={(e)=> { handleExperienceChange(index, 'designation', e.target.value) }}
                        />
                        <input 
                            value={experience.website_link} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="Website Link"
                            onChange={(e)=> { handleExperienceChange(index, 'website_link', e.target.value) }}
                        />
                        <input 
                            value={experience.linkedin_link} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="LinkedIn Link"
                            onChange={(e)=> { handleExperienceChange(index, 'linkedin_link', e.target.value) }}
                        />
                        <input 
                            value={experience.start_date} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="Start Date"
                            onChange={(e)=> { handleExperienceChange(index, 'start_date', e.target.value) }}
                        />
                        <input 
                            value={experience.end_date} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="End Date"
                            onChange={(e)=> { handleExperienceChange(index, 'end_date', e.target.value) }}
                        />
                        <input 
                            value={experience.tech_skills} 
                            className="bg-[#3e403f] w-full bg-transparent border rounded-md" 
                            type="text" 
                            placeholder="Tech Skills"
                            onChange={(e)=> { handleExperienceChange(index, 'tech_skills', e.target.value) }}
                        />
                        <select
                            value={experience.work_place}
                            onChange={(e)=> { handleExperienceChange(index, 'work_place', e.target.value) }} 
                            className='bg-[#3e403f] w-full border rounded-md'
                        >
                            <option value="REMOTE">Remote</option>
                            <option value="ONSITE">Onsite</option>
                            <option value="HYBRID">Hybrid</option>
                            <option value="Freelance">Freelance</option>
                            {/* <option value="internship">Internship</option>
                            <option value="part-time">Part-time</option>
                            <option value="full-time">Full-time</option>
                            <option value="contract">Contract</option>
                            <option value="temporary">Temporary</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="apprenticeship">Apprenticeship</option>
                            <option value="co-op">Co-op</option>
                            <option value="other">Other</option> */}
                        </select>
                        
                        <RichTextEditor
                                initialContent={experience.description} 
                                setInitialContent={(value) => handleExperienceChange(index, 'description', value)}
                                doesShowMenuBar = { true }
                                height = "min-h-[280px]"
                        />
                        <hr className='p-2'/>
                        
                    </div>
                ))
            }
            
            <div className='flex flex-row items-center justify-center'>
                <button onClick={ handleAddMoreExperience } className="bg-[#3e403f]  p-2 bg-transparent border rounded-md " type="submit" placeholder="" > Add More  </button>
            </div>

            
        </>
    )
}

const ProfileSetup = () => {
    const [ profileData, setProfileData ] = useState({});
    const [ experiences, setExperiences ] = useState([]);

    const GetProfile = gql`
        query GetProfile {
            GetProfile {
                _id
                id
                name
                email
                phone
                designation
                company
                experiences {
                    _id
                    id
                    company_name
                    website_link
                    linkedin_link
                    designation
                    start_date
                    end_date
                    description
                    tech_skills
                    work_place
                }
                
            }
        }
    `;
    const UpdateProfile = gql`
        mutation UpdateProfile($inputData: UpdateProfileInput) {
            UpdateProfile(inputData: $inputData) {
                _id
                id
                name
                email
                phone
                designation
                company
                experiences {
                    _id
                    id
                    company_name
                    website_link
                    linkedin_link
                    designation
                    start_date
                    end_date
                    description
                    tech_skills
                    work_place
                }
            }
        }
    `;
    const [ fetchProfile, { loading, error, data }] = useLazyQuery(GetProfile);

    const [ updateProfile, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UpdateProfile)

    useEffect(()=> {
        try {
            const fetchData = async ()=> {
                const response = await fetchProfile({
                    fetchPolicy: 'no-cache',
                });

                const { experiences, ...profileData } = response?.data?.GetProfile || {};
                setProfileData((prevValue)=>{
                    let updatedProfile = { ...prevValue };
                    updatedProfile = {
                        ...updatedProfile
                    };
                    if(profileData) {
                        updatedProfile = {
                            ...updatedProfile,
                            ...profileData
                        }
                    }

                    return updatedProfile;
                });
                setExperiences((preValue) => {
                    let updatedExperiences = [ ...preValue];
                    if(experiences) {
                        updatedExperiences = [...updatedExperiences, ...experiences];
                    }
                    return updatedExperiences
                });
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


    const handleProfileChange = (field, value) => {
        setProfileData((prevProfile) => {
            let updatedProfile = { ...prevProfile };
            updatedProfile = {
                ...updatedProfile,
                [field]: value
            };
            return updatedProfile;
        });
    }

    const handleSaveProfile = (e) => {
        try {
            const ProfileUpdater = async ()=> {
                const UpdatedExperiences = experiences.map(exp => {
                    const { _id } = exp;
                    const data = {};
                    if(_id) { data.id = _id; }
                    if(exp.company_name){ data.company_name = exp.company_name }
                    if(exp.website_link){ data.website_link = exp.website_link }
                    if(exp.linkedin_link){ data.linkedin_link = exp.linkedin_link }
                    if(exp.designation){ data.designation = exp.designation }
                    if(exp.start_date){ data.start_date = exp.start_date }
                    if(exp.end_date){ data.end_date = exp.end_date }
                    if(exp.description){ data.description = exp.description }
                    if(exp.tech_skills){ data.tech_skills = exp.tech_skills }
                    if(exp.work_place){ data.work_place = exp.work_place }
                    if(exp.tech_skills){ data.tech_skills = exp.tech_skills }
                    if(exp.work_place){ data.work_place = exp.work_place }

                    return data
                })
                
                const inputData = {};
                
                if(profileData?._id) { inputData.id = profileData?._id; }
                if(profileData?.name) { inputData.name = profileData?.name; }
                if(profileData?.email) { inputData.email = profileData?.email; }
                if(profileData?.phone) { inputData.phone = profileData?.phone; }
                if(profileData?.designation) { inputData.designation = profileData?.designation; }
                if(profileData?.company) { inputData.company = profileData?.company; }
                inputData.experiences = UpdatedExperiences;


                const response = await updateProfile({
                    variables: {
                        inputData: inputData
                    }
                });
                
                if(response?.data?.UpdateProfile) {
                    makeToast("Profile data saved successfully");
                }else {
                    makeToast("Failed to save profile data",);
                }
            }
            ProfileUpdater()
        }catch(err) {
            makeToast("Error saving profile data");
        }
    }

    const handleCreateNewProfile = ()=> {
        setExperiences(prevValue => {
            const updatedExperiences = [
                ...prevValue,
                {
                    company_name: "",
                    designation: "",
                    description: "",
                    website_link: "",
                    start_date: "",
                    end_date: "",
                    tech_skills: "",
                    work_place: "",
                }
            ];
            return updatedExperiences
        })
        setProfileData((prevProfile) => {
            return {
                ...prevProfile,
                name: "",
                email: "",
                phone: "",
                designation: "",
                company: ""
            }
        })

        console.log("Profile data: ", profileData);
        console.log("Experiences: ", experiences);
    }

    return (
        <div className="main-container"> 
            <div className="flex flex-col items-start justify-start w-full">
                <div className="bg-[#3e403f] space-y-4 rounded-md border p-4 mt-5 w-[800px]">
                    <div>
                        <input onChange={(e)=>{ handleProfileChange('name', e.target.value)} } value={profileData?.name??""} className="bg-[#3e403f] w-full bg-transparent border rounded-md" type="text" placeholder="Name"/>
                    </div>
                    <div>
                        <input onChange={(e)=>{ handleProfileChange('designation', e.target.value)} } value={profileData?.designation??""} className="bg-[#3e403f] w-full  bg-transparent border rounded-md " type="text" placeholder="Current Designation"/>
                    </div>
                    <div>
                        <input onChange={(e)=>{ handleProfileChange('email', e.target.value)} } value={profileData?.email??""} className="bg-[#3e403f] w-full  bg-transparent border rounded-md" type="text" placeholder="Email"/>
                    </div>
                    <div>
                        <input onChange={(e)=>{ handleProfileChange('phone', e.target.value)} } value={profileData?.phone??""} className="bg-[#3e403f] w-full  bg-transparent border rounded-md" type="text" placeholder="Phone"/>
                    </div>
                    <div>
                        <input onChange={(e)=>{ handleProfileChange('company', e.target.value)  }} value={profileData?.company??""} className="bg-[#3e403f] w-full  bg-transparent border rounded-md" type="text" placeholder="Company"/>
                    </div>
                    <div>
                        {/* <input onChange={()=>{ handleProfileChange('name', e.target.value) }} className="bg-[#3e403f] w-full  bg-transparent border rounded-md " type="submit" placeholder="Moto" onClick={()=> console.log("Hello world")}/> */}
                        <button onClick={(e)=> { handleSaveProfile() }} className='bg-[#3e403f] p-2 w-full  bg-transparent border rounded-md'>Save</button>
                    </div>
                </div>
                <br />
                <div className='flex flex-col items-start justify-start w-full'>
                    <h2 className='text'>Experiences:</h2>
                    <div className='bg-[#3e403f] space-y-4 rounded-md border p-4 mt-5 w-[800px]'>
                        <Experiences experiences = {experiences} setExperiences = {setExperiences}/>
                        <div>
                            { experiences.length ? <button onClick={ handleSaveProfile } className="bg-[#3e403f] w-full p-2 bg-transparent border rounded-md " type="submit" placeholder="" > Save  </button> : null}
                        </div>
                    </div>
                
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileSetup;