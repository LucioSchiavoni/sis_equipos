import { object, string } from "zod"
 
export const signInSchema = object({
  username: string({ required_error: "Campo obligatorio" })
    .min(1, "Campo obligatorio"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
})