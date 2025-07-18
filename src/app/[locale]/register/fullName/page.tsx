"use client";
import { IMG_USER_DEFAULT } from "@/config/constants";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import {
  registerStepTwoSchema,
  type RegisterSchemaFieldsStepTwo,
  type RegisterSchemaStepTwoType,
} from "@/schemas/registerSchema";
import { useAppDispatch } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/register.slice";
import { Control } from "@/types/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "gestora-lib";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import FormControl from "@/components/shared/FormControl";
import { useTranslations } from "next-intl";
import useSupabaseSession from "@/hooks/useSupabaseUser";
import { trimObject } from "@/utils/trimObject";
import Loader from "@/components/shared/Loader";
import useAuthUser from "@/hooks/useAuthUser";

const controls: Control<RegisterSchemaFieldsStepTwo>[] = [
  {
    name: "first_name",
    type: "text",
    placeholder: "step2.form.firstName.placeholder",
    label: "step2.form.firstName.label",
  },
  {
    name: "last_name",
    type: "text",
    placeholder: "step2.form.lastName.placeholder",
    label: "step2.form.lastName.label",
  },
];

const Page = () => {
  const t = useTranslations("Register");
  const { session, loading: loadingSession } = useSupabaseSession();
  const { userDB, loading: loadingUserDB } = useAuthUser();
  const loadingData = loadingSession || loadingUserDB;
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerStepTwoSchema),
  });

  const submitMethod = async (data: RegisterSchemaStepTwoType) => {
    setLoading(true);
    const { last_name, first_name } =
      trimObject<RegisterSchemaStepTwoType>(data);
    setLoading(true);
    dispatch(
      setRegisterData({
        first_name,
        last_name,
      }),
    );
    router.push("/register/company");
  };

  useEffect(() => () => setLoading(false), []);
  if (loadingData) return <Loader />;
  if (!session) return redirect("/login");
  if (userDB) return redirect("/dashboard");

  return (
    <>
      <div className="grid gap-3">
        {session?.user?.app_metadata?.provider === "google" && (
          <div className="bg-bg-2 w-fit px-6 py-3 text-text-1 rounded-full flex gap-4 items-center justify-self-center">
            <Image
              src={session?.user?.user_metadata.avatar_url || IMG_USER_DEFAULT}
              alt="User profile image"
              className="w-6 h-6 rounded-full"
              width={100}
              height={100}
            />
            <p className="text-sm"> {session?.user?.email}</p>
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

export default Page;
