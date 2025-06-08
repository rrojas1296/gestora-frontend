import { IconProps } from "@/types/icon";
import React from "react";

const PropertiesIcon = (props: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_113_75)">
        <path
          d="M3.33301 17.5V4.99999C3.33301 4.16666 4.16634 3.33333 4.99967 3.33333H9.16634C9.99967 3.33333 10.833 4.16666 10.833 4.99999V17.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.333 6.66667H14.9997C15.833 6.66667 16.6663 7.50001 16.6663 8.33334V17.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 17.5H17.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_75">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PropertiesIcon;
