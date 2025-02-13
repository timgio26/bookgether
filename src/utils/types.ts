import { z } from "zod";

export const ProfileSchema = z.object({
  created_at: z.string(),
  credit: z.number().nullable(),
  // lat: z.number().nullable(),
  lat: z.union([z.string().nullable(), z.number().nullable()]),
  lng: z.union([z.string().nullable(), z.number().nullable()]),
  name: z.string(),
  rating: z.number().nullable(),
  review_num: z.number().nullable(),
  user_id: z.string(),
  address: z.string().nullable(),
});

export type Coordinate = {
  lat: number | string | null;
  lng: number | string | null;
};

export type datePicker = { startdate: Date | null; enddate: Date | null };

export type UserAuth = {
  email: string;
  password: string;
};

export type Addbook = {
  title: string;
  author: string;
  isbn: string;
  price: number | string;
};

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
export type Profile = z.infer<typeof ProfileSchema>;

export const BookSchema = z.object({
  id:z.number(),
  title:z.string(),
  author:z.string(),
  img_url:z.string().nullable(),
  isbn:z.string(),
  rating:z.number().nullable(),
  rented_num:z.number().nullable(),
  rent_price:z.number(),
  created_at:z.string(),
  owner_id:z.object({
    name:z.string(),
    lat:z.string(),
    lng:z.string()
  })
});

export const BookListSchema = z.array(BookSchema)

export type BookList = z.infer<typeof BookListSchema>;

export type BookZ = z.infer<typeof BookSchema>;



export const BookUpdateSchema = z.object({
  author: z.string(),
  img_url: z.string().nullable(),
  isbn: z.string().nullable(),
  rent_price: z.number(),
}); 

export type BookUpdate = z.infer<typeof BookUpdateSchema>;


export type Aibook = {
  title: string;
  author: string;
  numberOfPages: number;
  isbn: string;
};
export type Airesp = {
  content: Aibook[];
  validUserInput: boolean;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type CreateOrder = {
  book_id: string | number;
  renter_id: string;
  start_date: string;
  end_date: string;
  shipping_cost:number;
  total_cost: number;
  order_status:"open"|"confirm"|"shipped"|"returned"|"close"|"canceled"
};

export const MyRentSchema = z.object({
  id: z.number(),
  book_id: z.object({
    id:z.number(),
    title: z.string(),
    owner_id: z.object({
      name: z.string(),
    }),
    rented_num:z.number().nullable()
    // rented_num:z.number()
  }),
  renter_id: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  total_cost: z.number(),
  shipping_cost:z.number(),
  order_status:z.string()
});

export const rentOrderArraySchema = z.array(MyRentSchema);

export type MyRent = z.infer<typeof MyRentSchema>;

export const MyLendSchema = z.object({
  id: z.number(),
  book_id: z.object({
    id:z.number(),
    title: z.string(),
    owner_id: z.string(),
    rented_num:z.number().nullable()
  }),
  renter_id: z.object({
    user_id:z.string(),
    name:z.string(),
    created_at:z.string()
  }),
  start_date: z.string(),
  end_date: z.string(),
  total_cost: z.number(),
  shipping_cost:z.number(),
  order_status:z.string(),
});

export const lendOrderArraySchema = z.array(MyLendSchema);

export type MyLend = z.infer<typeof MyLendSchema>;



export const NextOrderSchema = z.object({
  id: z.number(),
  renter_id: z.object({
    lat: z.string(),
    lng: z.string(),
  }),
  book_id: z.object({
    owner_id: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
});

export type NextOrder = z.infer<typeof NextOrderSchema>;

export const ProfileCoorSchema = z.object({
  lat: z.string(),
  lng: z.string(),
})
