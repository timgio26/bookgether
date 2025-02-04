
import { useGetBook } from "@/features/useBook"
import { BookItem } from "@/components/BookItem"
import { AddBookDrawer } from "@/components/AddBookDrawer"
import { PiEmpty } from "react-icons/pi";

export function AddBook(){
    const {data} = useGetBook()
    // console.log(data?.data?.length)
    return (
      <div>
        <div className="fixed bottom-14 w-full z-10 flex justify-center py-2">
          <AddBookDrawer />
        </div>
        <div className="pb-24">
          {!data?.data?.length&&<div className="text-center my-40">
            <h1 className="font-mono">You have no book</h1>
            <div className="flex justify-center">
            <PiEmpty size={90} className="my-5 opacity-35"/>

            </div>
            <h1 className="font-mono">please add book to be listed</h1>
            </div>}
          {data?.data?.map((each, index) => (
            <BookItem book={each} key={index} />
          ))}
        </div>
      </div>
    );
}