"use client";
import AddCategoryForm from "@/components/application/Categories/AddCategoryForm";
import NoCategories from "@/components/application/Categories/NoCategories";
import CardApp from "@/components/shared/CardApp";
import useCategories from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Input, Toast } from "gestora-lib";
import React, { useState } from "react";
import { schema, initialValues } from "@/schemas/addCategorySchema";
import { FormProvider, useForm } from "react-hook-form";
import SearchIcon from "@/components/Icons/SearchIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import CategoryCard from "@/components/application/Categories/CategoryCard";
import { useTranslations } from "next-intl";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import { CategoryDB } from "@/utils/api/categories/getCategoriesPerCompany";
import { deleteCategory } from "@/utils/api/categories/deleteCategory";
import { toast } from "sonner";
import { sleep } from "@/utils/sleep";

const Category = () => {
  const t = useTranslations("Category");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryDB | null>(
    null,
  );
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  const company = useAppSelector((state) => state.company);
  const companyId = company.id;
  const { categories, refetch } = useCategories(companyId);
  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      if (!categoryToDelete) return;
      const r = toast.custom(
        () => <Toast text="Deleting category" type="loading" />,
        {
          duration: 1000 * 100,
        },
      );
      await deleteCategory(categoryToDelete.id);
      await sleep(2000);
      toast.dismiss(r);
      toast.custom(() => <Toast text="Category deleted" type="success" />);
      setOpenDeleteDialog(false);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        {categories && categories.length ? (
          <>
            <CardApp className="grid gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <Input
                  placeholder="Search category"
                  containerClassName="w-full lg:w-96 max-w-none"
                  Icon={
                    <SearchIcon className="w-6 h-6 stroke-current text-text-2" />
                  }
                />
                <Button onClick={() => setSidebarOpen(true)}>
                  <PlusIcon className="w-4 h-4 stroke-current text-text-3" />
                  Create category
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    openDialog={() => {
                      setCategoryToDelete(category);
                      setOpenDeleteDialog(true);
                    }}
                    category={category}
                  />
                ))}
              </div>
            </CardApp>
          </>
        ) : (
          <NoCategories openSidebar={setSidebarOpen} />
        )}
        <Dialog
          dialogClassName="px-10 py-12 rounded-2xl bg-bg-1 h-screen lg:h-fit w-screen lg:w-md"
          open={sidebarOpen}
          setOpen={(open) => {
            setSidebarOpen(open);
            methods.reset(initialValues);
          }}
        >
          <AddCategoryForm
            setOpen={(open) => {
              setSidebarOpen(open);
              methods.reset(initialValues);
            }}
            refetch={refetch}
          />
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          dialogClassName="flex flex-col gap-2 max-w-md w-11/12"
        >
          <h1 className="text-lg text-text-1 font-semibold">
            {t("deleteDialog.title")}
            <span> &quot;{categoryToDelete?.name}&quot;</span> ?
          </h1>
          <h2 className="text-sm text-text-2">
            {t("deleteDialog.description")}
          </h2>
          <div className="flex gap-4 self-end">
            <Button
              variant="ghost"
              onClick={() => setOpenDeleteDialog(false)}
              className="hover:bg-bg-1"
            >
              {t("deleteDialog.button.cancel")}
            </Button>
            <Button
              className="bg-danger font-semibold hover:bg-danger"
              onClick={handleDelete}
            >
              {loadingDelete && (
                <LoaderIcon className="animate-spin w-5 h-5 text-text-3 stroke-current" />
              )}
              {t("deleteDialog.button.delete")}
            </Button>
          </div>
        </Dialog>
      </FormProvider>
    </>
  );
};

export default Category;
