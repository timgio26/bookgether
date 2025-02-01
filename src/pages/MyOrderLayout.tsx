import { NavLink } from 'react-router';
import { Outlet } from "react-router";

export function MyOrderLayout(){
    return(
        <div>
            <div className='border-b-2 flex gap-2 mx-4 my-3'>
                <NavLink to={"/my-order/rent"} className={({isActive})=>isActive?"font-bold border-b-4 dark:border-slate-400 py-2 px-4":"py-2 px-4"}>Rent</NavLink>
                <NavLink to={"/my-order/lend"} className={({isActive})=>isActive?"font-bold border-b-4 dark:border-slate-400 py-2 px-4":"py-2 px-4"}>Lend</NavLink>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}