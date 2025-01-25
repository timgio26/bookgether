import { z } from 'zod';


export const ProfileSchema = z.object({
  created_at: z.string(),
  credit: z.number().nullable(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  name: z.string(),
  rating:z.number().nullable(),
  review_num:z.number().nullable(),
  user_id:z.string()
});

export type datePicker = { startdate: Date|null; enddate: Date |null}


export type UserAuth = {
  email: string;
  password: string;
};

export type Addbook={
  title:string;
  author:string;
  isbn:string;
  price:number|string;
}

// export type Profile = {
//   created_at: string;
//   credit: number | null;
//   lat: number | null;
//   lng: number | null;
//   name: string;
//   rating: number | null;
//   review_num: number | null;
//   user_id: string;
// };
export type Profile = z.infer<typeof ProfileSchema>

export type Book = {
  id: number;
  title: string;
  author: string;
  img_url: string | null;
  isbn: string;
  rating: number | null;
  rented_num: number | null;
  created_at: string;
  owner_id: string | Profile;
  condition?: string | null;
  rent_price:number
}

export type Aibook = { 
  title: string;
  author: string;
  numberOfPages:number;
   isbn: string;
  };
export type Airesp = {
  content: Aibook[];
  validUserInput: boolean;
};

