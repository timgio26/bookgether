import { useStore } from "@/store";
import { distance, generateStars } from "@/utils/helperFn";
import { BookZ, Profile } from "@/utils/types";
import { useNavigate } from "react-router";

type BookAvailProp = {
  book:BookZ;
}

export function BookAvail({ book }:BookAvailProp) {
  const navigate = useNavigate();
  const { profile } = useStore();
  
  const profileObj:Profile|null = profile?JSON.parse(profile):null;

  let bookDistance = "- km"

  if (
    typeof book.owner_id == "object" &&
    book.owner_id.lat &&
    book.owner_id.lng &&
    profileObj &&
    profileObj.lat &&
    profileObj.lng
  ) {
    bookDistance = Math.round(distance(
      Number(book.owner_id.lat),
      Number(book.owner_id.lng),
      Number(profileObj.lat),
      Number(profileObj.lng),
      "K"
    )) + " km";
  }

  // console.log(bookDistance)


  function handleRent() {
    navigate(`/order/${book.id}`);
  }
  return (
    <div className="p-4 m-4 bg-white border dark:border-none rounded-lg shadow-md dark:bg-slate-800">
      {book.img_url ? (
        <img
          src={book.img_url}
          // alt={book.title}
          className="mt-4 w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="mt-4 w-full h-48 bg-gray-200 rounded flex justify-center items-center">
          <span className="text-gray-400">No Image Available</span>
        </div>
      )}
      <div className="mt-4">
        <div className="flex flex-row justify-between my-3">
        <p className="text-gray-500 dark:text-gray-200">
          {book.rating} {generateStars(book.rating)}
        </p>
        <p className="text-gray-500  dark:text-gray-200">
          {book.rented_num ? book.rented_num : 0} rented
        </p>

        </div>
        <p className="text-gray-500  dark:text-gray-200 font-mono">
          Owner:{" "}
          {typeof book.owner_id === "object" ? book.owner_id.name : "Unknown"}
        </p>
        <p className="text-sm">
          {bookDistance} away from you
        </p>
      </div>

      <div className="grid grid-cols-2 pt-4 mt-4 gap-4 border-t-2 border-slate-600/50">
        <div className="justify-center flex items-center">
          {/* <span> */}
          <b>USD {book.rent_price}</b> / Day
          {/* </span> */}
          {/* <button className="w-full border-slate-950 border-2 border-solid rounded">Wishlist</button> */}
        </div>
        <div className="justify-center flex">
          <button
            className="w-full bg-slate-950 dark:bg-black border-2 border-slate-950 border-solid  text-white p-2 rounded hover:opacity-75 focus:outline-slate-950"
            onClick={handleRent}
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );
}
