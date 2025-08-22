import { NextFunction, Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

interface IResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data?: any; // Updated to any to accommodate various types of data
  error?: any; // Updated to any to accommodate various types of error structures
  meta?: any;
}

export function responseFormatter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Store the original res.json function to a variable
  const originalJson = res.json.bind(res);

  // Override the res.json method
  res.json = (data: any): Response => {
    // Ensure it returns Response
    // Check if the status code has been set, use 200 OK if not set
    const statusCode = res.statusCode ? res.statusCode : StatusCodes.OK;

    // Construct the standardized response structure
    const response: IResponse = {
      status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
      statusCode: statusCode,
      message: getReasonPhrase(res.statusCode),
    };

    if (statusCode >= 200 && statusCode < 300) {
      response.data = data.meta ? data.data : data;
    }

    if (statusCode >= 300) {
      response.error = data;
    }

    if (data.meta) {
      response.meta = data.meta;
    }

    // Call the original res.json function with the new response structure
    return originalJson(response);
  };

  next();
}