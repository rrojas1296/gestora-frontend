import { IconProps } from "@/types/icon";
import React from "react";

const ReservationsIcon = (props: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_113_97)">
        <path
          d="M15.3351 4.59L17.4501 13.055C17.5434 13.4251 17.5061 13.8161 17.3445 14.1619C17.183 14.5078 16.9071 14.7873 16.5634 14.9533L10.7001 17.7583C10.4814 17.8632 10.2419 17.9177 9.99927 17.9177C9.75668 17.9177 9.51718 17.8632 9.29844 17.7583L3.43594 14.9542C3.09226 14.7881 2.81637 14.5086 2.65484 14.1628C2.49331 13.8169 2.45602 13.426 2.54928 13.0558L4.66511 4.59C4.72544 4.34754 4.84005 4.12195 5.00028 3.93024C5.16052 3.73854 5.3622 3.58572 5.59011 3.48333L9.33678 1.80833C9.54524 1.71526 9.77098 1.66715 9.99927 1.66715C10.2276 1.66715 10.4533 1.71526 10.6618 1.80833L14.4084 3.48333C14.8701 3.68833 15.2109 4.09667 15.3351 4.59Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 4.01666L10.6683 5.95333C10.4583 6.0472 10.2309 6.09571 10.0008 6.09571C9.7708 6.09571 9.54335 6.0472 9.33333 5.95333L5 4.01583"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 6.1V17.9167"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_113_97">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ReservationsIcon;
