import { z } from "zod";

// Define the Zod schema for the User object
const UserSchema = z.object({
  id: z.string(),
  // Add other properties as per your requirements
});

export function getUserZ(): string | null {
  const userString = localStorage.getItem("user");

  if (!userString) {
    // console.warn("No user found in localStorage.");
    return null;
  }

  const parseResult = UserSchema.safeParse(JSON.parse(userString));
  if (!parseResult.success) {
    console.error(
      "Error parsing or validating user data:",
      parseResult.error.errors
    );
    return null;
  }

  return parseResult.data.id;
}

export function generateStars(rating: number|null){
  const star = "⭐";
  const fullStars = rating?star.repeat(Math.round(rating)):"Not Rated";
  return fullStars;
};


export function distance(lat1:number, lon1:number, lat2:number, lon2:number, unit:"K"|"N"|"M"):number {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


export function getDatesBetween(startDate: string, endDate: string): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: Date[] = [];

  const currentDate = start;
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}


