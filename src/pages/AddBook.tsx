import { ChangeEvent, FormEvent, useState } from "react"
import { Addbook } from "@/utils/types"
import {addbook} from "../utils/api"

export function AddBook(){
    const [bookData,setBookData] = useState<Addbook>({title:"",author:"",isbn:""})
    const [isLoading, setIsLoading] = useState<boolean>(false);
    function handleFormUpdate(e:ChangeEvent<HTMLInputElement>):void{
        const {name} =e.target
        setBookData((state)=>({...state,[name]: e.target.value }))
    }
    async function handleFormSubmit(e:FormEvent<HTMLFormElement>):Promise<void>{
        e.preventDefault()
        setIsLoading(true)
        const {error} = await addbook(bookData)
        if(!error)setBookData({title:"",author:"",isbn:""})
        setIsLoading(false)
    }
    return(
        <div>
            <form onSubmit={handleFormSubmit} className="flex flex-col">
                <label htmlFor="title" className="mb-2 text-sm font-medium text-gray-700">Book Title</label>
                <input type="text" name="title" id="title" className="mb-4 border-b border-gray-300 p-2 focus:outline-none" value={bookData.title} onChange={handleFormUpdate}/>
                <label htmlFor="author" className="mb-2 text-sm font-medium text-gray-700">Author</label>
                <input type="text" name="author" id="author" className="mb-4 border-b border-gray-300 p-2 focus:outline-none" value={bookData.author} onChange={handleFormUpdate}/>
                <label htmlFor="isbn" className="mb-2 text-sm font-medium text-gray-700">ISBN</label>
                <input type="text" name="isbn" id="isbn" className="mb-4 border-b border-gray-300 p-2 focus:outline-none" value={bookData.isbn} onChange={handleFormUpdate}/>
                <button className="bg-blue-500 text-white p-2 rounded hover:opacity-75 focus:outline-blue-600">{!isLoading?"Add Book":"Loading"}</button>
            </form>
        </div>
    )
}