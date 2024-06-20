// RadioInput.tsx

import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface RadioInputProps {
  name: string;
  value: string;
  id: string;
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  value,
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div>
      <Input
        type="radio"
        className="w-4 h-4"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <Label
        className="flex items-center gap-2 sm:text-[18px] text-[14px] font-[500]"
        htmlFor={id}
      >
        {label}
      </Label>
    </div>
  );
};

export default RadioInput;

