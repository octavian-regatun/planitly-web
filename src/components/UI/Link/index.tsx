import { VariantProps, cva } from "class-variance-authority";

const linkVariants = cva("", {
  variants: {
    variant: {
      contained:
        "bg-teal-500 text-white hover:bg-white hover:text-teal-600 hover:border-teal-600 border border-teal-500 transition-colors",
      outlined:
        "bg-white text-teal-500 border border-teal-500 hover:border-teal-600 hover:text-teal-600 transition-colors",
    },
    color: {
      primary: "text-teal-500",
    },
  },
  compoundVariants: [
    {
      variant: "contained",
      color: "primary",
      className:
        "bg-teal-500 text-white hover:bg-white hover:text-teal-600 hover:border-teal-600 border border-teal-500 transition-colors",
    },
  ],
  defaultVariants: {},
});

type LinkVariantProps = VariantProps<typeof linkVariants>;

interface Props extends LinkVariantProps {
  className?: string;
}

export default function Link({ className }: Props) {}
