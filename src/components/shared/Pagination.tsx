import { Button } from "gestora-lib";
import React from "react";
import ArrowLeft from "../Icons/CloseIcon";
import ArrowRight from "../Icons/ArrowRight";
import { cn } from "@/utils/cn";
import { PaginationState } from "@tanstack/react-table";
import { sliceArrayForPagination } from "@/utils/application/inventory";

interface Props {
  totalPages: number;
  setPage: (page: number) => void;
  pagination: PaginationState;
  className?: string;
}

const Pagination = ({ setPage, totalPages, pagination, className }: Props) => {
  const newArray = sliceArrayForPagination(
    [...Array(totalPages).keys()],
    pagination
  );
  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      <Button
        variant="icon"
        className={cn(
          "p-0 flex place-items-center bg-bg-2 hover:bg-bg-1/90 rounded-md h-8 w-8",
          totalPages <= 1 && "hidden"
        )}
        onClick={() =>
          setPage(pagination.pageIndex === 0 ? 0 : pagination.pageIndex - 1)
        }
      >
        <ArrowLeft className="w-5 h-5 text-text-1 stroke-current " />
      </Button>
      {newArray.map((page) => {
        return (
          <Button
            key={page}
            variant="icon"
            onClick={() => setPage(page)}
            className={cn(
              "p-0 flex text-sm place-items-center text-text-1 bg-bg-2 hover:bg-bg-2/50 rounded-md h-8 w-8",
              pagination.pageIndex === page &&
                "bg-primary text-text-3 hover:bg-primary/90"
            )}
          >
            {page + 1}
          </Button>
        );
      })}
      <Button
        variant="icon"
        className={cn(
          "p-0 flex place-items-center bg-bg-2 hover:bg-bg-1/90 rounded-md h-8 w-8",
          totalPages <= 1 && "hidden"
        )}
        onClick={() =>
          setPage(
            pagination.pageIndex === totalPages - 1 || totalPages === 0
              ? totalPages - 1
              : pagination.pageIndex + 1
          )
        }
      >
        <ArrowRight className="w-5 h-5 text-text-1 stroke-current" />
      </Button>
    </div>
  );
};

export default Pagination;
