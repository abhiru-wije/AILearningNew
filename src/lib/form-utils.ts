import { z } from "zod";

export const ChildFormSchema = z.object({
  firstname: z.string({
    required_error: "First name is required",
  }),
  lastname: z.string({
    required_error: "Last name is required",
  }),
  class: z.string({
    required_error: "Class is required",
  }),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
});
