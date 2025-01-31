import { FaBox, FaHeadset, FaInfoCircle, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router";

export function ProfileMenu() {
    const navigate = useNavigate()
    function handleClick(route:string){
        navigate(route)
    }
  return (
    <div className="dark:bg-slate-800 bg-slate-100 mx-5 rounded-sm mb-24 ">


      <div className="flex flex-row justify-between items-center" onClick={()=>handleClick("/my-order/rent")}>
        <div className="flex flex-row py-3 px-3 items-center gap-5">
          <div className="dark:bg-slate-700 bg-slate-200 h-10 w-10 rounded-full justify-center flex items-center">
            <FaBox />
          </div>
          <div className="flex flex-col text-left">
            <span>My Order</span>
            <span className="text-sm font-thin">See all books I rent & lend</span>
          </div>
        </div>
        <div className="py-3 px-3">
          <FaAngleRight />
        </div>
      </div>


      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row py-3 px-3 items-center gap-5">
          <div className="dark:bg-slate-700 bg-slate-200  h-10 w-10 rounded-full justify-center flex items-center">
            <FaHeadset />
          </div>
          <div className="flex flex-col text-left">
            <span>Customer Support</span>
            <span className="text-sm font-thin">Get help and support</span>
          </div>
        </div>
        <div className="py-3 px-3">
          <FaAngleRight />
        </div>
      </div>


      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row py-3 px-3 items-center gap-5">
          <div className="dark:bg-slate-700 bg-slate-200  h-10 w-10 rounded-full justify-center flex items-center">
            <FaInfoCircle />
          </div>
          <div className="flex flex-col text-left">
            <span>About App</span>
            <span className="text-sm font-thin">Learn more about BookGether</span>
          </div>
        </div>
        <div className="py-3 px-3">
          <FaAngleRight />
        </div>
      </div>


    </div>
  );
}
