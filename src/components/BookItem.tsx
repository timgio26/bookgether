import { delBook } from "@/utils/api";
import { BookZ } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { generateStars } from "@/utils/helperFn";
import { useNavigate } from "react-router";


export function BookItem({book} :{book:BookZ}):JSX.Element {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  async function handleDelete(){
    const error = await delBook(book.id.toString())
    if(!error) queryClient.invalidateQueries({queryKey:["book"]})
  }

  function handleEdit(){
    const searchParams = new URLSearchParams({bookid:book.id.toString()})
    navigate(`/editbook?${searchParams}`)
  }

  return (
    <div className="p-4 m-4 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{book.title || "No Title"}</h2>
      <p className="text-gray-700 dark:text-gray-200">Author: {book.author || "Unknown"}</p>
      <p className="text-gray-700  dark:text-gray-200">ISBN: {book.isbn}</p>
      <p className="text-gray-500  dark:text-gray-100">Rating: {generateStars(book.rating)}</p>
      <p className="text-gray-500 dark:text-gray-100">
        Rented: {book.rented_num ? book.rented_num : 0} times
      </p>
      <p className="text-gray-500 dark:text-gray-100">
        Created At: {new Date(book.created_at).toLocaleDateString()}
      </p>
      <p className="font-bold text-gray-700 dark:text-gray-200">
        Rent price : USD {book.rent_price} / day
      </p>

      {/* Placeholder for missing image */}
      {book.img_url ? (
        <img
          src={"https://dzanjlfmchzdirukrrlt.supabase.co/storage/v1/object/public/"+book.img_url}
          alt={book.title}
          className="mt-4 w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="mt-4 w-full h-48 bg-gray-200 rounded flex justify-center items-center">
          <span className="text-gray-400">No Image Available</span>
        </div>
      )}
      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className="justify-center flex">
          <button className="w-full border-slate-950 dark:border-slate-800 border-2 border-solid rounded dark:bg-slate-800"
          onClick={handleEdit}>edit</button>
        </div>
        <div className="justify-center flex">
          <button className="w-full bg-slate-950 border-2 border-slate-8000 dark:border-slate-800 border-solid  text-white p-2 rounded hover:opacity-75 focus:outline-slate-950" onClick={handleDelete}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
