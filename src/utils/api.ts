import {UserAuth} from './types'
import { supabase } from './supabase'

import { toast } from '@/hooks/use-toast'
import { AuthError } from '@supabase/supabase-js'



export async function register({email,password}:UserAuth){
    const { data, error } = await supabase.auth.signUp({email,password})
    if (error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message
      });
    return { data, error }
}

export async function signin({email,password}:UserAuth){
    const { data, error } = await supabase.auth.signInWithPassword({email,password})
    if (error)
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message
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
  