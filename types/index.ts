import type { IStudent } from "@/models/Student"
import type { IDepartment } from "@/models/Department"
import type { ISubject } from "@/models/Subject"
import type { IResult } from "@/models/Result"
import type { INotice } from "@/models/Notice"

export type { IStudent, IDepartment, ISubject, IResult, INotice }

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
}


declare global {
  // allow attaching a mongoose cache object to the global object
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

