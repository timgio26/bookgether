import {getBook,getBookid} from "../utils/api"
import { useQuery } from "@tanstack/react-query";

export function useGetBook(){
    const {data,error} = useQuery(
        {
            queryFn:getBook,
            queryKey:['book']
        }
    )
    return {data,error}
}


export function useGetBookId(id:string){
    const {data,error} = useQuery(
        {
            queryFn:() => getBookid(id),
            queryKey:['bookid']
        }
    )
    return {data,error}
}