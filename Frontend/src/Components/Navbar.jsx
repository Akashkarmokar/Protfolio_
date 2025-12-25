import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks";
import Cookies from "js-cookie";
import { makeToast } from "../Helpers";

const Navbar = () => {
  const { pathname } = useLocation();
  const { userInfo, UserInfoHandler } = useAuth();
  const { role } = userInfo;

  const AppMode = import.meta.env.VITE_REACT_APP_MODE;

  const HandleLogoutAction = () => {
    // Cookies.remove('_token')
    UserInfoHandler();
    makeToast("Log out succesfully !!");
  };
  return (
    <>
      <div className="main-container my-2">
        <div className="flex flex-wrap items-center justify-between px-4">
          {/* Left side */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl" title="As known">
              [ Ak ]
            </h1>
          </div>

          {/* Right side */}
          <div className="flex flex-wrap justify-end gap-2 text-sm sm:text-base">
            <div className="flex flex-col items-center">
              <NavLink to="/" className="mx-1">
                Home
              </NavLink>
              {pathname === "/" && (
                <h1 className="text-center text-[#00DF9A]">^</h1>
              )}
            </div>

            <div className="flex flex-col items-center">
              <NavLink to="/experiences" className="mx-1">
                Experiences
              </NavLink>
              {(pathname === "/experiences" ||
                pathname.split("/")[1] === "experiences") && (
                <h1 className="text-center text-[#00DF9A]">^</h1>
              )}
            </div>

            <div className="flex flex-col items-center">
              <NavLink to="/contact" className="mx-1">
                Contact
              </NavLink>
              {(pathname === "/contact" ||
                pathname.split("/")[1] === "contact") && (
                <h1 className="text-center text-[#00DF9A]">^</h1>
              )}
            </div>

            {role === "ADMIN" && (
              <>
                <div className="flex flex-col items-center">
                  <NavLink to="/dashboard" className="mx-1">
                    Dashboard
                  </NavLink>
                  {pathname === "/dashboard" && (
                    <h1 className="text-center text-[#00DF9A]">^</h1>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <NavLink to="/" className="mx-1" onClick={HandleLogoutAction}>
                    Logout
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Navbar;
