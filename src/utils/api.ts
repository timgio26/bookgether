import {UserAuth,Addbook, Profile, ProfileSchema} from './types'
import { supabase } from './supabase'
import { toast } from '@/hooks/use-toast'
import { AuthError} from '@supabase/supabase-js'
import { getUserZ } from './helperFn'


export async function register({email,password}:UserAuth){
    const { data, error } = await supabase.auth.signUp({email,password})
    if (error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        style:{color:"red"}
      });

    if(data.user?.id){
      await supabase.from('db_profile').insert([{ user_id: data.user.id ,name:data.user.email}])
    }

    return { data, error }
}

export async function signin({email,password}:UserAuth){
    const { data, error } = await supabase.auth.signInWithPassword({email,password})
    if (error)
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          style:{color:"red"}
        });
    localStorage.setItem("user",JSON.stringify(data.user))

    return { data, error }
}

export async function logout():Promise<AuthError | null>{
    const { error } = await supabase.auth.signOut()
    if(!error) toast({title: "Succesfuly log out"});
    localStorage.clear()
    return error
}

export async function getprofile():Promise<Profile>{
  const local_id = getUserZ()
  const response = await supabase.from('db_profile').select("*").eq('user_id', local_id)

  const result = ProfileSchema.array().safeParse(response.data)

  if (!result.success) {
    throw new Error('Parsing failed');
  }

  return result.data[0]
}

export async function addbook({title,author,isbn,price}:Addbook) {
  const owner_id = getUserZ()
  const rent_price = Number(price)
  const { data, error } = await supabase
    .from("db_book")
    .insert([{ title,author,isbn,owner_id,rent_price}])
    .select();
  if (error) toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        style:{color:"red"}
      });
  return { data, error };
}

export async function getBook() {
  const owner_id=getUserZ()
  const { data, error } = await supabase.from("db_book").select("*").eq('owner_id',owner_id);
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style:{color:"red"}
    });
  return { data, error };
}

export async function getBookid(id:string) {
  const { data, error } = await supabase.from("db_book").select("*,owner_id(*)").eq('id',id)
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style:{color:"red"}
    });
  return { data, error };
}

export async function getBookIsbn(isbn:string) {
  const { data, error } = await supabase.from("db_book").select("*,owner_id(*)").eq('isbn',isbn);
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style:{color:"red"}
    });
  return { data, error };
}

export async function delBook(id: string) {
  const { error } = await supabase.from("db_book").delete().eq("id", id);
  return error;
}
  