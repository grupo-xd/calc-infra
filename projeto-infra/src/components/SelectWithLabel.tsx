import { type SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectWithLabelProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: Option[];
};

export default function SelectWithLabel({
  id,
  label,
  options,
  ...props
}: SelectWithLabelProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <select id={id} {...props}>
        <option value="">Selecionar</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}