import { BookAvail } from "@/components/BookAvail";
import { MySelect } from "@/components/MySelect";
import { getBookIsbn } from "@/utils/api";
import { BookList } from "@/utils/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export type SortBy = "Rating" | "Price" | "Popularity";

export function FindBookAvail() {
  const [bookList,setBookList] = useState<BookList>()
  const [sortBy, setSortBy] = useState<SortBy>();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    async function getBook() {
      const { data } = await getBookIsbn(
        searchParams.get("isbn") || "",
        searchParams.get("title") || "",
      );
      setBookList(data)
    }
    getBook();
  }, [searchParams]);

  function handleValueChange(value: SortBy) {
    setSortBy(value);
  }

  const sortedList = bookList?.slice().sort((a, b) => {
    if (sortBy == "Price") {
      return a.rent_price - b.rent_price;
    } else if (sortBy == "Popularity") {
      return (b.rented_num || 0)-(a.rented_num || 0);
    } else if (sortBy == "Rating") {
      return (a.rating || 0) - (b.rating || 0);
    } else {
      return 0;
    }
  });

  return (
    <div className="flex flex-col mb-10">
      <div className="mx-4 mt-4">
        <div>
          <h1 className="text-center my-5 font-mono text-lg">
            {searchParams.get("title")}
          </h1>
        </div>
        <MySelect
          placeholder="Sort By"
          valList={["Rating", "Price", "Popularity"]}
          onValueChange={handleValueChange}
        />
      </div>

      {sortedList&&sortedList.map((each) => (
        <BookAvail book={each} key={each.id} />
      ))}
    </div>
  );
}
