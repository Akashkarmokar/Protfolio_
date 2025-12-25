import { useState } from 'react'
import { makeToast } from '../Helpers';
// import { callApi } from '../Helpers/apiCall'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'

const Signup = ()=>{
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword]  = useState('')


    const Navigate = useNavigate()


    const signUpHandler = async () => {
        const checkUserEmail = (userTypeEmail) =>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(userTypeEmail);
        }

        const checkUserPassword = (userTypedPassword) => {
            return userTypedPassword.length >= 3 
        }
        const isEmailValid = checkUserEmail(userEmail);
        const isPasswordValid = checkUserPassword(userPassword);

        if(!isEmailValid){ 
            makeToast("Email is not valid")
        }
        if(!isPasswordValid) {
            makeToast("Password is not valid")
        }
        // Make_Users_SIGN_IN({
        //     variables:{
        //         inputData: {
        //             "email": "aka@.com",
        //             "password": "hello"
        //         }
        //     }
        // })
        // if (SIGN_IN_ERROR){
        //     makeToast("Sign in error")
        // }
        const Payload = {
            email: userEmail,
            password: userPassword

        }
        try{
            const Response = await axios.post('http://127.0.0.1:8086/auth/sign-up',Payload)
            if(Response.status == 200) {
                const { data } = Response
                const { access_token }  = data
                Cookies.set('Token', access_token)
                Navigate('/signin')
                makeToast("Signup Successfully :)")
            } else {
                makeToast("Something went wrong !!")
            }
        }catch(err){
            console.log(err)
            makeToast("Something is wrong !!")
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="flex justify-center items-center h-screen">
                    <div className='flex flex-col'>
                        <label htmlFor="" className='px-2'>Email</label>
                        <input type="text" value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} name="" id="" className='my-2 rounded-md text-black'/>
                        <label htmlFor="" className='px-2'>Password</label>
                        <input type="password" name="" id="" value={userPassword} onChange={(e)=> setUserPassword(e.target.value)} className='my-2 rounded-md text-black'/>
                        <button onClick={signUpHandler} className='my-1 px-2 py-1 border  border-[#ffffff] text-[#00df9a] rounded-full'>Signup</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;