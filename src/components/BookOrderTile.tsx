import { MyLend, MyRent } from "@/utils/types";
import { cancelOrder, processOrder } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type BookOrderTileProp = {
  data: MyRent | MyLend;
};


export function BookOrderTile({ data }: BookOrderTileProp) {
  const [loading,setLoading] = useState<boolean>(false)
  const queryClient = useQueryClient();


  async function handleCancel(){
    setLoading(true)
    const {error} = await cancelOrder(data.id)

    if (typeof data.renter_id == "string"){
      if(!error) queryClient.invalidateQueries({queryKey:["rentorder"]})
    }else{
      if(!error) queryClient.invalidateQueries({queryKey:["lendorder"]})
    }
  
    setLoading(false)
  }


  async function handleProcess(){
    setLoading(true)
    const {error} = await processOrder(data.id,data.order_status)
    if (typeof data.renter_id == "string"){
      if(!error) queryClient.invalidateQueries({queryKey:["rentorder"]})
    }else{
      if(!error) queryClient.invalidateQueries({queryKey:["lendorder"]})
    }
    setLoading(false)
  }

  const ecoDelivery:boolean  = false

  return (
    <div className={`bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md mx-4 my-2 shadow-md ${loading&&"opacity-75"}`}>
      <div className="flex flex-row justify-between">
        <h1>{data.id}</h1>
        <h1
          className={"font-bold"}
        >
          {data.order_status.toUpperCase()}
        </h1>
      </div>
      <h1 className="text-lg font-semibold mt-2">{data.book_id.title}</h1>

      {typeof data.book_id.owner_id == "object" && (
        <h1 className="text-sm font-light">{data.book_id.owner_id.name}</h1>
      )}
      {typeof data.renter_id == "object" && (
        <h1 className="text-sm font-light">{data.renter_id.name}</h1>
      )}

      <h1 className="text-sm font-light">
        {data.start_date} - {data.end_date}
      </h1>

      <h1 className="text-right font-mono font-bold text-lg border-t-2 border-slate-600 mt-3">
        total: {data.total_cost} usd
      </h1>

      {(typeof data.renter_id != "string" && data.order_status!="canceled" && data.order_status!="close")&&
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.order_status=="open"&&
              <button className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800" onClick={handleCancel} disabled={loading}>Cancel</button>
        
        }
              <button className="bg-slate-950 border-2 border-slate-8000 dark:border-slate-950 border-solid text-white p-2 rounded hover:opacity-75 focus:outline-slate-950"  disabled={loading} onClick={handleProcess}>Process</button>
      </div>
      }

      {
        typeof  data.renter_id == "string"&&
        <div className="grid grid-cols-2 gap-3 mt-4">
          {
            data.order_status == "open"&&
          <button className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800 p-2" onClick={handleCancel}>Cancel</button>
          }
          {
            data.order_status == "close"&&
            <button>review</button>
          }
          {data.order_status == "shipped"&&
            // <button>review</button>
          <button>return</button>
          }


          {
          ecoDelivery&&
          <button>Eco Delivery</button>

          }
        </div>
      }
    </div>
  );
}
