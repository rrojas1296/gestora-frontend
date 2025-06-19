"use client";
import { IMG_USER_DEFAULT } from "@/config/constants";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import {
  registerStepTwoSchema,
  type RegisterSchemaFieldsStepTwo,
  type RegisterSchemaStepTwoType,
} from "@/schemas/registerSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/register.slice";
import type { FormControlType } from "@/types/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "housy-lib";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormControl from "@/components/shared/FormControl";
import {
  AuthProvider,
  registerUser,
  RegisterUserData,
} from "@/utils/api/auth/registerUser";
import { useTranslations } from "next-intl";
import useSupabaseUser from "@/hooks/useSupabaseUser";
import { trimObject } from "@/utils/trimObject";

const controls: FormControlType<RegisterSchemaFieldsStepTwo>[] = [
  {
    name: "firstName",
    type: "text",
    placeholder: "step2.form.firstName.placeholder",
    label: "step2.form.firstName.label",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "step2.form.lastName.placeholder",
    label: "step2.form.lastName.label",
  },
];

const FullName = () => {
  const t = useTranslations("Register");
  const { user: userSupabase } = useSupabaseUser();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { lastName, firstName } = useAppSelector((state) => state.register);
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(registerStepTwoSchema),
  });

  const submitMethod = async (data: RegisterSchemaStepTwoType) => {
    console.log("here");
    const { lastName, firstName } = trimObject<RegisterSchemaStepTwoType>(data);
    try {
      setLoading(true);
      dispatch(
        setRegisterData({
          firstName: data.firstName,
          lastName: data.lastName,
        }),
      );
      console.log({ userSupabase });
      if (userSupabase) {
        const {
          email,
          app_metadata: { provider },
          user_metadata: { avatar_url },
        } = userSupabase;
        if (!email || !provider) return;

        const newUser: RegisterUserData = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          id: userSupabase.id,
          provider: provider as AuthProvider,
          photo_url: avatar_url,
        };
        await registerUser(newUser);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setValue("lastName", lastName || "");
    setValue("firstName", firstName || "");
  }, [firstName, lastName, setValue]);

  return (
    <>
      <div className="grid gap-3">
        {userSupabase?.app_metadata?.provider === "google" && (
          <div className="bg-bg-2 w-fit px-6 py-3 text-text-1 rounded-full flex gap-4 items-center justify-self-center">
            <Image
              src={userSupabase?.user_metadata.avatar_url || IMG_USER_DEFAULT}
              alt="User profile image"
              className="w-6 h-6 rounded-full"
              width={100}
              height={100}
            />
            <p className="text-sm"> {userSupabase?.email}</p>
          </div>
        )}
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("step2.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("step2.form.description")}
        </p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit(submitMethod)}>
        {controls.map((control) => {
          const { placeholder, name, label, type } = control;
          const error = errors[name] ? t(errors[name].message!) : "";
          return (
            <FormControl
              key={name}
              placeholder={t(placeholder)}
              name={name}
              register={register}
              error={error}
              label={t(label)}
              type={type}
            />
          );
        })}
        <Button
          variant="filled"
          className="bg-primary w-full font-semibold hover:bg-primary/90"
          type="submit"
          disabled={loading}
        >
          {loading && <LoaderIcon className="animate-spin" />}
          {t("step2.form.button.text")}
        </Button>
      </form>
    </>
  );
};

export default FullName;
