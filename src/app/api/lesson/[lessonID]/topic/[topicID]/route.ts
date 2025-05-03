import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/config/api";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export async function POST(
  request: Request,
  { params }: { params: { lessonID: string; topicID: string } }
) {
  try {
    const param = await params;

    const token = request.headers.get("authorization");

    // Validate the request body
    if (!param.lessonID || !param.topicID || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make the API call to your backend server
    const response = await axios.post(
      API_ENDPOINTS.TOPIC_COMPLETION,
      {
        lessonId: param.lessonID,
        topicId: param.topicID,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Return the response from the backend server
    return NextResponse.json(response.data);
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // If it's an Axios error, forward the error response from the backend
      return NextResponse.json(
        {
          error:
            axiosError.response?.data?.message ||
            "Failed to update topic completion",
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
