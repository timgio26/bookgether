import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router";

export function Confirm() {
  return (
    <div className="h-lvh flex flex-col justify-center items-center gap-5">
      <FaCircleCheck size={250} className="text-green-600" />
      <div className="text-center">

      <h1 className="text-2xl font-semibold my-2">Order Submited</h1>
      <h1 className="font-mono font-light">please wait for book owner to confirm</h1>
      <Link to={"/my-order/rent"}>
        <div className="bg-slate-800 my-10 py-2 rounded-full">My Order</div>
      </Link>
      </div>
    </div>
  );
}
