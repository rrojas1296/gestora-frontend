"use client";
import FormControl from "@/components/globals/FormControl";
import Loader from "@/components/globals/Loader";
import Or from "@/components/globals/Or";
import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import {
  registerStepOneSchema,
  type RegisterSchemaFieldsStepOne,
  type RegisterSchemaStepOneType,
} from "@/schemas/registerSchema";
import { useAppDispatch } from "@/store/hooks";
import { setRegisterData } from "@/store/slices/register.slice";
import { FormControlType } from "@/types/controls";
import { cn } from "@/utils/cn";
import { logginGoogle } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Button } from "housy-lib";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const controls: FormControlType<RegisterSchemaFieldsStepOne>[] = [
  {
    name: "email",
    type: "email",
    label: "register.step1.form.email.label",
    placeholder: "register.step1.form.email.placeholder",
    icon: EmailIcon,
  },
  {
    name: "password",
    type: "password",
    label: "register.step1.form.password.label",
    placeholder: "register.step1.form.password.placeholder",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "register.step1.form.confirmPassword.label",
    placeholder: "register.step1.form.confirmPassword.placeholder",
  },
];
const RegisterPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { data: sessionSupabase, isLoading } = useQuery({
    queryKey: ["supabaseUser"],
    queryFn: async () => await createClient().auth.getSession(),
  });
  console.log({ sessionSupabase });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerStepOneSchema),
  });
  const registerGoogle = () => logginGoogle("/register/fullName");
  const continueForm = async (data: RegisterSchemaStepOneType) => {
    try {
      setLoading(true);
      const { email, password } = data;
      dispatch(setRegisterData({ email: email! }));
      const {
        data: { session },
      } = await createClient().auth.signUp({
        password,
        email: email!,
      });
      if (session) {
        router.push("/register/fullName");
      }
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  if (sessionSupabase?.data.session) return redirect("/dashboard");
  return (
    <>
      <div className="grid gap-3">
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("register.step1.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("register.step1.form.description")}
        </p>
      </div>
      <Button
        className="font-semibold w-full border-border-1 text-text-1 hover:bg-bg-2/30"
        variant="outlined"
        onClick={registerGoogle}
      >
        <GoogleIcon className="w-6 h-6 mr-2" />
        {t("register.step1.social.google")}
      </Button>
      <Or text={t("register.step1.or")} />
      <form className="grid gap-6" onSubmit={handleSubmit(continueForm)}>
        {controls.map((control) => {
          const { placeholder, name, label, type } = control;
          const error = errors[name] ? t(errors[name].message!) : "";
          const isPasswordControl =
            name === "password" || name === "confirmPassword";
          const Icon =
            name === "password"
              ? showPassword
                ? OpenEyeIcon
                : CloseEyeIcon
              : control.icon;
          return (
            <FormControl
              key={name}
              Icon={
                Icon && (
                  <Icon
                    className={cn(
                      "w-6 h-6 text-text-2 stroke-current ",
                      isPasswordControl && "cursor-pointer",
                      error && "text-red-500",
                    )}
                    onClick={() =>
                      name === "password" && setShowPassword(!showPassword)
                    }
                  />
                )
              }
              placeholder={t(placeholder)}
              name={name}
              register={register}
              error={error}
              label={t(label)}
              type={
                isPasswordControl ? (showPassword ? "text" : "password") : type
              }
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
          {t("register.step1.form.button.text")}
        </Button>
        <p className="text-sm text-text-1 text-center">
          {t("register.step1.form.question.text")}
          <Link href="/login" className="text-primary font-semibold ml-2">
            {t("register.step1.form.question.link")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
