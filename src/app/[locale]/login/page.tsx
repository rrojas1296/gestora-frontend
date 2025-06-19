"use client";
import { Button, Toast } from "housy-lib";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaFields,
  type LoginSchemaType,
} from "@/schemas/loginSchema";
import { cn } from "@/utils/cn";
import GoogleIcon from "@/components/Icons/GoogleIcon";
import EmailIcon from "@/components/Icons/EmailIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import CloseEyeIcon from "@/components/Icons/CloseEyeIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/config.slice";
import { toast } from "sonner";
import Or from "@/components/shared/Or";
import FormControl from "@/components/shared/FormControl";
import { logginGoogle } from "@/utils/supabase/auth";
import { supabaseClient } from "@/utils/supabase/client";
import { FormControlType } from "@/types/controls";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const fields: FormControlType<LoginSchemaFields>[] = [
  {
    name: "email",
    label: "form.email.label",
    type: "email",
    placeholder: "form.email.placeholder",
    icon: EmailIcon,
  },
  {
    name: "password",
    label: "form.password.label",
    type: "password",
    placeholder: "form.password.placeholder",
  },
];

const Login = () => {
  const t = useTranslations("Login");
  const dispath = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useAppSelector((state) => state.config.currentTheme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      const { email, password } = data;
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithPassword({
        password,
        email,
      });
      if (error) {
        return toast.custom(
          () => {
            return (
              <Toast
                text={t(`form.errors.${error.code || "server_error"}`)}
                type="error"
                className="bg-bg-1 text-text-1 border-border-2 w-fit justify-self-center"
              />
            );
          },
          {
            position: "bottom-center",
          },
        );
      }
      router.push("/dashboard");
    } catch {
      toast.custom(
        () => {
          return (
            <Toast
              text={t(`form.errors.server_error`)}
              type="error"
              className="bg-bg-1 text-text-1 border-border-2 w-fit justify-self-center"
            />
          );
        },
        {
          position: "bottom-center",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    await logginGoogle();
  };
  return (
    <div className="h-screen bg-bg-1 flex flex-col py-12 gap-12 place-items-center overflow-y-auto lg:bg-bg-2 lg:grid lg:place-items-center">
      <div className="grid gap-6 w-full max-w-md px-8 lg:bg-bg-1 lg:px-14 lg:rounded-xl lg:py-14 lg:shadow-lg lg:shadow-shadow-1 2xl:py-20">
        <div className="grid gap-3">
          <h1 className="text-center text-text-1 text-2xl font-bold">
            {t("title")}
          </h1>
          <p className="text-center text-sm text-text-2">{t("description")}</p>
        </div>
        <Button
          className="font-semibold w-full border-border-1 text-text-1 hover:bg-bg-2/30"
          variant="outlined"
          onClick={googleLogin}
        >
          <GoogleIcon className="w-6 h-6 mr-2" />
          {t("buttons.google")}
        </Button>

        <Or text={t("or")} />
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-6">
          {fields.map((field) => {
            const { placeholder, name, label, icon, type } = field;
            const Icon = icon
              ? icon
              : showPassword
                ? OpenEyeIcon
                : CloseEyeIcon;
            const error = errors[name] ? t(errors[name].message!) : "";
            return (
              <FormControl
                key={name}
                Icon={
                  <Icon
                    onClick={() => {
                      if (name === "password") setShowPassword(!showPassword);
                    }}
                    className={cn(
                      "w-6 h-6  text-text-2 stroke-current",
                      error && "text-red-500",
                      name === "password" && "cursor-pointer",
                    )}
                  />
                }
                placeholder={t(placeholder)}
                name={name}
                register={register}
                error={error}
                label={t(label)}
                type={
                  name === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
              />
            );
          })}
          <Link
            href="/forgotPassword"
            className="text-primary font-semibold text-sm w-fit"
          >
            {t("forgotPassword")}
          </Link>
          <Button
            variant="filled"
            className="bg-primary font-semibold hover:bg-primary/90"
            type="submit"
            disabled={loading}
          >
            {loading && <LoaderIcon className="animate-spin" />}
            {t("form.button.text")}
          </Button>
          <p className="text-sm font-normal text-text-1 text-center">
            {t("register.question")}
            <Link href="/register" className="text-primary ml-2 font-bold">
              {t("register.link")}
            </Link>
          </p>
        </form>
      </div>

      <div className="flex h-fit gap-4 items-center lg:absolute lg:right-6 lg:bottom-6">
        <Button
          onClick={() => {
            const newLocale = locale === "es" ? "en" : "es";
            router.replace(
              { pathname },
              {
                locale: newLocale,
              },
            );
          }}
          variant="icon"
          className="p-0 hover:bg-bg-2"
        >
          <WorldIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <Button
          variant="icon"
          className="p-0 hover:bg-bg-2"
          onClick={() =>
            dispath(
              setTheme({ currentTheme: theme === "dark" ? "light" : "dark" }),
            )
          }
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6 text-text-1 stroke-current" />
          ) : (
            <MoonIcon className="w-6 h-6 text-text-1 stroke-current" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Login;
