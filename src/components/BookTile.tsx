import { getBookIsbn } from "@/utils/api";
import { Aibook } from "@/utils/types";
import { useNavigate } from "react-router";


export function BookTile({title,author,numberOfPages,isbn}:Aibook) {
  const navigate = useNavigate()

    async function handleClick(){
        const {data} = await getBookIsbn(isbn)
        // console.log(data)
        if(data?.length) navigate('available',{state:data})
    }
  return (
    <div className="flex flex-col p-4 my-4 mx-2 bg-white border rounded shadow-lg" onClick={handleClick}>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-md text-gray-600">by {author}</p>
      <p className="text-sm text-gray-500">Pages: {numberOfPages}</p>
      <p className="text-sm text-gray-500">ISBN: {isbn}</p>
    </div>
  );
}
