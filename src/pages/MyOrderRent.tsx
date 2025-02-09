import { BookOrderTile } from "@/components/BookOrderTile";
import { useGetRentBook } from "@/features/useBook";

export function MyOrderRent() {
  const { data } = useGetRentBook();
  // console.log(data,error)
  return (
    <div className="mb-24">
      {data &&
        data.data
          ?.sort((a, b) => a.end_date.localeCompare(b.end_date) * -1)
          .map((each) => <BookOrderTile data={each} key={each.id} />)}
    </div>
  );
}
