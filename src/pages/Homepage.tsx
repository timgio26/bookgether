// import { useGetCountLendBook } from "@/features/useBook";
import { useStore } from "@/store";
import { getUserZ } from "@/utils/helperFn";
import { Profile } from "@/utils/types";
import {
  FaMoon,
  FaBookOpen,
  FaRoute,
  FaArrowCircleRight,
} from "react-icons/fa";
import { MdCo2, MdEnergySavingsLeaf } from "react-icons/md";

export function Homepage() {
  // const { data, error } = useGetCountLendBook();
  const user = getUserZ();
  const { profile } = useStore();
  const profileObj:Profile|null = profile?JSON.parse(profile):null;
  console.log(profileObj)
  const stat = true;

  if (user) {
    return (
      <div className=" min-h-screen flex flex-col items-center px-5 mb-20">
        <div className="text-left w-full my-8">
          <h1 className="text-3xl font-light">Hi, <span className="font-bold">{profileObj?.name}</span></h1>
        </div>
        <div className="flex flex-col w-full bg-slate-100 dark:bg-slate-900 my-5 rounded-md">
          <div className="border-b-2 px-5 py-5">
            {stat ? (
              <div className="flex flex-col">
                <span className="font-mono font-semibold">CO2 reduced</span>
                <span>
                  <span className="text-3xl">2.7</span> kg
                </span>
              </div>
            ) : (
              <div className="flex flex-col ">
                <span className="font-mono font-semibold">Income</span>
                <span>
                  <span className="text-3xl">123 </span>USD
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between py-5">
            <div className="flex flex-col w-full px-5">
              <span className="font-mono font-semibold">Rent</span>
              <span className="text-3xl">10</span>
            </div>
            <div className="flex flex-col w-full px-5">
              <span className="font-mono font-semibold">Lend</span>
              <span className="text-3xl">15</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex flex-col items-center px-5 mb-20">
      {/* <div className="flex flex-col w-full bg-slate-100 dark:bg-slate-900 my-5 rounded-md">
        <div className="border-b-2 px-5 py-5">
          {stat ? (
            <div className="flex flex-col">
              <span className="font-mono font-semibold">CO2 reduced</span>
              <span>
                <span className="text-3xl">2.7</span> kg
              </span>
            </div>
          ) : (
            <div className="flex flex-col ">
              <span className="font-mono font-semibold">Income</span>
              <span>
                <span className="text-3xl">123 </span>USD
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between py-5">
          <div className="flex flex-col w-full px-5">
            <span className="font-mono font-semibold">Rent</span>
            <span className="text-3xl">10</span>
          </div>
          <div className="flex flex-col w-full px-5">
            <span className="font-mono font-semibold">Lend</span>
            <span className="text-3xl">15</span>
          </div>
        </div>
      </div> */}

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
        <h1>Key Feature</h1>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md text-center mb-4 w-full max-w-md">
        <p className="text-lg font-bold">Reduce</p>
        <div className="flex justify-center mt-5">
          <div className="bg-slate-200 dark:bg-slate-900 p-5 rounded-full flex items-center justify-center">
            <MdCo2 className="text-5xl" />
          </div>
        </div>
        <p className="text-sm mt-4">Most buyers only read a book once.</p>
        <div className="mt-4">
          <p className="text-2xl font-bold">2.7 kg</p>
          <p className="text-sm font-light mt-2 font-mono">
            CO<sub>2</sub> emmision equivalent per book
          </p>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md text-center mb-4 w-full max-w-md">
        <p className="text-lg font-bold">Smart Routing</p>
        <div className="flex justify-center mt-5">
          <div className="bg-slate-200 dark:bg-slate-900 p-5 rounded-full flex items-center justify-center">
            <FaRoute className="text-5xl" />
          </div>
        </div>
        <p className="text-sm mt-4">send directly to next lender</p>
        <div className="mt-4">
          <p className="text-2xl font-bold flex-row flex items-center gap-5 justify-center">
            lender <FaArrowCircleRight /> lender{" "}
          </p>
          <p className="text-sm font-light mt-2 font-mono">
            timesaving, less carbon footprint
          </p>
        </div>
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
          <p className="text-sm font-light mt-2 font-mono">
            At 100% brightness
          </p>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">3-9%</p>
          <p className="text-sm font-light mt-2 font-mono">
            At typical brightness settings
          </p>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-md text-center mb-4 w-full max-w-md">
        <p className="text-lg font-bold">Mobile First</p>
        <div className="flex justify-center mt-5">
          <div className="bg-slate-200 dark:bg-slate-900 p-5 rounded-full flex items-center justify-center">
            <MdEnergySavingsLeaf className="text-5xl" />
          </div>
        </div>
        <p className="text-sm mt-4">
          We encorage user to access from mobile devices
        </p>
        <div className="mt-4">
          <p className="text-2xl font-bold">90%</p>
          <p className="text-sm font-light mt-2 font-mono">
            less energy consumtion compared to laptop
          </p>
        </div>
      </div>
    </div>
  );
}
