import { NavLink } from "react-router";
import { Outlet } from "react-router";
export function Layout() {
  const user = localStorage.getItem("user");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center py-2 bg-slate-100 font-thin">
        BookGether
      </header>
      <main className="flex-grow px-2">
        <Outlet />
      </main>
      <footer className="flex justify-between fixed bottom-0 w-full bg-slate-100  p-4 shadow-lg">
        <NavLink className="px-2" to={"/"}>
          Home
        </NavLink>

        {user ? (
          <>
            <NavLink className="px-2" to={"/addbook"}>
              Add Book
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
