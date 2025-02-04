import { useParams } from "react-router";
import { datePicker } from "@/utils/types";
import { useGetBookId, useGetUnavailalbeDate, useGetUserProfile } from "./useBook";
import { useState } from "react";

export function useCheckout() {
  const { id = "" } = useParams();
  const { data: respdata } = useGetBookId(id);
  const { data, error } = respdata || {};
  const { data: user } = useGetUserProfile();
  const [dateObj, setDateObj] = useState<datePicker>({
    startdate: null,
    enddate: null,
  });
  const [differenceInDays, setDifferenceInDays] = useState<number>(0);
  const [shipping, setShipping] = useState<"Regular" | "Express">();
  const { data: unavailableDate, error: errorUnavailableDate } =
    useGetUnavailalbeDate(id);
  return {id,data,error,user,dateObj, setDateObj,differenceInDays, setDifferenceInDays,shipping, setShipping,unavailableDate,errorUnavailableDate};
}
