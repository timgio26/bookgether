import { useGetCountLendBook, useGetCountRentBook } from "@/features/useBook";
import { useStore} from "@/store";
import { getprofile } from "@/utils/api";
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
      const { profile} = useStore();

      // console.log(profile)
      // const profileObj: Profile | null = profile ? JSON.parse(profile) : null;

      let parsedData : Profile | null;

      try {
        parsedData =  profile ? JSON.parse(profile) : null;
      } catch (error) {
        getprofile()
        console.log(error)
        parsedData = null; // or you can set a default value
        
      }

      return {nlend,loadinlend,nrent,loadingrent,error,profileObj:parsedData}
}