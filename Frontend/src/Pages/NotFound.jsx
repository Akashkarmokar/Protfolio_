import NotFoundImage from '../assets/image/Not_Found_Page.jpg'
const NotFound = ()=>{
    return (
        <div className="main-container">
            <div className="flex items-center justify-center md:h-screen">
                {/* <img src={NotFoundImage} alt="" srcset="" /> */}
                <h1>Content Not Found</h1>
            </div>
        </div>
    )
}

export default NotFound;