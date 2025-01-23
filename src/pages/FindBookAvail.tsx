import { BookAvail } from "@/components/BookAvail";
import { useLocation } from "react-router";

export function FindBookAvail(){
    const {state} = useLocation()
    console.log(state)
    return(
        <div className="flex flex-col">
            <BookAvail/>
        </div>
    )
}