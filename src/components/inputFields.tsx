import { ChangeEventHandler, ReactNode } from "react";
import Link from "next/link";

interface Input {
  id: string;
  label: string;
  placeholder: string;
  type: "email" | "password" | "text";
  value: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  disabled: boolean;
}

export function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  error,
  disabled = false,
  onChange,
}: Input) {
  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={id}
          required
          className={`appearance-none relative block w-full px-3 py-2 border dark:border-gray-700 dark:bg-slate-800 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
