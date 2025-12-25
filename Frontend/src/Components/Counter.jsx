const Counter = ()=>{
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 justify-center mt-2">
            <div className="bg-[#171717] flex flex-col items-center border rounded-md px-5 text-center">
                <h3 className="text-3xl p-2">20+</h3>
                <p className="font-bold p-2">Projects</p>
            </div>
            <div className="bg-[#171717] flex flex-col items-center border rounded-md px-5 text-center">
                <h3 className="text-3xl p-2">20+</h3>
                <p className="font-bold p-2">Professional Experience</p>
            </div>
            <div className="bg-[#171717] flex flex-col items-center border rounded-md px-5 text-center">
                <h3 className="text-3xl p-2">20+</h3>
                <p className="font-bold p-2">Dev</p>
            </div>
            <div className="bg-[#171717] flex flex-col items-center border rounded-md px-5 text-center">
                <h3 className="text-3xl p-2">20+</h3>
                <p className="font-bold p-2">Youtube</p>
            </div>
        </div>
    )
}
export default Counter