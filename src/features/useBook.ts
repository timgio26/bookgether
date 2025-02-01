import {getBook,getBookid,getBookUnavailableDate,getLendCount,getMyLendOrder,getMyRentOrder,getprofile} from "../utils/api"
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

export function useGetRentBook(){
    const {data,error} = useQuery({
        queryFn:getMyRentOrder,
        queryKey:['rentorder']

    })
    return {data,error}
}

export function useGetLendBook(){
    const {data,error} = useQuery({
        queryFn:getMyLendOrder,
        queryKey:['lendorder']

    })
    return {data,error}
}

export function useGetCountLendBook(){
    const {data,error} = useQuery({
        queryFn:getLendCount,
        queryKey:['lendcount']
    })
    return {data,error}
}

export function useGetUnavailalbeDate(id:string|number){
    const {data,error} = useQuery({
        queryFn:()=>getBookUnavailableDate(id),
        queryKey:['lendcount']
    })
    return {data,error} 
}