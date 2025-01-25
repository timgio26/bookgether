import { useParams } from "react-router";
import { useGetBookId } from "@/features/useBook";
import { Book } from "@/utils/types";
import { DatePicker } from "@/components/DatePicker";

export function OrderPage() {
  const { id = "" } = useParams();

  const { data: respdata } = useGetBookId(id);
  const { data, error } = respdata || {};

  if (!id || error || !data) {
    return <div>book not found</div>;
  }

  const bookdata = data[0] as Book;

  return (
    <div className="flex flex-col gap-4 px-5">
        <div>

      <h1 className="text-xl font-bold">{bookdata.title}</h1>
      <h1 className="text-md text-gray-500">{bookdata.author}</h1>
      <h1 className="text-md text-gray-500">
        from: {typeof bookdata.owner_id === "object" && bookdata.owner_id.name}
      </h1>
        </div>

      <div>
        <h1 className="text-lg font-medium">Start date:</h1>
        <DatePicker />
      </div>

      <div>
        <h1 className="text-lg font-medium">End date:</h1>
        <DatePicker />
      </div>

      <h1 className="text-md font-semibold">Borrower Info:</h1>
      <h1 className="text-md font-semibold">Delivery Method:</h1>
      <h1 className="text-md font-semibold">Order Summary:</h1>

      <button className="bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950">
        Confirm
      </button>
    </div>
  );
}
