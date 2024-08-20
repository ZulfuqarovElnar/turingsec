import { z } from "zod";

export const formSchemaCompanyRegister = z.object({
  firstName: z.string().min(2, { message: "First name is too short" }),
  lastName: z.string().min(2, { message: "Last name is too short" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  companyName: z.string().min(2, { message: "Company name is too short" }),
  jobtitle: z.string().min(2, { message: "Job title is too short" }),
  message: z.string().min(2, { message: "Message is too short" }),
  assets: z.object({
    value: z.string().min(2, { message: "Country code is too short" }),
    label: z.string().min(2, { message: "Country is not defibed" }),
  }),
});

export const formSchemaHackerRegister = z
  .object({
    firstname: z.string().min(2, { message: "First name is too short" }),
    lastname: z.string().min(2, { message: "Last name is too short" }),
    username: z.string().min(2, { message: "Username is too short" }),
 
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(2, { message: "Password is too short" }),
 
    passwordConfirmation: z
      .string()
      .min(2, { message: "Password is too short" }),

    // country: z.string().min(2, { message: "Country is too short" }),
    country: z.object({
      value: z.string().min(2, { message: "Country code is too short" }),
      label: z.string().min(2, { message: "Country is not defibed" }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
export const formSchemaHackerLogin = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
 
  password: z.string().min(2, { message: "Password is too short" }),
 
});

export const formSchemaProfileUpdate = z.object({
  firstname: z.string().min(2, { message: "First name is too short" }),
  lastname: z.string().min(2, { message: "Last name is too short" }),
  username: z.string().min(2, { message: "Username is too short" }),
  website: z
    .string()
    .min(2, { message: "Website is too short" })
    .url({ message: "Please enter a valid URL" }),
  bio: z.string().min(2, { message: "Bio is too short" }),

  // country: z.string().min(2, { message: "Country is too short" }),
  country: z.object({
    value: z.string().min(2, { message: "Country code is too short" }),
    label: z.string().min(2, { message: "Country is not defibed" }),
  }),
  city: z.string().min(2, { message: "City is too short" }),
  linkedin: z.string().url({ message: "Please enter a valid URL or empty",}).optional().or(z.literal('')),
  twitter: z.string().url({ message: "Please enter a valid URL",}).optional().or(z.literal('')),
  github: z.string().url({ message: "Please enter a valid URL",}).optional().or(z.literal('')),
});

export const contactUsSchema = z.object({
  firstname: z.string().min(2, { message: "First name is too short" }),
  lastname: z.string().min(2, { message: "Last name is too short" }),
  companyname: z.string().min(2, { message: "Username is too short" }),

  businessemail: z.string().email({ message: "Please enter a valid email" }),
  jobtitle: z.string().min(2, { message: "Job title is too short" }),

  // country: z.string().min(2, { message: "Country is too short" }),
  country: z.object({
    value: z.string().min(2, { message: "Country code is too short" }),
    label: z.string().min(2, { message: "Country is not defibed" }),
  }),

  write: z.string().min(10, { message: "Message is too short" }),
});

export const formSchemaAdminLogin = z.object({
  usernameOrEmail: z.string().min(1, { message: "Username or email is required" }),
  password: z.string().min(6, { message: "Password is too short" }),
});