import { ChangeEvent, FormEvent, useState } from "react";
import { UserAuth } from "../utils/types";
import { register } from "../utils/api";

export function Register() {
  const [registData, setRegistData] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const [isLoading,setIsLoading] =useState<boolean>(false)

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value)
    setRegistData((state) => ({ ...state, email: e.target.value }));
  }

  function handlePassword(e: ChangeEvent<HTMLInputElement>) {
    setRegistData((state) => ({ ...state, password: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true)
    await register(registData)
    setIsLoading(false)
  }

  return (
    <div className="px-2">
      <form
        className="flex flex-col flex-grow justify-center"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-white"
        >
          Email
        </label>
        <input
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          type="email"
          name="email"
          id="email"
          onChange={handleEmail}
          required={true}
        />
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-white"
        >
          Password
        </label>
        <input
          className="mb-4 border-b border-gray-300 p-2 rounded focus:outline-none dark:bg-transparent"
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
          required={true}
        />
        <button
          type="submit"
          className="bg-slate-950 dark:bg-gray-800 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950"
          disabled={isLoading}
        >
          <span>{!isLoading?"Register":"Loading"}</span>
        </button>
      </form>
    </div>
  );
}
