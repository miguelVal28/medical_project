import { CreateServerClient } from "./databaseService";

interface Consultation {
  patient_id: string;
  medic_id: string;
  observations: string;
  diagnostic: string;
  medicine: string;
}

export async function createConsultation(consultation: Consultation) {
  const supabase = CreateServerClient();

  const { error, data } = await supabase
    .from("consultations")
    .insert([
      { patient_id: consultation.patient_id },
      { medic_id: consultation.medic_id },
      { observations: consultation.observations },
      { diagnostic: consultation.diagnostic },
      { medicine: consultation.medicine },
    ]);

  if (error) {
    throw error;
  }

  return data;
}

async function listConsultation(userType: "medic" | "patient", id: string) {
  const supabase = CreateServerClient();

  const { error, data } = await supabase
    .from("consultations")
    .select("*")
    .eq(`${userType}_id`, id);

  if (error) {
    throw error;
  }

  return data;
}

export async function getConsultationByMedic(medicId: string) {
  try {
    const consultationList = await listConsultation("medic", medicId);

    return consultationList;
  } catch (error) {
    console.log("Error when listing consultations.", error);
  }
}

export async function getConsultationByPatient(patientId: string) {
  try {
    const consultationList = await listConsultation("patient", patientId);

    return consultationList;
  } catch (error) {
    console.log("Error when listing consultations.", error);
  }
}

export async function getConsultationById(id: string) {
  const supabase = CreateServerClient();

  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
