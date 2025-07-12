import useCategories from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hooks";
import { Button } from "gestora-lib";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  openSidebar: () => void;
}

const EmptyTable = ({ openSidebar }: Props) => {
  const companyId = useAppSelector((state) => state.company.id);
  const { categories } = useCategories(companyId);
  const router = useRouter();
  return (
    <div className="inset-0 flex flex-col gap-3 justify-center items-center h-[calc(100vh-148px)]">
      <h1 className="text-2xl font-semibold text-center">
        You dont have any items yet
      </h1>
      <p className="text-text-2 text-base text-center font-semibold">
        Start creating your first item to simplify your manage process
      </p>
      {categories && categories.length > 0 ? (
        <Button
          onClick={openSidebar}
          className="font-semibold"
          variant="filled"
        >
          Create
        </Button>
      ) : (
        <Button
          className="font-semibold"
          variant="filled"
          onClick={() => router.push("/categories")}
        >
          Create Category
        </Button>
      )}
    </div>
  );
};

export default EmptyTable;
