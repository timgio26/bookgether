import {UserAuth,Addbook} from './types'
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
    // console.log(data.user?.id)
    if(data.user?.id){
      console.log(localStorage.getItem("sb-dzanjlfmchzdirukrrlt-auth-token"))
      await supabase.from('db_profile').insert([{ user_id: data.user.id ,name:data.user.email}])
      // console.log(dataProfile,errorProfile)
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

export async function addbook({title,author,isbn}:Addbook) {
  const owner_id = getUserZ()
  const { data, error } = await supabase
    .from("db_book")
    .insert([{ title,author,isbn,owner_id}])
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

  