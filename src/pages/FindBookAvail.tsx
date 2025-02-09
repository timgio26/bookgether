import { BookAvail } from "@/components/BookAvail";
import { MySelect } from "@/components/MySelect";
import { Book } from "@/utils/types";
import { useState } from "react";
import { useLocation,useSearchParams} from "react-router";

export type SortBy = 'Rating'|'Price'|'Popularity'

export function FindBookAvail(){
    const {state} = useLocation()
    const [sortBy,setSortBy] = useState<SortBy>()
    const [searchParams] = useSearchParams()


    function handleValueChange(value:SortBy){
        setSortBy(value);
      }
    
    console.log(sortBy)

    
    
    return(
        <div className="flex flex-col mb-10">
            <div className="mx-4 mt-4">
                <div>
                    <h1 className="text-center my-5 font-mono text-lg">
            {searchParams.get('title')}

                    </h1>

                </div>
            <MySelect placeholder="Sort By" valList={['Rating','Price','Popularity']} onValueChange={handleValueChange}/>
            </div>
            {state.map((each:Book)=><BookAvail book={each} key={each.id}/>)}
        </div>
    )
}