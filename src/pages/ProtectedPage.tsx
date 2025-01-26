import { toast } from "@/hooks/use-toast"
import { getUserZ } from "@/utils/helperFn"
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"

type ProtectedPageProp = {
    children:ReactNode
}

export function ProtectedPage({children}:ProtectedPageProp){
    const navigate = useNavigate()
    const user = getUserZ()
    // console.log(user)
    useEffect(()=>{
        if(!user){
            toast({
                title: "Unauthorized",
                description: "Please Log in / Register",
              });
            navigate('/login')
        }
    },[navigate,user])

    return(
        <>
        {children}
        </>
    )
}