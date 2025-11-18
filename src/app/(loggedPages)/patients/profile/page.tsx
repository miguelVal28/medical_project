"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderCard from "@/components/HeaderCard";
import { getPatientById } from "@/services/patientsService";
import { Formik, Form } from "formik";
import { FormikInputField } from "@/components/FormikInputFields";
import { Button } from "@/components/Button";
import Link from "next/link";

import type { PatientProfile } from "@/lib/types/patientTypes";

export default function PatientProfilePage() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [patientProfile, setPatientProfile] = useState<Partial<PatientProfile>>(
    {
      email: "",
      firstName: "",
      lastName: "",
      documentType: "CC",
      document: "",
      birthDate: new Date(),
      civilState: "Single",
      sex: "Male",
      gender: "Heterosexual",
      address: "",
      city: "",
      state: "",
      phone: 0,
      job: "",
    }
  );

  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const userId = useRef(id);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const initializeProfile = async () => {
      console.log("Initializing...");

      if (userId.current) {
        setPageLoading(true);

        const patientData = await getPatientById(userId.current);

        setPatientProfile({
          email: patientData.email,
          firstName: patientData.first_name,
          lastName: patientData.last_name,
          documentType: patientData.document_type,
          document: patientData.document,
          birthDate: patientData.birth_date,
          civilState: patientData.civil_state,
          sex: patientData.sex,
          gender: patientData.gender,
          address: patientData.address,
          city: patientData.city,
          state: patientData.state,
          phone: patientData.phone,
          job: patientData.job,
        });
      }

      setPageLoading(false);
    };

    if (status === "authenticated" && session?.user?.email) {
      initializeProfile();
    }
  }, [status, userId, session, router]);

  if (status === "loading" || pageLoading) {
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
          mainTitle={`${patientProfile.firstName || "Patient"} data`}
          subTitle="Patient personal information"
        />

        {/* Profile Fields */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <Formik
              initialValues={{
                email: patientProfile.email,
                firstName: patientProfile.firstName,
                lastName: patientProfile.lastName,
                documentType: patientProfile.documentType,
                document: patientProfile.document,
                birthDate: patientProfile.birthDate,
                civilState: patientProfile.civilState,
                sex: patientProfile.sex,
                gender: patientProfile.gender,
                address: patientProfile.address,
                city: patientProfile.city,
                state: patientProfile.state,
                phone: patientProfile.phone,
                job: patientProfile.job,
              }}
              onSubmit={() => {}}
            >
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-start gap-6">
                  <FormikInputField
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="john.doe@test.com"
                    type="email"
                  />
                  <div
                    id="document-section"
                    className="grid grid-cols-3 md:grid-cols-3 justify-start gap-6"
                  >
                    <div className="col-span-1">
                      <FormikInputField
                        id="documentType"
                        name="documentType"
                        label="Document"
                        placeholder="12.111.444.222"
                        type="text"
                      />
                    </div>
                    <div className="col-span-2">
                      <FormikInputField
                        id="document"
                        name="document"
                        label="Document"
                        placeholder="12.111.444.222"
                        type="text"
                      />
                    </div>
                  </div>

                  <FormikInputField
                    id="firstName"
                    name="firstName"
                    label="firstName"
                    placeholder="John"
                    type="text"
                  />
                  <FormikInputField
                    id="lastName"
                    name="lastName"
                    label="lastName"
                    placeholder="Doe"
                    type="text"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 justify-start gap-6 col-span-2">
                    <FormikInputField
                      id="birthDate"
                      name="birthDate"
                      label="Birth Date"
                      placeholder="01/01/1999"
                      type="text"
                    />
                    <FormikInputField
                      id="civilState"
                      name="civilState"
                      label="Civil State"
                      placeholder="Single"
                      type="text"
                    />

                    <FormikInputField
                      id="sex"
                      name="sex"
                      label="Sex"
                      placeholder="Male"
                      type="text"
                    />
                    <FormikInputField
                      id="gender"
                      name="gender"
                      label="Gender"
                      placeholder="Heterosexual"
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 justify-start gap-6 col-span-2">
                    <FormikInputField
                      id="address"
                      name="address"
                      label="Address"
                      placeholder=""
                      type="text"
                    />
                    <FormikInputField
                      id="city"
                      name="city"
                      label="City"
                      placeholder=""
                      type="text"
                    />
                    <FormikInputField
                      id="state"
                      name="state"
                      label="State"
                      placeholder=""
                      type="text"
                    />
                  </div>
                  <FormikInputField
                    id="phone"
                    name="phone"
                    label="Phone"
                    placeholder=""
                    type="text"
                  />
                  <FormikInputField
                    id="job"
                    name="job"
                    label="Job"
                    placeholder=""
                    type="text"
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                  <Button type="submit">Update</Button>
                  <Link href="#">
                    <Button type="button" variant="secondary" className="ml-4">
                      Iniciar consulta
                    </Button>
                  </Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
