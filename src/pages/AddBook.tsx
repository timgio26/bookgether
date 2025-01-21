
import { useGetBook } from "@/features/useBook"
import { BookItem } from "@/components/BookItem"
import { AddBookDrawer } from "@/components/AddBookDrawer"

export function AddBook(){
    const {data} = useGetBook()
    return (
      <div>
        <div className="fixed bottom-14 w-full z-10 flex justify-center py-2">
          <AddBookDrawer />
        </div>
        <div className="pb-24">
          {data?.data?.map((each, index) => (
            <BookItem book={each} key={index} />
          ))}
        </div>
      </div>
    );
}