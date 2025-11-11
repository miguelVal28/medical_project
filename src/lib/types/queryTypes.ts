export interface QueryResultSchema {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  document_type: string;
  document: string;
  birht_date: string;
  civil_state: string;
  sex: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  job?: string;
}

export type QueryResultListSchema = QueryResultSchema[];
