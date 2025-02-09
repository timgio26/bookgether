import { BookOrderTile } from "@/components/BookOrderTile";
import { useGetLendBook } from "@/features/useBook";

export function MyOrderLend() {
  const { data } = useGetLendBook();
  // console.log(data)
  return (
    <div className="mb-24">
      {data &&
        data.data
          ?.sort((a, b) => a.end_date.localeCompare(b.end_date) * -1)
          .map((each) => <BookOrderTile data={each} key={each.id} />)}
    </div>
  );
}
