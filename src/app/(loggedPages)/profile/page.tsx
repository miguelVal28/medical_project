"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/InputFields";
import { Button } from "@/components/Button";
import HeaderCard from "@/components/HeaderCard";
import { getMedicData, saveMedicProfile } from "@/services/medicService";

type Profile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  specialty: string;
  consultory: string;
};

const specialtyOptions = [
  "Cardiologist",
  "Physiotherapist",
  "Obstetrics",
  "Psychiatry",
  "Anesthesiology",
  "Immunology",
  "Neurology",
  "Orthopedist",
  "Gastroenterology",
  "Hematology",
  "Oncology",
  "Ophthalmology",
  "Family medicine",
  "Radiologyist",
  "Dermatologist",
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Form state
  const [profile, setProfile] = useState<Partial<Profile>>({
    first_name: "",
    last_name: "",
    birth_date: "",
    specialty: "",
    consultory: "",
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

  // Save profile wrapper
  async function handleSaveProfile() {
    if (!session?.user?.email) {
      setMessage({
        text: "Unable to sabe profile. No email found",
        type: "error",
      });
      return;
    }

    const { email } = session.user;

    setSaving(true); // Put the page in a loading state

    try {
      await saveMedicProfile(email, profile as Profile);

      setMessage({
        text: "Profile saved successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error while saving the profile: ", error);
      setMessage({ text: "Failed to save profile.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const initializeProfile = async () => {
      try {
        // Get user ID from email
        if (session?.user?.email) {
          const medicProfile = await getMedicData(session.user.email);

          if (medicProfile) {
            setProfile({
              id: medicProfile.id,
              user_id: medicProfile.user_id,
              first_name: medicProfile.first_name,
              last_name: medicProfile.last_name,
              birth_date: medicProfile.birth_date,
              specialty: medicProfile.specialty,
              consultory: medicProfile.consultory,
            });
          }
          setLoading(false);
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
                  value={profile.birth_date || ""}
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
                  value={profile.consultory || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <Button
                  type="button"
                  onClick={handleSaveProfile}
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
                  {profile.consultory || "Not set"}
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
