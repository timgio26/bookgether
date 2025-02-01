import { toast } from "@/hooks/use-toast";
import { getBookIsbn } from "@/utils/api";
import { Aibook } from "@/utils/types";
import { useNavigate } from "react-router";

export function BookTile({ title, author, numberOfPages, isbn }: Aibook) {
  const navigate = useNavigate();

  async function handleClick() {
    const { data } = await getBookIsbn(isbn,title);
    if (data?.length) {
      navigate("available", { state: data });
    } else
      toast({
        title: "No Book Found",
        description: "No users have this book available.",
      });
  }
  return (
    <div
      className="flex flex-col p-4 my-4 mx-2 bg-white border rounded shadow-lg dark:bg-slate-900"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
      <p className="text-md text-gray-600  dark:text-slate-300">by {author}</p>
      <p className="text-sm text-gray-500  dark:text-slate-200">Pages: {numberOfPages}</p>
      <p className="text-sm text-gray-500  dark:text-slate-200">ISBN: {isbn}</p>
    </div>
  );
}
