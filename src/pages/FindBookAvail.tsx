import { BookAvail } from "@/components/BookAvail";
import { Book } from "@/utils/types";
import { useLocation } from "react-router";

export function FindBookAvail(){
    
    const {state} = useLocation()
    return(
        <div className="flex flex-col">
            {state.map((each:Book)=><BookAvail book={each} key={each.id}/>)}
        </div>
    )
}