
import { useGetBook } from "@/features/useBook"
import { BookItem } from "@/components/BookItem"
import { AddBookDrawer } from "@/components/AddBookDrawer"

export function AddBook(){
    const {data} = useGetBook()


    

    
    return(
        <div>
            <AddBookDrawer/>

            {data?.data?.map(
                (each,index)=>{
                    console.log(each)
                    return(
                        <BookItem book={each} key={index}/>
                    )
                }
            )}
        </div>
    )
}