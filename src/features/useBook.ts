import {getBook} from "../utils/api"
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