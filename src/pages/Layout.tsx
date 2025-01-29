import { NavLink } from "react-router";
import { Outlet } from "react-router";
import { useStore } from '../store'
export function Layout() {

  const {user} =useStore()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center pb-2 pt-4 bg-slate-100 font-thin">
        BookGether
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="flex justify-between fixed bottom-0 w-full bg-slate-100/80 isolate p-4 shadow-lg backdrop-blur-sm">
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
