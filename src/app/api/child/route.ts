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
    const { firstname, lastname, parent_id, dob } = body;

    // Validate the request body
    if (!parent_id || !firstname || !lastname || !body.class || !dob) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make the API call to your backend server
    const response = await axios.post(API_ENDPOINTS.CHILD_SIGNUP, {
      firstname,
      lastname,
      parent_id,
      class: body.class,
      dob,
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
        { error: axiosError.response?.data?.message || "Signup failed" },
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, dob, id } = body;

    // Validate the request body
    if (!id || !firstname || !lastname || !body.class || !dob) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make the API call to your backend server for updating the child
    const response = await axios.patch(`${API_ENDPOINTS.CHILD_UPDATE}`, {
      id,
      firstname,
      lastname,
      class: body.class,
      dob,
    });

    // Return the response from the backend server
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Update error:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return NextResponse.json(
        { error: axiosError.response?.data?.message || "Update failed" },
        { status: axiosError.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
