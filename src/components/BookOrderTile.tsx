import { MyLend, MyRent } from "@/utils/types";
type BookOrderTileProp = {
  data: MyRent | MyLend;
};
export function BookOrderTile({ data }: BookOrderTileProp) {
  const status =
    new Date().toISOString().slice(0, 10) < data.end_date ? "ACTIVE" : "CLOSED";

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md mx-4 my-2 shadow-md">
      <div className="flex flex-row justify-between">
        <h1>{data.id}</h1>
        <h1
          className={`font-bold ${
            status === "ACTIVE" ? "text-green-600" : "text-slate-600"
          }`}
        >
          {status}
        </h1>
      </div>
      <h1 className="text-lg font-semibold mt-2">{data.book_id.title}</h1>

      {typeof data.book_id.owner_id == "object" && (
        <h1 className="text-sm font-light">{data.book_id.owner_id.name}</h1>
      )}
      {typeof data.renter_id == "object" && (
        <h1 className="text-sm font-light">{data.renter_id.name}</h1>
      )}

      <h1 className="text-sm font-light">
        {data.start_date} - {data.end_date}
      </h1>

      <h1 className="text-right font-mono font-bold text-lg border-t-2 border-slate-600 mt-3">
        total: {data.total_cost} usd
      </h1>
    </div>
  );
}
