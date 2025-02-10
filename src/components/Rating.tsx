import { FaStar } from "react-icons/fa";

type RatingProp = {
    n:number;
    size:number;
    selected:number;
    setSelected:React.Dispatch<React.SetStateAction<number>>
}

export function Rating({n,size,selected,setSelected}:RatingProp){
    const array = Array.from({length:n},(_,i)=>i+1)
    function handleRating(n:number){
        // console.log(n)
        setSelected(n)
    }
    return(
        <div className="flex flex-row justify-center gap-2">
            {array.map((each)=><FaStar key={each} onClick={()=>handleRating(each)} size={size} fill={each<=selected?'yellow':'gray'} />)}
        </div>
    )
}