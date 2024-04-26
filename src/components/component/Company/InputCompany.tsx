import { Input } from "../../ui/input";
interface InputCompanyProps {
  placeholder: string;
  className: string;
  type: string;
}
export default function InputCompany({
  placeholder,
  className,
  type,

  ...field
}: InputCompanyProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent text-white rounded-2xl focus:outline-none 
      focus-visible:ring-0
      focus-visible:ring-offset-1
    placeholder:text-white py-6 ${className} `}
      {...field}
    />
  );
}
