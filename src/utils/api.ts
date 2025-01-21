import {UserAuth,Addbook} from './types'
import { supabase } from './supabase'
import { toast } from '@/hooks/use-toast'
import { AuthError} from '@supabase/supabase-js'



export async function register({email,password}:UserAuth){
    const { data, error } = await supabase.auth.signUp({email,password})
    if (error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        style:{color:"red"}
      });
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
    if(!error) toast({title: "Succesfuly log out",
      style:{color:"green"}});
    localStorage.clear()
    return error
}

export async function addbook({title,author,isbn}:Addbook) {
  let owner_id = localStorage.getItem("user") as string
  owner_id = JSON.parse(owner_id).id
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
  const { data, error } = await supabase.from("db_book").select("*");
  if (error)
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      style:{color:"red"}
    });
  return { data, error };
}

  