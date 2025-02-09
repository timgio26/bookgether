import { toast } from "@/hooks/use-toast";
import { getBookIsbnCount } from "@/utils/api";
import { Aibook } from "@/utils/types";
import { useNavigate } from "react-router";

export function BookTile({ title, author, numberOfPages, isbn }: Aibook) {
  const navigate = useNavigate();

  async function handleClick() {
    const {count} = await getBookIsbnCount(isbn,title)
    // const { data } = await getBookIsbn(isbn,title);
    console.log(count)
    // console.log(data?.length)
    if (count) {
      const searchParams = new URLSearchParams({isbn,title})
      navigate(`available?${searchParams}`);
    } else
      toast({
        title: "No Book Found",
        description: "No users have this book available.",
      });
  }
  return (
    <div
      className="flex flex-col p-4 my-4 mx-2 bg-white border dark:border-none rounded shadow-lg dark:bg-slate-900"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
      <p className="text-md text-gray-600  dark:text-slate-300">by {author}</p>
      <p className="text-sm text-gray-500  dark:text-slate-200">Pages: {numberOfPages}</p>
      <p className="text-sm text-gray-500  dark:text-slate-200">ISBN: {isbn}</p>
    </div>
  );
}
