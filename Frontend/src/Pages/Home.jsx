/**
 * External Packages
 */

/**
 * Internal Packages
 */
import Blog from "../Components/Blog";

const Home = ()=>{
    return (
        <>
            <div className="main-container flex justify-start items-start my-5 rounded-md">
                {/* Total Counters */}
                {/* <div className="flex flex-col bg-[#171717] px-2 border border-[#050404] rounded-md min-w-[15%] max-h-min">
                    <div className=" mx-1 my-2 px-2 rounded-sm hover:bg-[#242424]">Blogs ( 5 )</div>
                    <div className=" mx-1 my-2 px-2 rounded-sm hover:bg-[#242424]">Up Comming ( 5 )</div>
                    <div className=" mx-1 my-2 px-2 rounded-sm hover:bg-[#242424]">Skill ( 5 )</div>
                    <div className=" mx-1 my-2 px-2 rounded-sm hover:bg-[#242424]">Feedbacks ( 5 )</div>
                    <div className=" mx-1 my-2 px-2 rounded-sm hover:bg-[#242424]">Series ( 5 )</div>
                </div> */}
                {/* Blogs Section */}
                <div className="flex flex-col ml-10 border border-[#ffffff] rounded-md">
                    {/* Main Blog Section */}
                    <div className="flex flex-col">
                        {Array.from([1,2,3,4,5,6,7,8,9,0].map((val)=> (<Blog key={val}/>)))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;