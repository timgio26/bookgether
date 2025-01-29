import { ChangeEvent, FormEvent, useState } from "react";
import { UserAuth } from "../utils/types";
import { signin } from "../utils/api";
import { useNavigate } from "react-router";
import { useStore } from "@/store";


export function Login() {
  const {login:loginz} = useStore()

  const [loginData, setLoginData] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value)
    setLoginData((state) => ({ ...state, email: e.target.value }));
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setLoginData((state) => ({ ...state, password: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const {error}=await signin(loginData);
    console.log(error)
    setIsLoading(false);
    if(!error){
      loginz()
      navigate('/')}
  }

  return (
    <div className="px-2">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleEmail}
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          required={true}
        />
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          required={true}
        />
        <button
          className="bg-slate-950 dark:bg-gray-800 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950"
          disabled={isLoading}
        >
          <span>{!isLoading ? "Log in" : "Loading"}</span>
        </button>
      </form>
    </div>
  );
}
