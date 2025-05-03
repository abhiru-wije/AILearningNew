import { API_ENDPOINTS } from "@/config/api";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export async function GET(
  request: Request,
  { params }: { params: { lessonID: string } }
) {
  try {
    const param = await params;

    const lessonID = param.lessonID;
    const token = request.headers.get("authorization");

    // Validate the request body
    if (!lessonID || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make the API call to your backend server
    const response = await axios.get(`${API_ENDPOINTS.LESSONS}/${lessonID}`, {
      headers: {
        Authorization: token,
      },
    });

    // Return the response from the backend server
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Signup error:", error);

    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // If it's an Axios error, forward the error response from the backend
      return NextResponse.json(
        {
          error:
            axiosError.response?.data?.message ||
            "Failed to load lesson details",
        },
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
