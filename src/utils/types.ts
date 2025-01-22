export type UserAuth = {
  email: string;
  password: string;
};

export type Addbook={
  title:string;
  author:string;
  isbn:string
}


export type Book = {
  id: number;
  title: string;
  author: string;
  img_url: string | null;
  isbn: string;
  rating: number | null;
  rented_num: number | null;
  created_at: string;
  owner_id: string;
  condition?: string | null;
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
