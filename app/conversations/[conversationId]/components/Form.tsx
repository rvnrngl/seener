"use client";

import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

import { MessageInput } from "./MessageInput";
import { useConversation } from "@/app/hooks/useConversation";

export const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", { ...data, conversationId });
  };

  const handleUpload = (res: any) => {
    axios.post("/api/messages", {
      image: res?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white p-4 lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="fuddwun1"
      >
        <HiPhoto size={30} className="text-primary" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-primary p-2 transition hover:bg-primary/90"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};
