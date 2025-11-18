"use client";

import { Button } from "@/components/Button";
import HeaderCard from "@/components/HeaderCard";
import Link from "next/link";
import QueryResultList from "@/components/QueryResult";
import { FormikInputField } from "@/components/FormikInputFields";
import { Formik, Form } from "formik";
import { useState } from "react";
import type { QueryResultListSchema } from "@/lib/types/queryTypes";
import { patientLookupQuery } from "@/services/patientsService";

export default function PatientLookupPage() {
  const [queryStatus, setQueryStatus] = useState(0);
  const [queryData, setQueryData] = useState([{}]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6">
        {/* Lookup Page */}
        <HeaderCard
          mainTitle="Patient Lookup Page"
          subTitle="Use this page to look for patient data"
        />

        {/* Lookup Fields */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <h1 className="text-3xl front-medium text-gray-900 dark:text-white">
                Patient data
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  document: "",
                }}
                onSubmit={async (values) => {
                  const patient = await patientLookupQuery(
                    values.email,
                    values.document
                  );

                  if (patient) {
                    setQueryStatus(patient.status);
                    setQueryData(patient.data as QueryResultListSchema);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 justify-start gap-6">
                      <FormikInputField
                        id="email"
                        name="email"
                        label="Patient's email"
                        placeholder="john.doe@test.com"
                        type="email"
                      />
                      <FormikInputField
                        id="document"
                        name="document"
                        label="Patient's document"
                        placeholder="1231231"
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Searching..." : "Search Patient"}
                      </Button>
                      <Link href="/patients/profile">
                        <Button
                          type="button"
                          variant="secondary"
                          className="ml-4"
                        >
                          Create Patient
                        </Button>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
              {queryStatus === 200 ? (
                <QueryResultList
                  receivedInfo={queryData as QueryResultListSchema}
                />
              ) : queryStatus !== 0 ? (
                <div className="mt-6 text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    No Matches Found
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Please try adjusting your search criteria.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
