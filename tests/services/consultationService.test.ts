import {
  createConsultation,
  getConsultationByMedic,
  getConsultationByPatient,
  getConsultationById,
} from "../../src/services/consultationService";
import { CreateServerClient } from "../../src/services/databaseService";

// Mock the databaseService
jest.mock("../../src/services/databaseService", () => ({
  CreateServerClient: jest.fn(),
}));

describe("consultationService", () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (CreateServerClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe("createConsultation", () => {
    it("should create a consultation successfully", async () => {
      const mockConsultation = {
        patient_id: "patient123",
        medic_id: "medic456",
        observations: "Test observations",
        diagnostic: "Test diagnostic",
        medicine: "Test medicine",
      };

      mockSupabase.insert.mockResolvedValue({
        data: { id: "consultation789" },
        error: null,
      });

      await createConsultation(mockConsultation);

      expect(CreateServerClient).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith("consultations");
      expect(mockSupabase.insert).toHaveBeenCalledWith([
        { patient_id: "patient123" },
        { medic_id: "medic456" },
        { observations: "Test observations" },
        { diagnostic: "Test diagnostic" },
        { medicine: "Test medicine" },
      ]);
    });

    it("should throw an error if the insert fails", async () => {
      const mockConsultation = {
        patient_id: "patient123",
        medic_id: "medic456",
        observations: "Test observations",
        diagnostic: "Test diagnostic",
        medicine: "Test medicine",
      };

      const mockError = new Error("Insert failed");
      mockSupabase.insert.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(createConsultation(mockConsultation)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("getConsultationByMedic", () => {
    it("should get consultations by medic ID", async () => {
      const mockMedicId = "medic456";
      const mockConsultations = [{ id: "consultation789" }];

      mockSupabase.eq.mockResolvedValue({
        data: mockConsultations,
        error: null,
      });

      const result = await getConsultationByMedic(mockMedicId);

      expect(CreateServerClient).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith("consultations");
      expect(mockSupabase.select).toHaveBeenCalledWith("*");
      expect(mockSupabase.eq).toHaveBeenCalledWith("medic_id", mockMedicId);
      expect(result).toEqual(mockConsultations);
    });

    it("should handle errors when getting consultations by medic ID", async () => {
      const mockMedicId = "medic456";
      const mockError = new Error("Query failed");

      mockSupabase.eq.mockResolvedValue({
        data: null,
        error: mockError,
      });

      console.log = jest.fn();

      await getConsultationByMedic(mockMedicId);

      expect(console.log).toHaveBeenCalledWith(
        "Error when listing consultations.",
        mockError
      );
    });
  });

  describe("getConsultationByPatient", () => {
    it("should get consultations by patient ID", async () => {
      const mockPatientId = "patient123";
      const mockConsultations = [{ id: "consultation789" }];

      mockSupabase.eq.mockResolvedValue({
        data: mockConsultations,
        error: null,
      });

      const result = await getConsultationByPatient(mockPatientId);

      expect(CreateServerClient).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith("consultations");
      expect(mockSupabase.select).toHaveBeenCalledWith("*");
      expect(mockSupabase.eq).toHaveBeenCalledWith("patient_id", mockPatientId);
      expect(result).toEqual(mockConsultations);
    });

    it("should handle errors when getting consultations by patient ID", async () => {
      const mockPatientId = "patient123";
      const mockError = new Error("Query failed");

      mockSupabase.eq.mockResolvedValue({
        data: null,
        error: mockError,
      });

      console.log = jest.fn();

      await getConsultationByPatient(mockPatientId);

      expect(console.log).toHaveBeenCalledWith(
        "Error when listing consultations.",
        mockError
      );
    });
  });

  describe("getConsultationById", () => {
    it("should get a consultation by its ID", async () => {
      const mockConsultationId = "consultation789";
      const mockConsultation = { id: mockConsultationId };

      mockSupabase.single.mockResolvedValue({
        data: mockConsultation,
        error: null,
      });

      const result = await getConsultationById(mockConsultationId);

      expect(CreateServerClient).toHaveBeenCalled();
      expect(mockSupabase.from).toHaveBeenCalledWith("consultations");
      expect(mockSupabase.select).toHaveBeenCalledWith("*");
      expect(mockSupabase.eq).toHaveBeenCalledWith("id", mockConsultationId);
      expect(mockSupabase.single).toHaveBeenCalled();
      expect(result).toEqual(mockConsultation);
    });

    it("should throw an error if the query fails", async () => {
      const mockConsultationId = "consultation789";
      const mockError = new Error("Query failed");

      mockSupabase.single.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(getConsultationById(mockConsultationId)).rejects.toThrow(
        mockError
      );
    });
  });
});
