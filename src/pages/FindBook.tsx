import { ChangeEvent, FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { fetchAiResponse } from "@/utils/bookai";
import { Airesp } from "@/utils/types";
import { BookTile } from "@/components/BookTile";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import { useTheme } from "./ThemeProvider";

const testBook: Airesp = {
  content: [
    {
      title: "Mindset: The New Psychology of Success",
      numberOfPages: 276,
      author: "Carol S. Dweck",
      isbn: "9780345472328",
    },
  ],
  validUserInput: true,
};

export function FindBook() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [answer, setAnswer] = useState<null | Airesp>(testBook);

  console.log(theme)

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    setAnswer(null);
    e.preventDefault();
    const { respContent } = await fetchAiResponse(searchVal);
    if (respContent) setAnswer(respContent);
    setLoading(false);
  }

  return (
    <div className="flex flex-col">
      <div>
        <form className="flex my-4 mx-2" action="" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 p-2 mr-2 text-sm border border-gray-300 rounded dark:bg-transparent"
            onChange={handleSearchInput}
            value={searchVal}
            placeholder="Tell AI what book you want to read"
          />
          <button type="submit" className="p-1 text-white bg-slate-950 dark:bg-slate-800 rounded aspect-square w-[45.33px] flex justify-center items-center">
            <Search />
          </button>
        </form>
      </div>
      <div className="pb-24 grid-cols-1 justify-center">
        {loading ? (
          <div className="flex justify-center">
            <UseAnimations animation={loading2} size={56} fillColor={theme==='dark'?"white":'#0f172a'}/>
          </div>
        ) : (
          answer &&
          answer.content.map((each, index) => (
            <BookTile
              key={index}
              title={each.title}
              author={each.author}
              numberOfPages={each.numberOfPages}
              isbn={each.isbn}
            />
          ))
        )}
      </div>
    </div>
  );
}
