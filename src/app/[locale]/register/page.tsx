"use client";
import FormControl from "@/components/shared/FormControl";
import Loader from "@/components/shared/Loader";
import Or from "@/components/shared/Or";
import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import { useRouter } from "@/i18n/navigation";
import {
  registerStepOneSchema,
  type RegisterSchemaFieldsStepOne,
  type RegisterSchemaStepOneType,
} from "@/schemas/registerSchema";
import { toast } from "sonner";
import { FormControlType } from "@/types/controls";
import { cn } from "@/utils/cn";
import { logginGoogle } from "@/utils/supabase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Toast } from "gestora-lib";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { emailInUse } from "@/utils/api/auth/emailInUse";
import useSupabaseSession from "@/hooks/useSupabaseUser";
import { trimObject } from "@/utils/trimObject";
import { clientSupabase } from "@/utils/supabase";

const controls: FormControlType<RegisterSchemaFieldsStepOne>[] = [
  {
    name: "email",
    type: "email",
    label: "step1.form.email.label",
    placeholder: "step1.form.email.placeholder",
    icon: EmailIcon,
  },
  {
    name: "password",
    type: "password",
    label: "step1.form.password.label",
    placeholder: "step1.form.password.placeholder",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "step1.form.confirmPassword.label",
    placeholder: "step1.form.confirmPassword.placeholder",
  },
];

const Page = () => {
  const t = useTranslations("Register");
  const [loading, setLoading] = useState(false);
  const { session, loading: loadingSession } = useSupabaseSession();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerStepOneSchema),
  });
  const registerGoogle = () => logginGoogle("/register/fullName");
  const registerUser = async (data: RegisterSchemaStepOneType) => {
    try {
      setLoading(true);
      const { email, password } = trimObject<RegisterSchemaStepOneType>(data);
      const inUse = await emailInUse(email);
      if (inUse) {
        return setError("email", {
          type: "custom",
          message: "step1.form.email.errors.inUse",
        });
      }
      await clientSupabase.auth.signUp({
        email,
        password,
      });

      router.push("/register/fullName");
    } catch {
      setLoading(false);
      toast.custom(
        () => {
          return (
            <Toast text={t(`step1.form.errors.server_error`)} type="error" />
          );
        },
        {
          position: "bottom-center",
        },
      );
    }
  };

  useEffect(() => () => setLoading(false), []);
  if (loadingSession) return <Loader />;

  if (session) return redirect("/dashboard");
  return (
    <>
      <div className="grid gap-3">
        <h1 className="text-center text-text-1 text-2xl font-bold">
          {t("step1.form.title")}
        </h1>
        <p className="text-center text-sm text-text-2">
          {t("step1.form.description")}
        </p>
      </div>
      <Button
        className="font-semibold w-full"
        variant="outlined"
        onClick={registerGoogle}
      >
        <GoogleIcon className="w-6 h-6 mr-2" />
        {t("step1.social.google")}
      </Button>
      <Or text={t("step1.or")} />
      <form className="grid gap-6" onSubmit={handleSubmit(registerUser)}>
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
          className="font-semibold"
          type="submit"
          disabled={loading}
        >
          {loading && <LoaderIcon className="animate-spin" />}
          {t("step1.form.button.text")}
        </Button>
        <p className="text-sm text-text-1 text-center">
          {t("step1.form.question.text")}
          <Link href="/login" className="text-primary font-semibold ml-2">
            {t("step1.form.question.link")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Page;
