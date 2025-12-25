import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const BlogDetails = ()=>{
    const [ singleBlog, setSingleBlog ] = useState(null);
    const { blog_id = "" } = useParams();
    
    const SinglePostQuery = gql`
        query Query($inputData: PostInput) {
            Post(inputData: $inputData) {
                id
                title
                content
                status
                tags {
                    _id
                    title
                }
            }
        }
    `
    const [ GetSinglePost, { data, loading, error }] = useLazyQuery(SinglePostQuery);

    useEffect(()=> {
        if(blog_id) {
            const fetchData = async () => {
                const response = await GetSinglePost({
                    variables: {
                        inputData: {
                            id: blog_id
                        }
                    }
                })
                // console.log("SINGLE BLOG: ", response);
                if(response.data) {
                    const { Post } = response.data;
                    setSingleBlog(Post);
                }
            }
            fetchData()
        }
    },[blog_id])


    return (
        <div className='main-container'>
            <div className='m-5 mt-10 flex-col items-center justify-center md:h-screen border rounded-md overflow-scroll scroll-hide'>
                <div className='p-5 flex-col items-center justify-start'>
                    <div onClick={()=> console.log("HELLO")}  className={`bg-[#3E403F] cursor-pointer rounded-lg shadow-md  min-w-[700px]`}>
                        <NavLink className="flex flex-col items-start justify-start">
                            <h3 className="p-2 text-xl text-white-600 font-semibold">{singleBlog?.title}</h3>
                            {/* <p className=" p-2 text-white-600">{blog.content}</p> */}
                            
                        </NavLink>
                        <p className='ml-2 space-x-2'> { singleBlog?.tags.map(val=> val.title.charAt(0).toUpperCase() + val.title.slice(1)).join(", ")}</p>

                    </div>
                </div>
                <div className='p-5'>
                    <div className='prose text-white p-2 min-w-full' dangerouslySetInnerHTML={ { __html: singleBlog?.content }}/>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;