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
  rent_price: number;
};

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
  total_cost: number;
};

export const MyRentSchema = z.object({
  id: z.number(),
  book_id: z.object({
    title: z.string(),
    owner_id: z.object({
      name: z.string(),
    }),
  }),
  renter_id: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  total_cost: z.number(),
});

export const rentOrderArraySchema = z.array(MyRentSchema);

export type MyRent = z.infer<typeof MyRentSchema>;

export const MyLendSchema = z.object({
  id: z.number(),
  book_id: z.object({
    title: z.string(),
    owner_id: z.string(),
  }),
  renter_id: z.object({
    user_id:z.string(),
    name:z.string(),
    created_at:z.string()
  }),
  start_date: z.string(),
  end_date: z.string(),
  total_cost: z.number(),
});

export const lendOrderArraySchema = z.array(MyLendSchema);

export type MyLend = z.infer<typeof MyLendSchema>;
