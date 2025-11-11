"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/InputFields";
import { Button } from "@/components/Button";
import HeaderCard from "@/components/HeaderCard";
import { supabaseClient } from "@/lib/supabase";

// Define the profile type
type Profile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_year: string;
  specialty: string;
  consultation_room: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [specialtyOptions, setSpecialtyOptions] = useState<string[]>([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [userId, setUserId] = useState<string | null>(null);

  // Form state
  const [profile, setProfile] = useState<Partial<Profile>>({
    first_name: "",
    last_name: "",
    birth_year: "",
    specialty: "",
    consultation_room: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get user ID from email
  const getUserIdFromEmail = async (email: string) => {
    try {
      const { data, error } = await supabaseClient
        .from("auth.users")
        .select("id")
        .eq("email", email)
        .single();

      if (error) {
        throw error;
      }

      if (data && data.id) {
        setUserId(data.id);
        return data.id;
      }

      return null;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  // Fetch specialty enum options from Supabase
  const fetchSpecialtyOptions = async () => {
    try {
      // Getting enum values directly from Supabase's type information
      const { data, error } = await supabaseClient.rpc(
        "get_specialty_enum_values"
      );

      if (error) {
        console.error("Error fetching specialty options:", error);
        return;
      }

      if (data) {
        setSpecialtyOptions(data);
      }
    } catch (error) {
      console.error("Error fetching specialty options:", error);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async (uid: string) => {
    try {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", uid)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is the error code for "no rows found"
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          user_id: data.user_id,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          birth_year: data.birth_year || "",
          specialty: data.specialty || "",
          consultation_room: data.consultation_room || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save or update user profile
  const saveProfile = async () => {
    if (!userId) return;

    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      // Determine if we're updating or inserting
      const { data: existingProfile } = await supabaseClient
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .single();

      let result;

      if (existingProfile) {
        // Update existing profile
        result = await supabaseClient
          .from("profiles")
          .update({
            first_name: profile.first_name,
            last_name: profile.last_name,
            birth_year: profile.birth_year,
            specialty: profile.specialty,
            consultation_room: profile.consultation_room,
          })
          .eq("user_id", userId);
      } else {
        // Insert new profile
        result = await supabaseClient.from("profiles").insert({
          user_id: userId,
          first_name: profile.first_name,
          last_name: profile.last_name,
          birth_year: profile.birth_year,
          specialty: profile.specialty,
          consultation_room: profile.consultation_room,
        });
      }

      if (result.error) {
        throw result.error;
      }

      setMessage({
        text: "Profile saved successfully!",
        type: "success",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving profile:", error);
        setMessage({
          text: `Error saving profile: ${error.message}`,
          type: "error",
        });
      } else {
        console.error("Unhandled exception:", error);
      }
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const initializeProfile = async () => {
      try {
        // Fetch specialty options
        await fetchSpecialtyOptions();

        // Get user ID from email
        if (session?.user?.email) {
          const uid = await getUserIdFromEmail(session.user.email);

          if (uid) {
            // Fetch user profile using the obtained user ID
            await fetchUserProfile(uid);
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing profile:", error);
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.email) {
      initializeProfile();
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        {/* Profile header card */}
        <HeaderCard
          mainTitle="Your Profile Information"
          subTitle="Read and update your personal and professional information below."
        />

        {/* Profile form card */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {message.text && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                  id="first_name"
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  value={profile.first_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <InputField
                  id="last_name"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  value={profile.last_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="birth_year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Birth Year
                </label>
                <input
                  id="birth_year"
                  name="birth_year"
                  type="date"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border dark:border-gray-700 dark:bg-slate-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={profile.birth_year || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="specialty"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border dark:border-gray-700 dark:bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={profile.specialty || ""}
                  onChange={handleChange}
                >
                  <option value="">Select a specialty</option>
                  {specialtyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <InputField
                  id="consultation_room"
                  label="Consultation Room"
                  type="text"
                  placeholder="Enter your consultation room"
                  value={profile.consultation_room || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <Button
                  type="button"
                  onClick={saveProfile}
                  isLoading={saving}
                  variant="primary"
                >
                  Save Profile
                </Button>
                <Link href="/dashboard">
                  <Button type="button" variant="secondary" className="ml-4">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Professional information card */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Professional Information
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {session?.user?.email || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Specialty
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {profile.specialty || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Consultation Room
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {profile.consultation_room || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Profile Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {profile.id ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Complete
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Incomplete
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
