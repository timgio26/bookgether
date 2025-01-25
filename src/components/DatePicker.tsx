import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { datePicker } from "@/utils/types"

type DatePickperProp = {
  startOrEnd:'startdate'|'enddate';
  setDateObj: React.Dispatch<React.SetStateAction<datePicker>>;
}

export function DatePicker({startOrEnd,setDateObj}:DatePickperProp) {
  const [date, setDate] = useState<Date>()
  useEffect(()=>{
    setDateObj((state)=>({...state,[startOrEnd]:date}))
  },[date,setDateObj,startOrEnd])



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
