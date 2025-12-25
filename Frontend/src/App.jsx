import './index.css'
import {Routes,Route} from 'react-router-dom'
import {
    About,
    AuthCallback,
    BlogDetails,
    Contact,
    Dashboard,
    Experiences,
    NotFound,
    Signin,
    Signup,
} from './Pages'
import { Navbar,PrivateOutlet,PrivateOutletRestriction } from './Components'
import { AuthContext } from './Context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { callApi } from './Helpers'
import { useMutation, gql } from '@apollo/client'




const AuthenticationGQL = gql`
  mutation Authentication($inputData: AuthenticationInput) {
    Authentication(inputData: $inputData) {
      role
    }
  }
`;


const App = ()=> {

    const [ userInfo, setUserInfo ] = useState({
      role: "USER"
    })

    
    const [ Authenticator, { loading, error, data }] = useMutation(AuthenticationGQL)
    useEffect(()=> {
      try {
        const token = Cookies.get('_token');
        if (token) {
          const getAuthentication = async () => {
              try {
                const response = await Authenticator({
                  variables: {
                    inputData: {
                      token: Cookies.get('_token')
                    }
                  }
                });
                // console.log("Response from Authentication API:", response);
                if (response.data && response.data.Authentication) {
                  const { role } = response.data.Authentication;
                  setUserInfo((preValue) => ({ ...preValue, role: role }));
                }else {
                  setUserInfo((preValue) => ({ ...preValue, role: "USER" }));
                }
              }catch (error) {
                setUserInfo((preValue) => ({ ...preValue, role: "USER" }));
              }
          };
          getAuthentication();
        }

      }catch (error) {
        console.error("Error in useEffect:", error);
      }

    }, [])

    const UserInfoHandler = ()=> {
      const resetUserInfo = {
        role: "USER"
      }
      setUserInfo((preValue) => ({...preValue, ...resetUserInfo} ))
      Cookies.remove('_token')
    }

    return (
        <AuthContext.Provider value = { { userInfo, UserInfoHandler} }>
          <div className='main-container pb-10'>
            <Navbar/>
            <Routes>
              {/* <Route path='/' element={<Home/>} /> */}
              <Route path='/' element={<About/>} />
              <Route path='/experiences' element={<Experiences/>} />
              <Route path='/blog/:blog_id' element={<BlogDetails/>} />
              <Route path='/auth' element={<AuthCallback/>} />
                <Route path = "/contact" element={<Contact/>}/>
              {/* <Route path='/miscellaneous' element={<Miscellaneous/>} />
              <Route path='/projects' element={<Projects/>} />
              <Route path='/blog/:id' element={<BlogDetails/>}/> */}

              {/* Private Routes */}
              {/* <Route path='/*' element={<PrivateOutlet/>} >
                <Route path='dashboard' element={<Dashboard/>}/>
              </Route> */}

              {/* Restricted Route for LoggedIn user */}
              <Route path='/dashboard' element={<PrivateOutletRestriction><Dashboard/></PrivateOutletRestriction>}/>
              <Route path='/signin' element={<PrivateOutletRestriction><Signin/></PrivateOutletRestriction>}/>
              {<Route path='/signup' element={<PrivateOutletRestriction><Signup/></PrivateOutletRestriction>}/>}

              {/* Not Found Route */}
              <Route path='*' element={<NotFound/>} />
            </Routes>
            <ToastContainer/>
          </div>
        </AuthContext.Provider>

    )
}

export default App
