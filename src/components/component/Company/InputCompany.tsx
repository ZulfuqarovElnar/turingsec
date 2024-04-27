import * as React from "react";
import { cn } from "../../../lib";
import { Input, InputProps } from "../../ui/input";

interface InputCompanyProps extends InputProps {
  placeholder: string;
  className: string;
}

const InputCompany: React.ForwardRefRenderFunction<HTMLInputElement, InputCompanyProps> = (
  { placeholder, className, type, ...field },
  ref
) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className={cn(
        "bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6",
        className
      )}
      ref={ref}
      {...field}
    />
  );
};

export default React.forwardRef(InputCompany);
