import {getBook,getBookid,getprofile} from "../utils/api"
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

export function useGetUserProfile(){
    const {data,error} = useQuery(
        {
            queryFn:()=>getprofile(),
            queryKey:['userid']
        }
    )
    return {data,error}
}