import { useGetCountLendBook, useGetCountRentBook } from "@/features/useBook";
import { useStore } from "@/store";
import { Profile } from "@/utils/types";


export function useHomepageData(){
      const {
        data: nlend,
        error: elend,
        isLoading: loadinlend,
      } = useGetCountLendBook();
      const {
        data: nrent,
        error: erent,
        isLoading: loadingrent,
      } = useGetCountRentBook();
    
      const error = erent || elend
      const { profile } = useStore();
      const profileObj: Profile | null = profile ? JSON.parse(profile) : null;

      return {nlend,loadinlend,nrent,loadingrent,error,profileObj}
}