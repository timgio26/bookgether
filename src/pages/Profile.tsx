import { logout } from "@/utils/api";
import { Link, useNavigate } from "react-router";
import { useStore } from "@/store";
import { useGetUserProfile } from "@/features/useBook";
import { ProfileMenu } from "@/components/ProfileMenu";
import { useQueryClient } from '@tanstack/react-query'


export function Profile() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const { logout: logoutz } = useStore();

  const { data, error } = useGetUserProfile();
  // console.log(data,error)

  async function handleLogout() {
    const error = await logout();
    if (!error) {
      queryClient.invalidateQueries()
      logoutz();
      navigate("/");
    }
  }

  function handleEdit() {
    navigate("edit");
  }
  // const error=true

  if (error)
    return (
      <div className="flex flex-col text-center gap-3 my-7 mx-5">
        <h1>Page cant be loaded, please try again later</h1>
        <div className="mt-4">
        <Link to={'/'} className="border-slate-800 border-2 py-2 px-5 rounded-full dark:bg-slate-800">back to home</Link>

        </div>
      </div>
    );
  return (
    <div className="flex flex-col text-center gap-3 flex-grow">
      <div className="flex justify-center">
        <div className="mt-4 w-48 h-48 bg-gray-200 flex justify-center items-center rounded-full">
          <span className="text-gray-400">No Image Available</span>
        </div>
      </div>
      <div>

      <h1 className="font-bold">{data?.name}</h1>
      <h1 className="text-sm font-light">Member since : {data?.created_at.slice(0, 4)}</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 px-5">
        <div
          onClick={handleEdit}
          className="bg-slate-950 border-slate-950 border-solid border-2 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:bg-gray-900"
        >
          <span>Edit</span>
        </div>
        <div
          onClick={handleLogout}
          className="border-slate-950 border-2 border-solid p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:border-gray-900"
        >
          <span>Log Out</span>
        </div>
      </div>
      <ProfileMenu/>
    </div>
  );
}
