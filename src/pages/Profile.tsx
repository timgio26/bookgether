import { logout } from "@/utils/api";
import { useNavigate } from "react-router";
import { useStore } from "@/store";

export function Profile() {
    const navigate = useNavigate()
    const {logout:logoutz} = useStore()


    // localStorage.getItem
  async function handleLogout() {
    const error = await logout();
    if (!error) {
      logoutz();
      navigate("/");
    }
  }
  return (
    <div className="flex flex-col text-center gap-3 flex-grow">
      <div className="flex justify-center">
        <div className="mt-4 w-48 h-48 bg-gray-200 flex justify-center items-center rounded-full">
            <span className="text-gray-400">No Image Available</span>
          </div>
      </div>
      <h1>profile</h1>
      <div className="grid grid-cols-2 gap-4 px-5">
        <div className="bg-slate-950 border-slate-950 border-solid border-2 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950">
          <span>Edit</span>
        </div>
        <div onClick={handleLogout} className="border-slate-950 border-2 border-solid p-2 rounded hover:opacity-75 focus:outline-slate-950">
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
}
