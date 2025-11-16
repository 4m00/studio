import type { SVGProps } from "react";

export const Icons = {
  Logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12L9 6l6 6 6-6" />
      <path d="M3 18l6-6 6 6 6-6" />
    </svg>
  ),
};
