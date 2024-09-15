interface ResponseMessage {
  success: {
    get: string
    post: string
    put: string
    delete: string
  }
  error: {
    invalidRequest: string
    conflict: string
    notFound: string
  }
}

export const responseMessage: ResponseMessage = {
  success: {
    get: "Success",
    post: "Created Successful",
    put: "Updated Successful",
    delete: "Deleted Successful",
  },
  error: {
    invalidRequest: "Invalid Request",
    conflict: "Conflict",
    notFound: "Not Found",
  },
}
