import { Link } from "react-router";

export function NoMatch(){
    return(
        <div className="text-center pt-14">
            <h1 className="text-9xl">404</h1>
            <h1>page not found</h1>
            <div className="my-6 flex justify-center">
            <Link to={'/'}><div className="px-5 py-2 rounded-full border bg-slate-300 dark:bg-slate-900">back to Home</div></Link>
            </div>
        </div>
    )
}