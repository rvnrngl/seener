"use client";

import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./InputsUi/Input";
import { Button } from "./ButtonsUi/Button";
import { AuthSocialIcons } from "./AuthSocialIcons";
import { BsGithub, BsGoogle } from "react-icons/bs";

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
      // axios reg
    }

    if (variant === "LOGIN") {
      //next auth signin
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // social signin
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
              {variant === "LOGIN" ? "Sign In" : "Register"}
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

        <div className="flex gap-2 justify-center text-sm mt-5 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? "New to Seener?" : "Already have account?"}
          </div>
          <div onClick={tooglevariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
