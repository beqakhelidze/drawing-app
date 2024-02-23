import axios, { AxiosError } from "axios";

function errorHandler(error: AxiosError | Error) {
  if (axios.isAxiosError(error)) {
    // AxiosError specific handling
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.message,
      };
    } else {
      return {
        message: error.message,
      };
    }
  } else {
    return {
      message: error.message,
    };
  }
}

export default errorHandler;
