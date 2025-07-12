"use client";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import FormControl from "@/components/shared/FormControl";
import Loader from "@/components/shared/Loader";
import useAuthUser from "@/hooks/useAuthUser";
import useSupabaseSession from "@/hooks/useSupabaseUser";
import { controls, schema, SchemaType } from "@/schemas/register/company";
import { useAppSelector } from "@/store/hooks";
import {
  AuthProvider,
  registerUser,
  RegisterUserData,
} from "@/utils/api/auth/registerUser";
import { clientSupabase } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "gestora-lib";
import { useTranslations } from "next-intl";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const registerData = useAppSelector((state) => state.register);
  const { session, loading: loadingSession } = useSupabaseSession();
  const { userDB, loading: loadingUserDB } = useAuthUser();
  const loadingData = loadingSession || loadingUserDB;
  const router = useRouter();
  const t = useTranslations("Register");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const saveData = async (data: SchemaType) => {
    try {
      setLoading(true);
      const { first_name, last_name } = registerData;
      const { name: company_name, sector: company_sector } = data;
      const {
        data: { user },
      } = await clientSupabase.auth.getUser();
      if (!user) return;
      const body: RegisterUserData = {
        email: user.email!,
        first_name: first_name!,
        last_name: last_name!,
        provider: user.app_metadata.provider as AuthProvider,
        company_name,
        company_sector,
        user_id: user.id,
        photo_url: user.user_metadata.avatar_url,
      };
      await registerUser(body);
      router.push("/dashboard");
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };
  const sector = watch("sector");

  useEffect(() => () => setLoading(false), []);
  if (loadingData) return <Loader />;
  if (!session) return redirect("/login");
  if (userDB) return redirect("/dashboard");

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(saveData)}>
      <h1 className="text-center text-text-1 text-2xl font-bold">
        {t("company.title")}
      </h1>
      <p className="text-center text-sm text-text-2">
        {t("company.description")}
      </p>
      {controls.map((c, index) => {
        const { label, name, type, placeholder, options } = c;
        const error = errors[name] ? t(errors[name].message!) : undefined;
        const opts = options?.map((opt) => ({
          value: opt.value,
          label: t(`company.form.${name}.options.${opt.value}`),
        }));
        if (name === "otherSector" && sector !== "other") return;
        return (
          <FormControl
            key={index}
            type={type}
            label={t(label)}
            placeholder={t(placeholder)}
            name={name}
            error={error}
            control={control}
            options={opts}
            register={register}
          />
        );
      })}
      <Button type="submit" variant="filled" className="gap-4">
        {loading && <LoaderIcon className="animate-spin" />}
        {t("company.form.button")}
      </Button>
    </form>
  );
};

export default Page;
