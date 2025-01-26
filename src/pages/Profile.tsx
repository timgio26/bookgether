import { logout } from "@/utils/api";
import { useNavigate } from "react-router";
import { useStore } from "@/store";
import { useGetUserProfile } from "@/features/useBook";

export function Profile() {
    const navigate = useNavigate()
    const {logout:logoutz} = useStore()


    const {data,error} = useGetUserProfile()
    // console.log(data,error)

  async function handleLogout() {
    const error = await logout();
    if (!error) {
      logoutz();
      navigate("/");
    }
  }
  // const error=true

  if (error) return <div className="flex flex-col text-center gap-3 flex-grow"><h1>Page cant be loaded, please try again later</h1></div>
  return (
    <div className="flex flex-col text-center gap-3 flex-grow">
      <div className="flex justify-center">
        <div className="mt-4 w-48 h-48 bg-gray-200 flex justify-center items-center rounded-full">
            <span className="text-gray-400">No Image Available</span>
          </div>
      </div>
      <h1>{data?.name}</h1>
      <h1>Member since : {data?.created_at.slice(0,4)}</h1>
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
