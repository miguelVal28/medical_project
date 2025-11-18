"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import {
  FormikInputField,
  FormikTextAreaField,
} from "@/components/FormikInputFields";
import { Button } from "@/components/Button";
import HeaderCard from "@/components/HeaderCard";
import { useEffect } from "react";

export default function ConsultPage() {
  const { status, data: session } = useSession();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId"); // Retrieve patient ID from URL

  useEffect(() => {
    
  });

  // Check authentication status
  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>You need to log in to access this page.</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        <HeaderCard
          mainTitle="Consultation Form"
          subTitle="Fill out the consultation details below"
        />

        {/* Form Fields */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Formik
              initialValues={{
                patientId, // Hidden field for patient ID
                patientEmail: "", // Non-editable field for patient email
                medicId: session?.user?.email || "", // Hidden field for medic ID
                medicEmail: session?.user?.email || "", // Non-editable field for medic email
                observations: "",
                diagnostic: "",
                medicine: "",
              }}
              onSubmit={(values) => {
                console.log("Consultation data:", values);
                // Handle form submission logic here
              }}
            >
              <Form className="space-y-6">
                {/* Patient Email */}
                <FormikInputField
                  id="patientEmail"
                  name="patientEmail"
                  label="Patient Email"
                  placeholder="Patient's email"
                  type="email"
                  disabled={true} // Non-editable field
                />

                {/* Medic Email */}
                <FormikInputField
                  id="medicEmail"
                  name="medicEmail"
                  label="Medic Email"
                  placeholder="Your email"
                  type="email"
                  disabled={true} // Non-editable field
                />

                {/* Observations */}
                <FormikTextAreaField
                  id="observations"
                  name="observations"
                  label="Observations"
                  placeholder="Write observations here..."
                />

                {/* Diagnostic */}
                <FormikTextAreaField
                  id="diagnostic"
                  name="diagnostic"
                  label="Diagnostic"
                  placeholder="Write diagnostic here..."
                />

                {/* Medicine */}
                <FormikTextAreaField
                  id="medicine"
                  name="medicine"
                  label="Medicine"
                  placeholder="Write prescribed medicine here..."
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit">Create Consultation</Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
