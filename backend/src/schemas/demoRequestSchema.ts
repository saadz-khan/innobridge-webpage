import { z } from "zod";

const trimmedString = (min: number, max: number, label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(min, `${label} is required`)
    .max(max, `${label} is too long`);

const optionalTrimmedString = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} is too long`)
    .optional()
    .or(z.literal(""));

const phonePattern = /^[+()\d\s.-]{7,40}$/;

export const demoRequestSchema = z.object({
  firstName: trimmedString(1, 80, "First name"),
  lastName: trimmedString(1, 80, "Last name"),
  firmName: trimmedString(2, 160, "Firm name"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Enter a valid email")
    .max(180, "Email is too long"),
  phone: optionalTrimmedString(40, "Phone").refine((value) => !value || phonePattern.test(value), {
    message: "Enter a valid phone number"
  }),
  role: optionalTrimmedString(120, "Role"),
  caseload: optionalTrimmedString(80, "Matter volume"),
  message: optionalTrimmedString(1200, "Message"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" })
  })
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
