import { addbook } from "@/utils/api";
import { Addbook } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

export function FormAddBook() {
  const queryClient = useQueryClient();
  const [bookData, setBookData] = useState<Addbook>({
    title: "",
    author: "",
    isbn: "",
    price:""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleFormUpdate(e: ChangeEvent<HTMLInputElement>): void {
    const { name } = e.target;
    setBookData((state) => ({ ...state, [name]: e.target.value }));
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await addbook(bookData);
    if (!error) {
      setBookData({ title: "", author: "", isbn: "" ,price:""});
      queryClient.invalidateQueries({ queryKey: ["book"] });
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100">
        Book Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
        value={bookData.title}
        onChange={handleFormUpdate}
        required
      />
      <label
        htmlFor="author"
        className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100"
      >
        Author
      </label>
      <input
        type="text"
        name="author"
        id="author"
        className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
        value={bookData.author}
        onChange={handleFormUpdate}
        required
      />
      <label htmlFor="isbn" className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100">
        ISBN
      </label>
      <input
        type="text"
        name="isbn"
        id="isbn"
        className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
        value={bookData.isbn}
        onChange={handleFormUpdate}
      />
            <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100">
        Rent Price / Day
      </label>
      <input
        type="number"
        name="price"
        id="price"
        step={"any"}
        className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
        value={bookData.price}
        onChange={handleFormUpdate}
      />
      <button className="bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:bg-slate-800">
        {!isLoading ? "Add Book" : "Loading"}
      </button>
    </form>
  );
}
