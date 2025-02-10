import { getBookid, updateBookId, uploadImg } from "@/utils/api";
import { BookZ,BookUpdateSchema} from "@/utils/types";
import { FormEvent, useEffect, useState} from "react";
import { useSearchParams } from "react-router";

export function EditBook() {
    const [searchParams] = useSearchParams()
    const [file,setFile] = useState<File>() 
    const id = searchParams.get('bookid')
    const [formData,setFormData] = useState<BookZ>()


    useEffect(()=>{
      async function getBook(){
        const {data,error} = await getBookid(id||"")
        if(error)console.log(error)
        if(data)setFormData(data)
      }
      getBook()
    },[id])

    function handleFileChange (event: React.ChangeEvent<HTMLInputElement>){
      const files = event.target.files;
      if (!files)return
      setFile(files[0])
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
      e.preventDefault()
      if (!file)return

      const parseResult = BookUpdateSchema.safeParse(formData)
      if(!parseResult.success) return

      const {data,error} = await uploadImg(file)

      if(error || !data ||!id) return

      const {data:parseData} = parseResult
      parseData.img_url=data.fullPath

      const {data:updatedata} = await updateBookId(id,parseResult.data)
      console.log(updatedata)
    }


    console.log(formData)


  return (
    <div className="px-4">
      <h1 className="text-center text-2xl my-5">Edit Book</h1>
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
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
          value={formData?.author}
          // onChange={handleAuthor}
        //   required
        />
        <label
          htmlFor="isbn"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100"
        >
          ISBN
        </label>
        <input
          type="text"
          name="isbn"
          id="isbn"
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          value={formData?.isbn}
          multiple={false}
        />
        <label
          htmlFor="bookPrice"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100"
        >
          Rent Price / Day:
        </label>
        <input
          type="number"
          name="bookPrice"
          id="bookPrice"
          step={"any"}
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          value={formData?.rent_price}
        />
        <label
          htmlFor="bookImg"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100"
        >
          Image:
        </label>
        <input
          type="file"
          name="bookImg"
          id="bookImg"
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        <input
          type="submit"
          value="Submit"
          className="bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:bg-slate-800"
        />
      </form>
    </div>
  );
}
