import { toast } from "@/hooks/use-toast";
import { getBookid, updateBookId, uploadImg } from "@/utils/api";
import { BookZ, BookUpdateSchema } from "@/utils/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";

export function EditBook() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState<File>();
  const id = searchParams.get("bookid");
  const [formData, setFormData] = useState<BookZ>();

  useEffect(() => {
    async function getBook() {
      const { data, error } = await getBookid(id || "");
      if (error) console.log(error);
      if (data) setFormData(data);
    }
    getBook();
  }, [id]);


  function handleFormChange(e: ChangeEvent<HTMLInputElement>,key:string) {
    setFormData((state) =>
      state ? { ...state, [key] : e.target.value } : undefined
    );
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1000) return;
    }
    setFile(files[0]);
  }
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) return;

    const parseResult = BookUpdateSchema.safeParse(formData);
    if (!parseResult.success) return;

    const { data: parseData } = parseResult;

    if(file){
      const { data, error } = await uploadImg(file);
      if (error || !data || !id) return;
      parseData.img_url = data.fullPath;
    }

    const { error } = await updateBookId(id, parseResult.data)
    if(!error) {
      toast({
        title: "Book Updated"
        // style: { color: "red" },
      });
      navigate(-1)
    }
  }

  // console.log(formData)

  return (
    <div className="px-4 pb-20">
      <div className="my-5">
      <h1 className="text-center text-2xl font-thin">Edit Book</h1>
      <h1 className="text-center font-bold font-mono">{formData?.title}</h1>

      </div>
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
          onChange={(e) => handleFormChange(e, "author")}
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
          onChange={(e) => handleFormChange(e, "isbn")}
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
          onChange={(e) => handleFormChange(e, "rent_price")}
        />
        <label
          htmlFor="bookImg"
          className="mb-2 text-sm font-medium text-gray-700 dark:text-slate-100"
        >
          Image:
        </label>

<div className="relative mb-10">

        <div
          className={`mt-4 w-full h-48 object-cover rounded bg-slate-500 opacity-50 ${(file || !formData?.img_url) ?"flex":"hidden"} justify-center items-center`}
        >
          <span>{file?.name}</span>
        </div>

        {formData?.img_url && (
          <img
          src={
            "https://dzanjlfmchzdirukrrlt.supabase.co/storage/v1/object/public/" +
            formData?.img_url
          }
          alt={formData.title}
          className="mt-4 w-full h-48 object-cover rounded"
          hidden={file ? true : false}
          />
        )}
        <label htmlFor="bookImg" className="absolute bottom-5 right-7">

          <IoMdCreate size={45} className="bg-slate-500/50 rounded-full p-2"/>
        </label>

        <input
          type="file"
          name="bookImg"
          id="bookImg"
          className="mb-4 border-b border-gray-300 p-2 focus:outline-none dark:bg-transparent"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          hidden
        />
</div>


        <input
          type="submit"
          value="Submit"
          className="bg-slate-950 text-white p-2 rounded hover:opacity-75 focus:outline-slate-950 dark:bg-slate-800"
        />
      </form>
    </div>
  );
}
