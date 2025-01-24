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

export type Profile = {
  created_at: string;
  credit: number | null;
  lat: number | null;
  lng: number | null;
  name: string;
  rating: number | null;
  review_num: number | null;
  user_id: string;
};

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

