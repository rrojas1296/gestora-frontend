import { Button } from "gestora-lib";
import React from "react";

const NoCategories = () => {
  return (
    <div className="inset-0 flex flex-col gap-3 justify-center items-center h-[calc(100vh-148px)] text-text-1">
      <h1 className="text-2xl font-semibold text-center">
        Ups, you dont have any categories yet
      </h1>
      <p className="text-text-2 text-base text-center font-semibold">
        Start creating your first category to simplify your manage process
      </p>
      <Button variant="filled">Create</Button>
    </div>
  );
};

export default NoCategories;
