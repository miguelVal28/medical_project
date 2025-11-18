"use server";

import { CreateServerClient } from "./baseDatabaseService";

// Define the profile type
export type Profile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  specialty: string;
  consultory: string;
};

export async function signMedic(email: string, password: string) {
  const supabase = CreateServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

// Get user ID from email
export async function getMedicData(email: string): Promise<Profile | null> {
  if (!email) return null;

  console.log("I run in the server!");

  const supabase = CreateServerClient();
  try {
    const { data, error } = await supabase
      .from("medics")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase error in getMedicData:", error);
      return null;
    }

    return data ?? null;
  } catch (err) {
    console.error("Unexpected error fetching user ID:", err);
    return null;
  }
}

// Save or update user profile
export async function saveMedicProfile(email: string, profile: Profile) {
  if (!email) return;
  const supabase = CreateServerClient();

  try {
    //Update the data from the medic within the profile page
    const result = await supabase
      .from("medics")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        birth_date: profile.birth_date,
        specialty: profile.specialty,
        consultory: profile.consultory,
      })
      .eq("email", email);
    if (result.error) {
      throw result.error;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving profile:", error);
    } else {
      console.error("Unhandled exception:", error);
    }

    return null;
  }
}

// // Fetch specialty enum options from Supabase
// export async function fetchSpecialtyOptions() {
//     const supabase = CreateServerClient();

//   try {
//     // Getting enum values directly from Supabase's type information
//     const { data, error } = await supabase.rpc(
//       "get_specialty_enum_values"
//     );

//     if (error) {
//       console.error("Error fetching specialty options:", error);
//       return;
//     }

//     if (data) {
//       setSpecialtyOptions(data);
//     }
//   } catch (error) {
//     console.error("Error fetching specialty options:", error);
//   }
// }
