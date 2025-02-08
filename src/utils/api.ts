import {
  UserAuth,
  Addbook,
  Profile,
  ProfileSchema,
  CreateOrder,
  rentOrderArraySchema,
  lendOrderArraySchema,
} from "./types";
import { supabase } from "./supabase";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";
import { getDatesBetween, getUserZ } from "./helperFn";
// import { number } from "zod";

export async function register({ email, password }: UserAuth) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });

  if (data.user?.id) {
    await supabase
      .from("db_profile")
      .insert([{ user_id: data.user.id, name: data.user.email }]);
  }

  return { data, error };
}

export async function signin({ email, password }: UserAuth) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  localStorage.setItem("user", JSON.stringify(data.user));

  return { data, error };
}

export async function logout(): Promise<AuthError | null> {
  const { error } = await supabase.auth.signOut();
  if (!error) toast({ title: "Succesfuly log out" });
  localStorage.clear();
  return error;
}

export async function getprofile(): Promise<Profile> {
  const local_id = getUserZ();
  const response = await supabase
    .from("db_profile")
    .select("*")
    .eq("user_id", local_id);
  const result = ProfileSchema.array().safeParse(response.data);
  if (!result.success) {
    throw new Error("Parsing failed");
  }
  localStorage.setItem("profile",JSON.stringify(result.data[0]))
  return result.data[0];
}

export async function updateProfile(profileData: Profile) {
  const local_id = getUserZ();
  const { data, error } = await supabase
    .from("db_profile")
    .update(profileData)
    .eq("user_id", local_id)
    .select();
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data, error };
}

export async function addbook({ title, author, isbn, price }: Addbook) {
  const owner_id = getUserZ();
  const rent_price = Number(price);
  const { data, error } = await supabase
    .from("db_book")
    .insert([{ title, author, isbn, owner_id, rent_price }])
    .select();
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data, error };
}

export async function getBook() {
  const owner_id = getUserZ();
  const { data, error } = await supabase
    .from("db_book")
    .select("*")
    .eq("owner_id", owner_id);
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data, error };
}

export async function getBookid(id: string) {
  const { data, error } = await supabase
    .from("db_book")
    .select("*,owner_id(*)")
    .eq("id", id);
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data, error };
}

export async function getBookIsbn(isbn: string,title:string) {
  const { data, error } = await supabase
    .from("db_book")
    .select("*,owner_id(*)")
    .or(`isbn.eq.${isbn},title.eq.${title}`)

  const filtered_data = data?.filter((each)=>each.owner_id.user_id!==getUserZ())
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data:filtered_data, error };
}

export async function getBookUnavailableDate(id:string|number){
  const { data, error } = await supabase
    .from("db_book_order")
    .select("start_date,end_date")
    .eq("book_id",Number(id))
    .neq('order_status','canceled');
  const unavailableDates= data?.map((each)=>getDatesBetween(each.start_date,each.end_date)).flat()
  return { unavailableDates, error }
}

export async function getNextOrder(book_id:number|string, start_date:string){
  const { data, error } = await supabase
      .from("db_book_order")
      .select("*,renter_id(lat,lng),book_id(owner_id(lat,lng))")
      .eq("book_id",Number(book_id))
      .eq("start_date",start_date)
      .neq('order_status','canceled')
      .neq('order_status','open')
      .neq('order_status','returned')
    return {data,error}
}

export async function delBook(id: string) {
  const { error } = await supabase.from("db_book").delete().eq("id", id);
  return error;
}

export async function createOrder(orderdata: CreateOrder) {
  const { data, error } = await supabase
    .from("db_book_order")
    .insert([orderdata])
    .select();

  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });

  return { data, error };
}

export async function getMyRentOrder() {
  const { data, error } = await supabase
    .from("db_book_order")
    .select("*,book_id(*,owner_id(name))")
    .eq("renter_id", getUserZ());

  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });

  const result = rentOrderArraySchema.safeParse(data);

  if (!result.success) {
    toast({
      title: "Data Validation Error",
      description: "The fetched data does not match the expected format.",
      style: { color: "red" },
    });
    return { data: null, error: new Error("Data validation error") };
  }

  return { data: result.data, error };
}

export async function getMyLendOrder() {
  const { data, error } = await supabase
    .from("db_book_order")
    .select("*,book_id!inner(*),renter_id(*)")
    .eq("book_id.owner_id", getUserZ());

  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });

    // console.log(data)
  const result = lendOrderArraySchema.safeParse(data);

  if (!result.success) {
    toast({
      title: "Data Validation Error",
      description: "The fetched data does not match the expected format.",
      style: { color: "red" },
    });
    return { data: null, error: new Error("Data validation error") };
  }
  return { data: result.data, error };
}

export async function getLendCount() {
  const { count, error } = await supabase
    .from("db_book_order")
    .select("*,book_id!inner(*)", { count: "exact", head: true })
    .eq("book_id.owner_id", getUserZ())
    .eq('order_status','close')
  return { count, error };
}

export async function getRentCount() {
  const { count, error } = await supabase
    .from("db_book_order")
    .select("*,renter_id(*)", { count: "exact", head: true })
    .eq("renter_id", getUserZ())
    .eq('order_status','close')
  return { count, error };
}


export async function cancelOrder(id:string|number) {
  const { data, error } = await supabase
    .from("db_book_order")
    .update({ order_status: "canceled" })
    .eq("id", id.toString())
    .select();
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });
  return { data, error };
}

export async function processOrder(id:string|number,curStage:string,rented_num:number|null,book_id:number) {

  const stats = ["open","confirm","shipped","returned","close"]
  const nextStage = stats[stats.indexOf(curStage)+1]

  if (nextStage=='open') return {data:[],error:"wrong stats"}

  const { data, error } = await supabase
    .from("db_book_order")
    .update({ order_status: nextStage })
    .eq("id", id.toString())
    .select();

  if (nextStage == "close") {
    await supabase
      .from("db_book")
      .update({ rented_num: (rented_num||0)+1 })
      .eq("id", book_id);
  }

  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style: { color: "red" },
    });

  return { data, error };
}

