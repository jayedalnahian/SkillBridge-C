"use client"

import * as React from "react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useForm } from "@tanstack/react-form"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { handleGoogleLogin } from "@/utils/modules/authentication/googleLogin"
import Link from "next/link"



// =====================
// ZOD SCHEMA
// =====================
const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email address"),

  // Optional phone (empty string allowed)
  phone: z
    .string()
    .refine(
      (val) => val === "" || /^01[3-9]\d{8}$/.test(val),
      { message: "Invalid Bangladesh phone number" }
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})


// =====================
// SIGNUP FORM
// =====================
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },

    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...")

      try {
        // Optionally remove empty phone before API call
        const payload = {
          ...value,
          
        }

        const { data, error } = await authClient.signUp.email(payload)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("Account created successfully 🎉", { id: toastId })
      } catch (err) {
        console.error(err)
        toast.error("Something went wrong 😄", { id: toastId })
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name *</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Jayed Al Nahian"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email *</FieldLabel>
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="example123@gmail.com"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

   

        {/* Password */}
        <form.Field name="password">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password *</FieldLabel>
                <Input
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="******"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <Field>
          <Button type="submit">Create Account</Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
