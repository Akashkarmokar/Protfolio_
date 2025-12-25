import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const Experienc = ({experienceData}) => {
    return (
        
        <div className="main-container my-5">
            <div className="flex items-start justify-center">
                <div className="flex flex-col items-center justify-center w-[20%]">
                    <NavLink target="_blank" to={experienceData?.website_link??""}><h1 className="text-[#00DF9A]">{experienceData?.company_name??""}</h1></NavLink>
                    <p><NavLink to={experienceData.website_link}>Website</NavLink> | <NavLink to={experienceData.linkedin_link}>Linkedin</NavLink></p>
                    <h4>{experienceData.start_date} - {experienceData.end_date}</h4>
                    {/* <h4>{"Onsite"}</h4> */}
                </div>
                <div className=" border-l-4 pl-4 flex flex-col items-start justify-center w-[80%] ">
                    <h2 className="my-1 text-2xl"> {experienceData.designation} | <span className="text-xs">{experienceData.work_place}</span></h2>
                    <div className="flex items-center justify-center min-w-[500px]">
                        <div className="w-[20%] my-1">
                            <h2 className="w-full text-sm">Tech Skills:</h2>
                        </div>
                        <div className="w-[80%]">
                            <p>{experienceData.tech_skills}</p>
                        </div>
                        

                    </div>
                    <h1 className="text-2xl">Experiences: </h1>
                    
                    <div className='prose text-white p-2 min-w-full' dangerouslySetInnerHTML={ { __html: experienceData?.description }}/>
                    
                </div>
            </div>
        </div>
    )
}

const Experiences = ()=> {
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
    const [ fetchProfile, { loading, error, data }] = useLazyQuery(GetProfile);

    useEffect(()=> {
        try {
            const fetchData = async ()=> {
                const response = await fetchProfile({
                    fetchPolicy: 'no-cache',
                });

                const { experiences, ...profileData } = response?.data?.GetProfile || {};
                setProfileData(()=> profileData || {});
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
    const dummyexperiences = [
        {
            company: "Valt",
            position: "Software Engineer",
            duration: "2000 - Present",
            website: "https://www.yotech.ltd/",
            linkedin: "https://www.linkedin.com/company/valtltd/",
            skills: "ExpressJS | FastAPI | Postgresql | MongoDB | Socket | Redis | SQLAlchemy | Alembic",
            description: [
                "Maintaining one of the largest food delivery system (yofoodie) and multi-vendor EPOS system.",
                "Developed and deployed REAL TIME QE authentication system for vendor management app with SOCKET programming.",
                "Integrating THIRD-PARTY services and building product on top of STRIPE.",
                "Migrated less used services to aws lambda to reduce server cost implementing GraphQL to produce less JSON response from AWS lambda.",
                "Refactor one of microservices of socket management and lead a team to make this service identical for both API call and Socket Event."
            ]
        },
        {
            company: "Gain Solutions LTD",
            position: "Software Engineer",
            duration: "2000 - Present",
            website: "https://www.gainhq.com/",
            linkedin: "https://www.linkedin.com/company/valtltd/",
            skills: "GraphQL | AWS [ Lambda , SQS, SNS, S3, EC2, CloudFormation ] | Docker | MongoDB | PostgreSQL | ReactJS | TailwindCSS ",
            description: [
                "Worked on property management system as a full stack developer to connect landlords and tenants.",
                "Experienced with GraphQL and Cloud Development to build scalable microservice applications alongside with Agile and Scrum methodologies.",
                "Developeed and deployed TDD (Test Driven Development) based applications with CI/CD pipeline to ensure 2x developement productivity.",
            ]
        }
    ]
    return (
        <div className="main-container space-y-5">
                <div className="flex flex-col items-center justify-center">
                    {
                        // Array.from({ length: 3 }).map((_, index) => (
                        //     <Experienc key={index} />
                        // ))
                        experiences.map((experience, index) => 
                            ( Experienc({ experienceData: experience }))
                        )
                    }
                    {/* {
                        // Array.from({ length: 3 }).map((_, index) => (
                        //     <Experienc key={index} />
                        // ))
                        dummyexperiences.map((experience, index) => 
                            ( Experienc({ experienceData: experience }))
                        )
                    } */}
                </div>
        </div>
    )
}

export default Experiences;