import { BookOrderTile } from "@/components/BookOrderTile"
import { useGetRentBook } from "@/features/useBook"

export function MyOrderRent(){
    const {data} = useGetRentBook()
    // console.log(data,error)
    return(
        <div className="mb-24">
            {data && data.data?.map((each)=><BookOrderTile data={each} key={each.id}/>)}
        </div>
    )
}