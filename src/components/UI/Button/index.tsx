import { VariantProps, cva, cx } from "class-variance-authority";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("px-4 py-2 rounded", {
  variants: {
    variant: {
      contained:
        "bg-teal-500 text-white hover:bg-white hover:text-teal-600 hover:border-teal-600 border border-teal-500 transition-colors",
      outlined:
        "bg-white text-teal-500 border border-teal-500 hover:border-teal-600 hover:text-teal-600 transition-colors",
    },
  },
  defaultVariants: {
    variant: "contained",
  },
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface Props
  extends ButtonVariantProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  variant: colorVariant,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={twMerge(
        cx(buttonVariants({ variant: colorVariant, className }))
      )}
    >
      {children}
    </button>
  );
}
