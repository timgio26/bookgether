import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SortBy } from "@/pages/FindBookAvail";
  

type MySelectProp = {
  placeholder:string;
  valList:string[];
  onValueChange:(value:SortBy)=>void;
}

export function MySelect({placeholder,valList,onValueChange}:MySelectProp){
  


    return (
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {valList.map((each)=><SelectItem value={each} key={each}>{each}</SelectItem>)}
        </SelectContent>
      </Select>
    );
}