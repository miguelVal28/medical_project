// tests/services/patientsService.test.ts
import { CreateServerClient } from "../../src/services/databaseService";
import {
  patientLookupQuery,
  getPatientById,
  createNewPatient,
} from "../../src/services/patientsService";

jest.mock("../../src/services/databaseService", () => ({
  CreateServerClient: jest.fn(),
}));

describe("patientsService", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSupabaseClient: any;

  beforeEach(() => {
    mockSupabaseClient = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      or: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
    };
    (CreateServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("patientLookupQuery", () => {
    it("should call supabase with correct query when email or document is provided", async () => {
      const mockResponse = { data: [{ id: 1, email: "test@example.com" }] };
      mockSupabaseClient.or.mockResolvedValue(mockResponse);

      const result = await patientLookupQuery("test@example.com", "test");

      expect(mockSupabaseClient.from).toHaveBeenCalledWith("patients");
      expect(mockSupabaseClient.select).toHaveBeenCalledWith(
        "id,first_name, last_name, email, document"
      );
      expect(mockSupabaseClient.or).toHaveBeenCalledWith(
        "email.eq.test@example.com, document.eq.test"
      );
      expect(result).toEqual(mockResponse);
    });

    it("should return null and log error if supabase query fails", async () => {
      const mockError = { error: "Query failed" };
      mockSupabaseClient.or.mockResolvedValue(mockError);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const result = await patientLookupQuery("test@example.com", undefined);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error when performing query on patients table. ",
        mockError
      );
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe("getPatientById", () => {
    it("should return patient data for a valid ID", async () => {
      const mockResponse = { data: { id: 1, email: "test@example.com" } };
      mockSupabaseClient.single.mockResolvedValue(mockResponse);

      const result = await getPatientById("1");

      expect(mockSupabaseClient.from).toHaveBeenCalledWith("patients");
      expect(mockSupabaseClient.select).toHaveBeenCalledWith("*");
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith("id", "1");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("createNewPatient", () => {
    it("should insert a new patient and return the data", async () => {
      const mockPatient = {
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        document_type: "ID",
        document: "123456",
        birth_date: "1990-01-01",
        civil_state: "Single",
        sex: "Male",
        gender: "Male",
        address: "123 Main St",
        city: "Somewhere",
        state: "CA",
        phone: "1234567890",
        job: "Engineer",
      };

      const mockResponse = { data: { id: 1, email: "test@example.com" } };
      mockSupabaseClient.insert.mockResolvedValue(mockResponse);

      const result = await createNewPatient(mockPatient);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith("patients");
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith([
        { email: mockPatient.email },
        { first_name: mockPatient.first_name },
        { last_name: mockPatient.last_name },
        { document_type: mockPatient.document_type },
        { document: mockPatient.document },
        { birth_date: mockPatient.birth_date },
        { civil_state: mockPatient.civil_state },
        { sex: mockPatient.sex },
        { gender: mockPatient.gender },
        { address: mockPatient.address },
        { city: mockPatient.city },
        { state: mockPatient.state },
        { phone: mockPatient.phone },
        { job: mockPatient.job },
      ]);
      expect(result).toEqual(mockResponse.data);
    });

    it("should return null and log error if supabase insert fails", async () => {
      const mockPatient = {
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        document_type: "ID",
        document: "123456",
        birth_date: "1990-01-01",
        civil_state: "Single",
        sex: "Male",
        gender: "Male",
        address: "123 Main St",
        city: "Somewhere",
        state: "CA",
        phone: "1234567890",
        job: "Engineer",
      };

      const mockError = { error: "Insert failed" };
      mockSupabaseClient.insert.mockResolvedValue(mockError);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const result = await createNewPatient(mockPatient);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error when performing query on patients table. ",
        mockError
      );
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });
  });
});
