// tests/services/medicService.test.ts
import { CreateServerClient } from "../../src/services/databaseService";
import {
  signMedic,
  getMedicData,
  saveMedicProfile,
  Profile,
} from "../../src/services/medicService";

jest.mock("../../src/services/databaseService", () => ({
  CreateServerClient: jest.fn(),
}));

describe("medicService", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSupabaseClient: any;

  beforeEach(() => {
    mockSupabaseClient = {
      auth: {
        signUp: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
    };
    (CreateServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("signMedic", () => {
    it("should sign up a medic with email and password", async () => {
      const mockResponse = { user: { id: "123" }, session: null };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: mockResponse,
        error: null,
      });

      const result = await signMedic("test@example.com", "password123");

      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if signUp fails", async () => {
      const mockError = new Error("Sign-up failed");
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: null,
        error: mockError,
      });

      await expect(
        signMedic("test@example.com", "password123")
      ).rejects.toThrow(mockError);
    });
  });

  describe("getMedicData", () => {
    it("should return medic data for a valid email", async () => {
      const mockResponse = {
        id: "1",
        user_id: "123",
        first_name: "John",
        last_name: "Doe",
        birth_date: "1980-01-01",
        specialty: "Cardiology",
        consultory: "Room 101",
      };
      mockSupabaseClient.single.mockResolvedValue({
        data: mockResponse,
        error: null,
      });

      const result = await getMedicData("test@example.com");

      expect(mockSupabaseClient.from).toHaveBeenCalledWith("medics");
      expect(mockSupabaseClient.select).toHaveBeenCalledWith("*");
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith(
        "email",
        "test@example.com"
      );
      expect(result).toEqual(mockResponse);
    });

    it("should return null if no email is provided", async () => {
      const result = await getMedicData("");
      expect(result).toBeNull();
    });

    it("should return null and log an error if the query fails", async () => {
      const mockError = new Error("Query failed");
      mockSupabaseClient.single.mockResolvedValue({
        data: null,
        error: mockError,
      });

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const result = await getMedicData("test@example.com");

      expect(consoleSpy).toHaveBeenCalledWith(
        "Supabase error in getMedicData:",
        mockError
      );
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });
  });

  describe("saveMedicProfile", () => {
    const mockProfile: Profile = {
      id: "1",
      user_id: "123",
      first_name: "John",
      last_name: "Doe",
      birth_date: "1980-01-01",
      specialty: "Cardiology",
      consultory: "Room 101",
    };

    it("should update medic profile with valid data", async () => {
      mockSupabaseClient.update.mockResolvedValue({ error: null });

      await saveMedicProfile("test@example.com", mockProfile);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith("medics");
      expect(mockSupabaseClient.update).toHaveBeenCalledWith({
        first_name: mockProfile.first_name,
        last_name: mockProfile.last_name,
        birth_date: mockProfile.birth_date,
        specialty: mockProfile.specialty,
        consultory: mockProfile.consultory,
      });
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith(
        "email",
        "test@example.com"
      );
    });

    it("should log a notification if the update doesn't find an user", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const result = await saveMedicProfile(
        "not_exist@example.com",
        mockProfile
      );

      expect(consoleSpy).toHaveBeenCalledWith("No update required");
      expect(result).toBeUndefined();

      consoleSpy.mockRestore();
    });

    it("should return null if no email is provided", async () => {
      const result = await saveMedicProfile("", mockProfile);
      expect(result).toBeUndefined();
    });
  });
});
