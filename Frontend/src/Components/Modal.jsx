import { MdCloseFullscreen } from "react-icons/md";
const Modal  = ({ open, onClose, children })=> {
    return (
        <div onClick={onClose} className={
            `fixed inset-0 flex justify-center items-center ${ open ? "visible bg-black/50 " : "invisible" }`
        }>
            { /*Modal */}
            <div
             onClick={(e) => e.stopPropagation()}
             className={`overflow-scroll scroll-hide border border-[#64E09A] w-[80%] h-[80%] bg-[#242424] rounded-xl shadow p-6 transition-all ${ open ? "scale-100 opacity-100" : "scale-125 opacity-0"  }`}
            >
                <button className="absolute top-2 right-2 p-1 rounded-lg text-[#2E6F4D]  hover:bg-gray-50 hover:text-gray-600" onClick={onClose}>
                    {/* Close Button of Modal */}
                    <MdCloseFullscreen/>  
                </button>
                <div
                    // className="flex flex-col items-center justify-center h-full text-white text-lg"
                >
                    {children}
                </div>     
                
            </div>
        </div>
    );
}

export default Modal;