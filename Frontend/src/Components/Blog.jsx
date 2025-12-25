const Blog = ()=>{
    return (
        <>    
            <div className="bg-[#171717] mx-2 my-2 p-1 rounded-md">
                {/* If banner have then render it or null */}
                {/* <div>Banner</div> */}
                <p className="text-2xl mx-4">How to setup your pc to manage multiple Git account</p>
                <p className="mx-4">9,June,2023 ( 2 days Ago )</p>
                <div className="flex items-start my-2">
                    <button className="ml-4">#Js</button>
                    <button className="ml-4">#Python</button>
                    <button className="ml-4">#Git</button>
                </div>
                <p className="mx-4 my-4 rounded-md p-4 bg-[#242424]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni tempore non eos repellat ipsum aliquid quidem inventore soluta at debitis, amet eligendi sit sed tenetur a totam fuga quisquam rerum expedita. Iure modi blanditiis fugiat error dolore tempore ipsum dicta eum, excepturi, aperiam nobis sit! Exercitationem provident eligendi eos laudantium.</p>
            </div>
        </>
    )
}

export default Blog;