type DocumentType =
  | "RC"
  | "TI"
  | "CC"
  | "CE"
  | "TE"
  | "PEP"
  | "DIE"
  | "PP"
  | "CD"
  | "DIP";

type CivilState =
  | "Single"
  | "Married"
  | "Non-Cohabitation"
  | "Divorced"
  | "Cohabitation"
  | "Widowed";

type Sex = "Male" | "Female";

type Gender = "Heterosexual" | "Homosexual" | "Transexual" | "Other";

export interface PatientProfile {
  id: string; // UUID as a string
  email: string;
  firstName: string;
  lastName: string;
  documentType: DocumentType;
  document: string;
  birthDate: Date;
  civilState: CivilState;
  sex: Sex;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  phone?: number;
  job?: string;
}
