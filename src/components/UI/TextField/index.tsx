import { VariantProps, cva, cx } from "class-variance-authority";
import {
  InputHTMLAttributes,
  PropsWithRef,
  RefCallback,
  forwardRef,
} from "react";
import { RefCallBack } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const textFieldVariants = cva("", {
  variants: {
    variant: {
      default: "rounded border border-teal-500 px-4 py-2 outline-teal-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TextFieldVariantProps = VariantProps<typeof textFieldVariants>;

interface Props
  extends TextFieldVariantProps,
    PropsWithRef<InputHTMLAttributes<HTMLInputElement>> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ variant, className, onChange, value, placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        className={twMerge(cx(textFieldVariants({ variant }), className))}
        {...rest}
      />
    );
  }
);

TextField.displayName = "TextField";
