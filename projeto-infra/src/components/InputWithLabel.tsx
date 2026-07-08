import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

export default function Input({
  label,
  id,
  error,
  ...props
}: InputProps) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        {...props}
      />

      {error && <span>{error}</span>}
    </div>
  );
}