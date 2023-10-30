"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./InputsUi/Input";
import { Button } from "./ButtonsUi/Button";
import { AuthSocialIcons } from "./AuthSocialIcons";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

/*
 * Auth Component: Responsible for rendering the authentication form and related components.
 * - Manages the authentication form's variant (LOGIN or REGISTER) and isLoading state.
 * - Handles form submission, registration, and social sign-in actions.
 * - Defines the styling for the authentication form and its components.
 */

type VariantProps = "LOGIN" | "REGISTER";

export const Auth = () => {
  const [variant, setVariant] = useState<VariantProps>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const tooglevariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("api/register", data)
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error && !callback?.ok) {
            toast.error("Invalid credentials");
          }

          if (!callback?.error && callback?.ok) {
            toast.success("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error && !callback?.ok) {
          toast.error("Invalid credentials");
        }

        if (!callback?.error && callback?.ok) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button type="submit" disabled={isLoading} fullWidth>
              {isLoading ? (
                <AiOutlineLoading className="animate-spin text-xl" />
              ) : (
                <p>{variant === "LOGIN" ? "Sign In" : "Register"}</p>
              )}
            </Button>
          </div>
        </form>
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <AuthSocialIcons
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialIcons
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "LOGIN" ? "New to Seener?" : "Already have account?"}
          </div>
          <div onClick={tooglevariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
