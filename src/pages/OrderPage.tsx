import { useNavigate } from "react-router";
// import { useGetBookId, useGetUnavailalbeDate, useGetUserProfile } from "@/features/useBook";
import { BookZ, CreateOrder } from "@/utils/types";
import { DatePicker } from "@/components/DatePicker";
import { createOrder } from "@/utils/api";
import { useEffect } from "react";
import { FaTruckFast, FaTruck } from "react-icons/fa6";
import { MapStatic } from "@/components/MapStatic";
import { IoMdPin } from "react-icons/io";
import { useCheckout } from "@/features/useCheckout";

export function OrderPage() {
  const navigate = useNavigate();

  const {
    id,
    data,
    error,
    user,
    dateObj,
    setDateObj,
    differenceInDays,
    setDifferenceInDays,
    shipping,
    setShipping,
    unavailableDate,
    errorUnavailableDate,
  } = useCheckout();

  const unavailableDates = unavailableDate?.unavailableDates || [];

  useEffect(() => {
    if (dateObj.startdate && dateObj.enddate) {
      const diffInDays =
        (dateObj.enddate.getTime() - dateObj.startdate.getTime()) /
        (1000 * 60 * 60 * 24);
      setDifferenceInDays(diffInDays);
    }
  }, [dateObj, setDifferenceInDays]);

  if (!id || error || !data || errorUnavailableDate) {
    return <div>book not found</div>;
  }

  const bookdata = data[0] as BookZ;

  function handlePin() {
    navigate("/profile/edit");
  }

  async function handleCreateOrder() {
    if (!user || !dateObj.startdate || !dateObj.enddate) return;

    const orderData: CreateOrder = {
      book_id: id,
      renter_id: user.user_id,
      start_date: dateObj.startdate?.toDateString(),
      end_date: dateObj.enddate?.toDateString(),
      shipping_cost: shipping=="Regular"?2.5:5,
      total_cost: (differenceInDays * bookdata.rent_price)+ (shipping ? (shipping === 'Regular' ? 2.5 : 5) : 0),
      order_status:"open"
    };

    const { error } = await createOrder(orderData);

    if (!error) navigate("/order/confirm/");
  }

  return (
    <div className="flex flex-col gap-4 px-5 pb-16">
      <div>
        <h1 className="text-xl font-bold my-2">{bookdata.title}</h1>
        <h1 className="text-md text-gray-500 dark:text-gray-300">
          {bookdata.author}
        </h1>
        <h1 className="text-md text-gray-500  dark:text-gray-300">
          from:{" "}
          {typeof bookdata.owner_id === "object" && bookdata.owner_id.name}
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-medium">Start date:</h1>
        <DatePicker
          startOrEnd={"startdate"}
          setDateObj={setDateObj}
          unavailableDates={unavailableDates}
        />
      </div>

      <div>
        <h1 className="text-lg font-medium">End date:</h1>
        <DatePicker
          startOrEnd={"enddate"}
          setDateObj={setDateObj}
          unavailableDates={unavailableDates}
        />
      </div>

      <div>
        <h1 className="text-md font-semibold">Borrower Info:</h1>
        <h1>{user?.name}</h1>
      </div>

      <div>
        <h1 className="text-md font-semibold">Delivery Method:</h1>
        <div className=" grid grid-cols-2 gap-4 mt-3 mb-5">
          <div
            onClick={() => setShipping("Regular")}
            className={`flex flex-col justify-center items-center h-20 bg-slate-100 dark:bg-gray-900 rounded-sm ${
              shipping == "Regular" &&
              "border-slate-950 border-2 dark:border-slate-300"
            } `}
          >
            <FaTruck />
            <span>Regular</span>
          </div>
          <div
            onClick={() => setShipping("Express")}
            className={`flex flex-col justify-center items-center h-20 bg-slate-100 dark:bg-gray-900 rounded-sm ${
              shipping == "Express" &&
              "border-slate-950 border-2 dark:border-slate-300"
            } `}
          >
            <FaTruckFast />
            <span>Express</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Delivery Address: </span>
          <span>{user?.address}</span>
        </div>
        {user?.lat && user.lng ? (
          <MapStatic
            coordinate={{ lat: Number(user.lat), lng: Number(user.lng) }}
          />
        ) : (
          <div className=" flex justify-center mt-2">
            <div
              className="bg-slate-950 flex flex-row justify-center items-center rounded-full px-5 py-1 dark:bg-gray-800"
              onClick={handlePin}
            >
              <IoMdPin color="white" />
              <span className="text-white">add pin poin</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <h1 className="text-md font-semibold">Order Summary:</h1>
        <div className="flex flex-row justify-between">
          <h1>
            {differenceInDays} {differenceInDays === 1 ? "day" : "days"} x{" "}
            {bookdata.rent_price} USD/Day
          </h1>
          <h1 className="font-semibold">
            {differenceInDays * bookdata.rent_price} USD
          </h1>
        </div>

        {shipping && (
          <div className="flex flex-row justify-between">
            <h1>{shipping} shipping</h1>
            <h1 className="font-semibold">
              {shipping == "Regular" ? 2.5 : 5} USD
            </h1>
          </div>
        )}

        <div className="flex flex-row justify-between border-t-2 mt-2">
          <h1 className="font-bold">Total</h1>
          <h1 className="font-bold">
            {(differenceInDays * bookdata.rent_price)+ (shipping ? (shipping === 'Regular' ? 2.5 : 5) : 0)} USD
          </h1>
        </div>
      </div>

      <button
        className={`bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:bg-slate-900 ${
          ((differenceInDays || 0) <= 0 || !shipping || !user?.address) &&
          "cursor-not-allowed opacity-50"
        }`}
        disabled={(differenceInDays || 0) <= 0 || !shipping || !user?.address}
        onClick={handleCreateOrder}
      >
        Confirm
      </button>
    </div>
  );
}
