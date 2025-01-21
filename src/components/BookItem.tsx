import { Book } from "@/utils/types";

// Function to generate star rating display
function generateStars(rating: number|null){
  const star = "⭐";
  const fullStars = rating?star.repeat(Math.round(rating)):"Not Rated";
  return fullStars;
};

// Book Item Component
export function BookItem({book} :{book:Book}):JSX.Element {
  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{book.title || "No Title"}</h2>
      <p className="text-gray-700">Author: {book.author || "Unknown"}</p>
      <p className="text-gray-700">ISBN: {book.isbn}</p>
      <p className="text-gray-500">Rating: {generateStars(book.rating)}</p>
      <p className="text-gray-500">
        Rented: {book.rented_num ? book.rented_num : 0} times
      </p>
      <p className="text-gray-500">
        Created At: {new Date(book.created_at).toLocaleDateString()}
      </p>

      {/* Placeholder for missing image */}
      {book.img_url ? (
        <img
          src={book.img_url}
          alt={book.title}
          className="mt-4 w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="mt-4 w-full h-48 bg-gray-200 rounded flex justify-center items-center">
          <span className="text-gray-400">No Image Available</span>
        </div>
      )}
    </div>
  );
}
