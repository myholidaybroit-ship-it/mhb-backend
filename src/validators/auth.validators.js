import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(6, "Password needs at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1).optional(),
  phone: z.string().trim().optional(),
  city: z.string().trim().optional(),
  prefs: z
    .object({
      emails: z.boolean().optional(),
      sms: z.boolean().optional(),
      whatsapp: z.boolean().optional(),
      newsletter: z.boolean().optional(),
    })
    .optional(),
});

export const otpRequestSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
});

export const otpVerifySchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password needs at least 6 characters"),
});
