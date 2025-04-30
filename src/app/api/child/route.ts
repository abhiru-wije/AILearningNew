import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from '@/config/api';

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, parent_id } = body;

    // Validate the request body
    if (!parent_id || !firstname || !lastname || !body.class) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Make the API call to your backend server
    const response = await axios.post(API_ENDPOINTS.SIGNUP, {
      firstname,
      lastname,
      parent_id,
      class: body.class,
    });

    // Return the response from the backend server
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // If it's an Axios error, forward the error response from the backend
      return NextResponse.json(
        { error: axiosError.response?.data?.message || 'Signup failed' },
        { status: axiosError.response?.status || 500 }
      );
    }

    // For other types of errors
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 