import { z } from "zod";

// Define the Zod schema for the User object
const UserSchema = z.object({
  id: z.string(),
  // Add other properties as per your requirements
});

export function getUserZ(): string | null {
  const userString = localStorage.getItem("user");

  if (!userString) {
    console.warn("No user found in localStorage.");
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
