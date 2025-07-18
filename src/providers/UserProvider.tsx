"use client";
import useAuthUser from "@/hooks/useAuthUser";
import { useAppDispatch } from "@/store/hooks";
import { setCompany } from "@/store/slices/company.slice";
import { setUser } from "@/store/slices/user.slice";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { userDB, loading } = useAuthUser();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userDB && !loading) {
      const companies = userDB.companies.map((c, i) => ({
        ...c,
        current: i === 0,
      }));
      dispatch(setCompany({ ...userDB.companies[0] }));
      dispatch(setUser({ ...userDB, companies }));
    }
  }, [loading, dispatch, userDB]);
  return children;
};

export default UserProvider;
