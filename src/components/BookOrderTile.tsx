import { MyLend, MyRent, ProfileCoorSchema } from "@/utils/types";
import { cancelOrder, getIsBookWithOwner, processOrder } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { findNextOrder } from "@/utils/helperFn";
import { useStore } from "@/store";
import { toast } from "@/hooks/use-toast";
import { Rating } from "./Rating";

type BookOrderTileProp = {
  data: MyRent | MyLend;
};

export function BookOrderTile({ data }: BookOrderTileProp) {
  const [ecoDelivery,setEcoDelivery] = useState<boolean>()
  const [ecoCo2,setEcoCo2] = useState<number>()
  const [nextId,setNextId] = useState<number>()
  const [rating,setRating] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);
  const [bookInOtherUser,setBookInOtherUser] = useState<boolean>(true);
  const {profile} = useStore()
  const queryClient = useQueryClient();

  useEffect(()=>{
    async function getEcoDeliv(){
      if(data.order_status=="shipped" && profile){
        // console.log(JSON.parse(profile))
        const parseResult = ProfileCoorSchema.safeParse(JSON.parse(profile))
    
        if(!parseResult.success){ console.log('error parse profile coordinate')}
    
        if(!parseResult.data) return null
    
        const resp = await findNextOrder(data.book_id.id,new Date(data.end_date),parseResult.data.lat,parseResult.data.lng)
        if (resp !== undefined) {
          const { eco, nextId,shipCo2Reduction} = resp;
          // console.log(eco, nextId);
          if(eco) {
            setEcoDelivery(true)
            setNextId(nextId)
            setEcoCo2(shipCo2Reduction)
          }
        } else {
          console.log("resp is undefined");
        }
      }
    }
    async function cekBookLocation(){
      // console.log("cekBookLocation")
      if(data.order_status!=="confirm")return
      // console.log("cekBookLocation2")
      const {count} = await getIsBookWithOwner(data.book_id.id)
      // console.log(count)
      if(!count) setBookInOtherUser(false)
    }
    getEcoDeliv()
    cekBookLocation()
  },[data,profile])
  
  async function handleCancel() {
    setLoading(true);
    const { error } = await cancelOrder(data.id);

    if (typeof data.renter_id == "string") {
      if (!error) queryClient.invalidateQueries({ queryKey: ["rentorder"] });
    } else {
      if (!error) queryClient.invalidateQueries({ queryKey: ["lendorder"] });
    }

    setLoading(false);
  }

  async function handleProcess() {
    setLoading(true);
    
    const { error } = await processOrder(data.id, data.order_status,data.book_id.rented_num,data.book_id.id);
    
    if (typeof data.renter_id == "string") {
      if (!error) queryClient.invalidateQueries({ queryKey: ["rentorder"] });
    } else {
      if (!error) queryClient.invalidateQueries({ queryKey: ["lendorder"] });
    }
    setLoading(false);
  }

  async function handleEcoDeliv(){
    setLoading(true)

    handleProcess()

    if(!nextId)return
    const { error } = await processOrder(nextId, 'confirm', null, data.book_id.id);

    if (typeof data.renter_id == "string") {
      if (!error) queryClient.invalidateQueries({ queryKey: ["rentorder"] });
    } else {
      if (!error) queryClient.invalidateQueries({ queryKey: ["lendorder"] });
    }

    toast({
      title: `You just reduce another ${ecoCo2} kg CO2` ,
      // description: error.message,
      style: { color: "green" },
    });

    setLoading(false);
  }

  return (
    <div
      className={`bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md mx-4 my-2 shadow-md ${
        loading && "opacity-75"
      }`}
    >
      <div className="flex flex-row justify-between">
        <h1>{data.id}</h1>
        <h1 className={"font-bold"}>{data.order_status.toUpperCase()}</h1>
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

      {typeof data.renter_id != "string" &&
        data.order_status != "canceled" &&
        data.order_status != "close" && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.order_status == "open" && (
              <button
                className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800 p-2"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            )}
            {((data.order_status != "shipped") && !(data.order_status=='confirm' && bookInOtherUser)) ? (
              <button
                className="bg-slate-950 border-2 border-slate-8000 dark:border-slate-950 border-solid text-white p-2 rounded hover:opacity-75 focus:outline-slate-950"
                disabled={loading}
                onClick={handleProcess}
              >
                {data.order_status == "open"
                  ? "Confirm"
                  : data.order_status == "confirm"
                  ? "Ship"
                  : "Finished"}
              </button>
            ) : (
              <span className="text-xs opacity-75">
                waiting for customer/other to return
              </span>
            )}
          </div>
        )}

      {typeof data.renter_id == "string" && (
        <div className="grid grid-cols-1 gap-3 mt-4">
          {data.order_status == "open" && (
            <button
              className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800 p-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          {data.order_status == "close" && (
            // <button 
            // className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800 p-2"
            // >Review</button>
            <Rating n={5} size={32} selected={rating} setSelected={setRating}/>
          )}
          {data.order_status == "shipped" && (
            // <button>review</button>
            <button
              onClick={handleProcess}
              className="border-slate-950 dark:border-slate-700 border-2 border-solid rounded dark:bg-slate-800 p-2"
            >
              Return
            </button>
          )}

          {(ecoDelivery&&data.order_status=='shipped') && <button className="p-2 bg-green-400 dark:bg-green-700 rounded" onClick={handleEcoDeliv}>Eco Delivery</button>}
        </div>
      )}
    </div>
  );
}
