import { Input } from "../ui/input";
interface InputCompanyProps {
  placeholder: string;
  className: string;
  type: string;
}
export default function ContactUsInput({
  placeholder,
  className,
  type,
  ...field
}: InputCompanyProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className={`bg-[#061723] text-white rounded-lg focus:outline-none 
      border-0
      px-8
      
      focus-visible:ring-0
      focus-visible:ring-offset-1
    placeholder:text-white py-6 ${className} `}
      {...field}
    />
  );
}
