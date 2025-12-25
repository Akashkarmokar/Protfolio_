import { useEffect, useState } from 'react';
import Modal from '../Modal.jsx';
import RichTextEditor from '../RichTextEditor/Tiptap.jsx'; // Assuming you have a rich text editor component
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import MultiSelectDropdown from '../MultiselectDropDownWithCheckBox.jsx';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client'; 
import { makeToast } from '../../Helpers/index.js';
import { useAuth } from '../../Hooks/index.js';
import { FaExternalLinkAlt } from "react-icons/fa"

const CREATE_BLOG_POST = gql`
    mutation Mutation($inputData: CreatePostInput) {
        CreatePost(inputData: $inputData) {
            id
            title
            content
            status
        }
    }
`;

const PostListing = gql`
    query Query($inputData: PostListingInput) {
        PostListing(inputData: $inputData) {
            metadata {
                page
                limit
                total_count
            }
            posts {
                title
                status
                content
                id
                short_preview_content
                tags {
                    _id
                    title
                }
            }
        }
    }
`;

const UpdatePostMutation = gql`
    mutation Mutation($inputData: UpdatePostInput) {
        UpdatePost(inputData: $inputData) {
            content
            id
            short_preview_content
            status
            title
            tags {
                _id
                title
            }
        }
    }  
`;



