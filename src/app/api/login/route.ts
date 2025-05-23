import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/config/api";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate the request body
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make the API call to your backend server
    const response = await axios.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    // Return the response from the backend server
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // If it's an Axios error, forward the error response from the backend

      if (axiosError.status === 401) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: axiosError.response?.data?.error || "Login failed" },
        { status: axiosError.response?.status || 500 }
      );
    }

    // For other types of errors
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
