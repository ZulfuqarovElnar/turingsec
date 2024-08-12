import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RadioInput({
  name,
  value,
  id,
  label,
  checked,
  defaultChecked,
}: {
  name: string;
  value: string;
  id: string;
  label: string;
  checked?: boolean;
  defaultChecked?:boolean;
}) {
  return (
    <div>
      <Input
        type="radio"
        className="w-4 h-4 "
        name={name}
        value={value}
        id={id}
        defaultChecked={defaultChecked}
      />
      <Label
        className="flex items-center gap-2 sm:text-[18px] text-[14px] font-[500]"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
}
