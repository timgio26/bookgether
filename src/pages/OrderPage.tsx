import { useParams } from "react-router";
import { useGetBookId } from "@/features/useBook";
import { Book, datePicker, Profile } from "@/utils/types";
import { DatePicker } from "@/components/DatePicker";
import { getprofile } from "@/utils/api";
import { useEffect, useState } from "react";
import { Map } from "@/components/Map";

export function OrderPage() {
  const { id = "" } = useParams();
  const { data: respdata } = useGetBookId(id);
  const { data, error } = respdata || {};
  const [user, setUser] = useState<Profile>();
  const [dateObj, setDateObj] = useState<datePicker>({startdate: null,enddate: null,});
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);

  useEffect(() => {
    if (dateObj.startdate && dateObj.enddate) {
      const diffInDays =
        (dateObj.enddate.getTime() - dateObj.startdate.getTime()) /
        (1000 * 60 * 60 * 24);
      setDifferenceInDays(diffInDays);
    }
  }, [dateObj]);

  useEffect(() => {
    async function getProfileApi() {
      const data = await getprofile();
      setUser(data);
    }
    getProfileApi();
  }, []);

  if (!id || error || !data) {
    return <div>book not found</div>;
  }

  const bookdata = data[0] as Book;

  return (
    <div className="flex flex-col gap-4 px-5 pb-16">
      <div>
        <h1 className="text-xl font-bold">{bookdata.title}</h1>
        <h1 className="text-md text-gray-500">{bookdata.author}</h1>
        <h1 className="text-md text-gray-500">
          from:{" "}
          {typeof bookdata.owner_id === "object" && bookdata.owner_id.name}
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-medium">Start date:</h1>
        <DatePicker startOrEnd={"startdate"} setDateObj={setDateObj} />
      </div>

      <div>
        <h1 className="text-lg font-medium">End date:</h1>
        <DatePicker startOrEnd={"enddate"} setDateObj={setDateObj} />
      </div>

      <div>
        <h1 className="text-md font-semibold">Borrower Info:</h1>
        <h1>{user?.name}</h1>
      </div>

      <div>
        <h1 className="text-md font-semibold">Delivery Method:</h1>
        <Map/>
      </div>

      <div>
        <h1 className="text-md font-semibold">Order Summary:</h1>
        <div className="flex flex-row justify-between">
          <h1>
            {differenceInDays} {differenceInDays === 1 ? "day" : "days"} x{" "}
            {bookdata.rent_price} USD/Day
          </h1>
          <h1 className="font-semibold">
            {differenceInDays || 0 * bookdata.rent_price} USD
          </h1>
        </div>
      </div>

      <button
        className={`bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 ${
          (differenceInDays || 0) <= 0 && "cursor-not-allowed opacity-50"
        }`}
        disabled={(differenceInDays || 0) <= 0}
      >
        Confirm
      </button>
    </div>
  );
}
