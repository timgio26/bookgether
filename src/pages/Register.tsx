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
    <div>
      <form
        className="flex flex-col flex-grow justify-center"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none"
          type="email"
          name="email"
          id="email"
          onChange={handleEmail}
          required={true}
        />
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          className="mb-4 border-b border-gray-300 p-2 rounded focus:outline-none"
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
          required={true}
        />
        <button
          role="button"
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:opacity-75 focus:outline-blue-600"
          disabled={isLoading}
        >
          <span>{!isLoading?"Register":"Loading"}</span>
        </button>
      </form>
    </div>
  );
}
