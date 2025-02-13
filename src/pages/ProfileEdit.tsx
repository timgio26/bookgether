import { Map } from "@/components/Map";
// import { useGetUserProfile } from "@/features/useBook";
import { getprofile, updateProfile } from "@/utils/api";
import { Profile, Coordinate } from "@/utils/types";
import { ChangeEvent, useState,FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { IoIosCamera } from "react-icons/io";

export function ProfileEdit() {
  const navigate = useNavigate()
  // const { data, error } = useGetUserProfile();
  const [formdata, setFormdata] = useState<Profile | undefined>();

  useEffect(()=>{
    async function getUserProfile(){
      const resp = await getprofile()
      setFormdata(resp)
    }
    getUserProfile()
  },[])

  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setFormdata((state) =>
      state ? { ...state, name: e.target.value } : undefined
    );
  }

  function handleAddress(e: ChangeEvent<HTMLTextAreaElement>) {
    setFormdata((state) =>
      state ? { ...state, address: e.target.value } : undefined
    );
  }

  function handleMap({ lat, lng }: Coordinate) {
    setFormdata((state) => (state ? { ...state, lat, lng } : undefined));
  }

  async function handleFormSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(!formdata) return
    const {error} = await updateProfile(formdata)
    if(!error) navigate(-1)
  }

  console.log(formdata?.lat)

  return (
    <div className="pb-20 flex flex-col px-5">
      <form action="" onSubmit={handleFormSubmit}>
        <div className="flex justify-center my-9">
          <div className="relative">

          <div className="w-48 h-48 bg-slate-200 rounded-full"></div>
          <label htmlFor="profImg" className="bg-slate-50 dark:bg-slate-700 border-2 border-slate-700 absolute bottom-3 right-3 rounded-full p-1"><IoIosCamera size={30}/></label>
          <input type="file" name="profImg" id="profImg" hidden/>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formdata?.name}
            onChange={handleName}
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-slate-950 focus:outline-none dark:bg-transparent"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-gray-700  dark:text-gray-300">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            onChange={handleAddress}
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-slate-950 focus:outline-none dark:bg-transparent"
            value={formdata?.address?? ""}
          />
        </div>
        <Map handleMap={handleMap} coordinate={{lat:formdata?.lat??null,lng:formdata?.lng??null}}/>
        <button className="bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 w-full dark:bg-slate-800">
          Update
        </button>
      </form>
    </div>
  );
}
