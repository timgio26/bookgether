import { FaMoon, FaBookOpen } from "react-icons/fa";

export function Homepage() {
  return (
    <div className=" min-h-screen flex flex-col items-center px-5 mb-20">

      <div className="h-svh flex items-center flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Welcome to BookGether</h1>
          <p className="text-xl mt-4 font-light font-mono">
            Bringing readers and books together in a sustainable way
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-200 dark:bg-slate-800 p-6 rounded-full flex items-center justify-center mb-6">
            <FaBookOpen className="text-6xl " />
          </div>
        </div>
      </div>

      <div className="font-mono w-full mb-7">

      <h1 >Key Feature</h1>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md text-center mb-4 w-full max-w-md">
        <p className="text-lg font-bold">Dark Mode</p>
        <div className="flex justify-center mt-5">
          <div className="bg-slate-200 dark:bg-slate-900 p-5 rounded-full flex items-center justify-center">
            <FaMoon className="text-5xl" />
          </div>
        </div>
        <p className="text-sm mt-4">
          Using dark mode can reduce energy usage up to:
        </p>
        <div className="mt-4">
          <p className="text-2xl font-bold">39-47%</p>
          <p className="text-sm font-light mt-2 font-mono">At 100% brightness</p>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">3-9%</p>
          <p className="text-sm font-light mt-2 font-mono">
            At typical brightness settings
          </p>
        </div>
      </div>

    </div>
  );
}
