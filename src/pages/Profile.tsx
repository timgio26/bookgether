import { logout } from "@/utils/api";
import { useNavigate } from "react-router";

export function Profile() {
    const navigate = useNavigate()


    // localStorage.getItem
  async function handleLogout() {
    const error = await logout();
    if(!error)navigate('/')
  }
  return (
    <div className="flex flex-col text-center gap-3">
      <div className="">
        <h1>image</h1>
      </div>
      <h1>profile</h1>
      <div className="flex flex-row justify-center gap-3">
        <div className="w-24 bg-blue-500 text-white p-2 rounded hover:opacity-75 focus:outline-blue-600">
          <span>Edit</span>
        </div>
        <div onClick={handleLogout} className="w-24 border-blue-500 border-2 text-blue-600 p-2 rounded hover:opacity-75 focus:outline-blue-600">
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
}