const PostEdit = ({ blogDetails, setAllPosts, setModalClose })=> {
    const [ contentTitle, setContentTitle ] = useState(blogDetails?.title?? "");
    const [ short_preview_content, set_short_preview_content ] = useState(blogDetails?.short_preview_content?? "");
    const [ content, setContent ] = useState(blogDetails?.content?? "");
    const [ selectedStatus, setSelectedStatus ] = useState(blogDetails?.status ?? "");
    const [ tagsOnEdit, setTagsOnEdit ] = useState([])

    
    console.log("TAG ON EDIT: ", tagsOnEdit)
    const [ updatePostContent, { data:PostUpdatedData, loading:doesPostUpdateOnLoad, error: postUpdateError }] = useMutation(UpdatePostMutation); 


    const handleSubmitAction = async (e)=> {
        try {
            const inputData = {
                id: blogDetails.id,
                title: contentTitle,
                content: content,
                status: selectedStatus,
                short_preview_content: short_preview_content
            };
            if(tagsOnEdit && Array.isArray(tagsOnEdit) && tagsOnEdit.length > 0 ) {
                inputData.tags = tagsOnEdit;
            }
            const response = await updatePostContent({variables: {
                inputData: inputData
            }})
            if(response?.data?.UpdatePost){
                setAllPosts((preValue)=> {
                    const idx = preValue.findIndex((value)=> {
                        // console.log("stat id: ", value.id, "updated value id: ", response?.data?.UpdatePost?.id)
                        return value.id === response?.data?.UpdatePost?.id
                    })
                    
                    if(idx !== -1) {
                        preValue.splice(idx, 1, {...response?.data?.UpdatePost });
                        return preValue;
                    }
                })
                makeToast("Post Updated successfully")
            }
            setModalClose()
            return;
        }catch(err) {
            makeToast("Someting went wrong.")
            return;
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='mx-auto border rounded-md w-full my-5'>
                <input 
                    type="text" 
                    onChange={(e) => setContentTitle(e.target.value) } 
                    value={contentTitle} 
                    className='w-full outline-none ring-0 focus:ring-0 focus:outline-none border bg-transparent  p-2 rounded' 
                    placeholder='Content Title' 
                />
            </div>
            <div 
                className='border rounded-md w-full my-5'
            >
                <MultiSelectDropdown setItems={setTagsOnEdit} givenOptionList= {blogDetails?.tags}/>
            </div> 
            <div className= "w-full" >
                <RichTextEditor
                    initialContent={short_preview_content} 
                    setInitialContent={set_short_preview_content}
                    doesShowMenuBar = { false }
                    height = "min-h-[100px]"
                />
            </div>

            <RichTextEditor
                initialContent={content} 
                setInitialContent={setContent}
            />
            
            <div className='m-2 p-2 w-full flex items-center justify-end'>
                <select onChange={(e)=> setSelectedStatus(e.target.value)} value={selectedStatus} className='border border-[#64E09A] bg-transparent rounded' name="status" id="status">
                    <option className='bg-white text-black' value="DRAFT">Draft</option>
                    <option className='bg-white text-black' value="ACTIVE">Active</option>
                    <option className= 'bg-white text-black' value="INACTIVE">Inactive</option>
                </select>
                
                <button
                    className="mx-2 bg-transparent text-lg font-semibold hover:bg-[#64E09A] hover:text-[#242424] py-2 px-4 border border-[#64E09A] hover:border-transparent rounded"
                    onClick={
                        (e) => {
                            /**
                             * If APi call after make submit is successful then
                             * setOpen(false) will close the modal
                             */
                            // setOpen(true);
                            handleSubmitAction(e)
                        }
                    }
                > Submit
                </button>
            </div>
        </div>
    )
}


const BlogList = ({ selectedTags }) => {


    const [ open , setOpen ] = useState(false);
    const [ initialContent, setInitialContent ] = useState('<p>Hello world!</p>');
    const [ short_preview_content, set_short_preview_content ] = useState('');
    const [ contentTitle, setContentTitle ] = useState(''); 
    const [ AllPosts, setAllPosts ] = useState([]);
    const [ selectedStatus, setSelectedStatus ] = useState('DRAFT');
    const [ postEditOpen, setPostEditOpen ] = useState(-1);
    const [ currentTotalCount, setCurrentTotalCount ] = useState(0);
    const [ listingMetadata, setListingMetadata ] = useState(0);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [tags, setTags] = useState([]);


    const [ listingStatus , setListingStatus ] = useState('ACTIVE');
    const navigate = useNavigate();

    /**
     * Locaton Hook to get the current pathname
     */
    const { pathname } = useLocation();

    const { userInfo, UserInfoHandler } = useAuth();
    const { role } = userInfo;
    
    
    const [ createBlogPost, { data, loading, error: createPostError } ] = useMutation(CREATE_BLOG_POST);

    const [ fetchMorePosts, { data: morePostListingData, error: morepostListingError } ] = useLazyQuery(PostListing);
    

    useEffect(() => {
        const morePosts = async () => {
            const inputData  = {
                status: listingStatus,
                page: 1, 
                limit: 10
            }

            if(selectedTags && Array.isArray(selectedTags) && selectedTags.length > 0) {
                inputData.tags = selectedTags
            }

            const response = await fetchMorePosts({
                variables: {
                    inputData: inputData
                },
                fetchPolicy: 'no-cache'
            });

            if( response?.data?.PostListing ) {
                const { metadata, posts } = response.data.PostListing;
                // console.log("Posts: ", AllPosts);
                setAllPosts([...posts]);
                setCurrentTotalCount((prevValue) => {
                    // console.log("Prev Value: ", prevValue, "Posts Length: ", posts.length);
                    return prevValue + posts.length;
                });
                setListingMetadata(() => metadata.total_count);
                // setCurrentPage((prevPage) => prevPage + 1);
                
            }
        }
        morePosts();

        return () => {
            setAllPosts([])
            setCurrentTotalCount(0);
            setListingMetadata(0);
            setCurrentPage(1);
        }
    },[selectedTags, listingStatus])

    
    

    /**
     * Run If Model Closed Only
     */
    useEffect(() => {
        if(!open) {
            // console.log("Modal closed");
        }
    }, [open])


    const handleCreateBlogPost = async () => {
        try {
            if(!contentTitle || !initialContent) {
                makeToast("Title and content cannot be empty", "error");
                return;
            }
            const response = await createBlogPost({
                variables: {
                    inputData: {
                        title: contentTitle,
                        content: initialContent,
                        status: selectedStatus,
                        short_preview_content: short_preview_content,
                        tags: tags
                    }
                }
            });
            // console.log("RES: ", response)
            if (createPostError) {
                makeToast("Error creating blog post", "error");
                return;
            }
            
            setOpen(false); // Close the modal after successful creation
            setAllPosts((prevPosts) => [response.data.CreatePost,...prevPosts, ]);
        } catch (err) {
            if(createPostError) {
                makeToast(err.message, "error");
                return
            }
            makeToast("Something went wrong", "error");
            return
        }
    }

    const handlePostEdit = (e, blogDetails, index) => {
        // console.log("INDEX : ", index)
        // console.log("postEditOpen", postEditOpen)
        setPostEditOpen(index)
        // console.log("INDEX : ", index)
        // console.log("postEditOpen", postEditOpen)
    }

    const handleLoadMore = async (e)=> {
        console.log("Current page: ", currentPage);
        const response = await fetchMorePosts({
                variables: {
                    inputData: {
                        status: 'ACTIVE',
                        page: currentPage + 1, 
                        limit: 1
                    }
                },
                fetchPolicy: 'no-cache'
            });
        if( response?.data?.PostListing ) {
            const { metadata, posts } = response.data.PostListing;
            setAllPosts((prevPosts) => [...prevPosts, ...posts]);
            setCurrentTotalCount((prevValue) => {
                // console.log("Prev Value: ", prevValue, "Posts Length: ", posts.length);
                return prevValue + posts.length;
            });
            setListingMetadata(() => metadata.total_count);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }

    return (
        <div className="flex-col justify-center items-start">
            {
                pathname === '/dashboard'
                ?
                <div className="flex justify-between items-center mb-6">
                {/* <h2 className="text-2xl font-bold mb-4">Blog List</h2> */}
                {
                    pathname === '/dashboard' // This logic should be adjust after authentication is implemented
                    ? 
                    
                    <select onChange={(e)=> setListingStatus(e.target.value)} className='border border-[#64E09A] bg-transparent rounded' name="status" id="status">
                        <option className='bg-white text-black' value="ACTIVE">Active</option>
                        <option className='bg-white text-black' value="DRAFT" >Draft</option>
                        <option className= 'bg-white text-black' value="INACTIVE">Inactive</option>
                    </select>
                    : 
                    null
                }
                {/* {listingStatus} */}
                {
                    pathname === '/dashboard' // This logic should be adjust after authentication is implemented
                    ? 
                    <button
                        className="bg-transparent text-2xl font-semibold hover:bg-[#64E09A] hover:text-[#242424] py-2 px-4 border border-[#64E09A] hover:border-transparent rounded"
                        onClick={() => setOpen(true)}
                    > Create Blog 
                    </button> 
                    : 
                    null
                }
                
                <Modal open = { open } onClose = { ()=> setOpen(false) }>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div className='mx-auto border rounded-md w-full my-5'>
                            <input type="text" onChange={(e) => setContentTitle(e.target.value)} value={contentTitle} className=' w-full outline-none ring-0 focus:ring-0 focus:outline-none border bg-transparent  p-2 rounded' placeholder='Content Title' />
                        </div>
                        
                        <div className='border rounded-md w-full my-5'>
                            <MultiSelectDropdown setItems = {setTags}/>
                        </div>

                        <div className= "w-full" >
                            <RichTextEditor
                                initialContent={short_preview_content} 
                                setInitialContent={set_short_preview_content}
                                doesShowMenuBar = { false }
                                height = "min-h-[100px]"
                            />
                        </div>
                    
                        
                        <RichTextEditor
                             initialContent={initialContent} 
                             setInitialContent={setInitialContent}
                             doesShowMenuBar = { true }
                             height = "min-h-[280px]"
                        />
                        
                        <div className='m-2 p-2 w-full flex items-center justify-end'>
                            <select onChange={(e)=> setSelectedStatus(e.target.value)} className='border border-[#64E09A] bg-transparent rounded' name="status" id="status">
                                <option className='bg-white text-black' value="DRAFT">Draft</option>
                                <option className='bg-white text-black' value="ACTIVE">Active</option>
                                <option className= 'bg-white text-black' value="INACTIVE">Inactive</option>
                            </select>
                            
                            <button
                                className="mx-2 bg-transparent text-lg font-semibold hover:bg-[#64E09A] hover:text-[#242424] py-2 px-4 border border-[#64E09A] hover:border-transparent rounded"
                                onClick={
                                    () => {
                                        setOpen(true);
                                        handleCreateBlogPost()
                                    }
                                }
                            > Submit
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
                :
                null
            }
            
            <div className="space-y-5">
                {AllPosts.map((blog, index) => (
                    <div onClick={()=> {navigate(`/blog/${blog.id}`)}} className='text-white rounded-lg shadow-md border border-white p-2 cursor-pointer'>
                        <div key={index} className={`bg-[#3E403F] cursor-pointer rounded-lg shadow-md  min-w-[700px]`}>
                            <NavLink to={`/blog/${blog.id}`} className="flex items-start justify-between">
                                <h3 className="p-2 text-xl text-white-600 font-semibold">{blog.title}</h3>
                                
                                <span className='p-2'> <FaExternalLinkAlt /> </span>
                            </NavLink>
                            <div className='flex items-center justify-between'>
                                <p className='ml-2 space-x-2'> { blog?.tags?.map(val=> val?.title?.charAt(0).toUpperCase() + val.title.slice(1)).join(", ")}</p> 
                            </div>
                        </div>
                        
                        <div className='prose text-white p-2 min-w-full' dangerouslySetInnerHTML={ { __html: blog?.short_preview_content.substring(0,450) ?? "" }}/>

                        {/* <div className='prose text-white p-2 min-w-full' dangerouslySetInnerHTML={ { __html: blog.content }}/> */}
                        {
                            role === "ADMIN"
                            ?
                            <div className='flex items-start justify-end'>
                                <button 
                                    onClick={ (e)=> { handlePostEdit(e, blog, index + 1 ) }}
                                    className='p-2 rounded border'
                                >
                                    Edit
                                </button>
                            </div>
                            :
                            null
                        }
                        
                        {
                            postEditOpen == index + 1
                            ?
                            <Modal open = { postEditOpen } onClose = { ()=> setPostEditOpen(-1) }>
                                <PostEdit blogDetails={blog} setAllPosts= {setAllPosts} setModalClose = { ()=> {setPostEditOpen(-1) } }/> 
                            </Modal>
                            :
                            null
                        }
                        
                    </div>
                ))}
            </div>
            
            
            {
                listingMetadata > currentTotalCount ?
                <div className='flex items-center justify-center my-5'>
                    <button onClick={()=> {handleLoadMore()}} className='bg-[#64E09A] text-[#242424] py-2 px-4 border border-[#64E09A] hover:border-transparent rounded'>Load More</button>
                </div>
                :
                null
            }

            {/* <div className='flex items-center justify-center my-5'>
                <button onClick={handleLoadMore} className='bg-[#64E09A] text-[#242424] py-2 px-4 border border-[#64E09A] hover:border-transparent rounded'>Load More</button>
            </div> */}
        </div>
    );
}

export default BlogList;