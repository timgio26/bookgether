import { BookOrderTile } from "@/components/BookOrderTile"
import { useGetLendBook } from "@/features/useBook"

export function MyOrderLend(){
    const {data} = useGetLendBook()
    // console.log(data)
    return(
        <div>
            {data && data.data?.map((each)=><BookOrderTile data={each} key={each.id}/>)}
        </div>
    )
}