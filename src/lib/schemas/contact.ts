import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().min(1, "required").email("invalidEmail"),
  company: z.string().optional(),
  message: z.string().min(1, "required"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
