"use server";

import { CreateServerClient } from "./databaseService";

export async function patientLookupQuery(email?: string, document?: string) {
  if (!email && !document) return null;

  const supabase = CreateServerClient();

  const response = await supabase
    .from("patients")
    .select("id,first_name, last_name, email, document")
    .or(`email.eq.${email}, document.eq.${document}`);

  if (response.error) {
    console.error(
      "Error when performing query on patients table. ",
      response.error
    );

    return null;
  }

  return response;
}

export async function getPatientById(id: string) {
  const supabase = CreateServerClient();

  const response = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (response.error) {
    console.error(
      "Error when performing query on patients table. ",
      response.error
    );

    return null;
  }

  return response.data;
}

interface PatientData {
  email: string;
  first_name: string;
  last_name: string;
  document_type: string;
  document: string;
  birth_date: string;
  civil_state: string;
  sex: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  job?: string;
}

export async function createNewPatient(patient: PatientData) {
  const supabase = CreateServerClient();
  const { error, data } = await supabase
    .from("patients")
    .insert([
      { email: patient.email },
      { first_name: patient.first_name },
      { last_name: patient.last_name },
      { document_type: patient.document_type },
      { document: patient.document },
      { birth_date: patient.birth_date },
      { civil_state: patient.civil_state },
      { sex: patient.sex },
      { gender: patient.gender },
      { address: patient.address },
      { city: patient.city },
      { state: patient.state },
      { phone: patient.phone || null },
      { job: patient.job || null },
    ]);

  if (error) {
    console.error("Error when performing query on patients table. ", error);

    return null;
  }

  return data;
}

export async function updatePatient() {}
