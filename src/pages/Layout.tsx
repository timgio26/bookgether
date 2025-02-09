import { NavLink ,Outlet} from "react-router";
import { useStore } from '../store'
import { ModeToggle } from "@/components/ModeToggle";
import { useEffect } from "react";
import { logout as logoutApi } from "@/utils/api";


export function Layout() {

  const {user,logout} =useStore()

  const checkToken = localStorage.getItem('sb-dzanjlfmchzdirukrrlt-auth-token')

  useEffect(()=>{
    if(!checkToken){
      logout()
      logoutApi() 
    }
  },[logout,checkToken])


  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center pb-2 pt-4 bg-slate-100 font-thin dark:bg-gray-900">
        <div className="flex flex-row justify-between w-full px-5 items-center">
          {/* <div></div> */}
          <span>BookGether</span>
          <div className="justify-end flex">

        <ModeToggle/>
          </div>
        </div>
        
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex justify-between fixed bottom-0 w-full bg-slate-100/80 dark:bg-gray-900 isolate p-4 shadow-lg backdrop-blur-sm">
        <NavLink className="px-2" to={"/"}>
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink className="px-2" to={"/addbook"}>
              My Book
            </NavLink>
            <NavLink className="px-2" to={"/findbook"}>
              Find Book
            </NavLink>
            <NavLink className="px-2" to={"/profile"}>
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="px-2" to={"/login"}>
              Login
            </NavLink>
            <NavLink className="px-2" to={"/register"}>
              Register
            </NavLink>
          </>
        )}
      </footer>
    </div>
  );
}
