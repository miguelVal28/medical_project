import { useField } from "formik";
import { InputField } from "./InputFields";

interface FormikInputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "email" | "password";
}

interface FormikTextAreaFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  disabled?: boolean;
}

export function FormikInputField({
  id,
  name,
  label,
  placeholder,
  type,
  disabled = false,
}: FormikInputFieldProps) {
  const [field, meta] = useField(name);

  return (
    <InputField
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      onChange={field.onChange}
      error={meta.touched && meta.error ? meta.error : undefined}
      disabled={disabled}
    />
  );
}

export function FormikTextAreaField({
  id,
  name,
  label,
  placeholder,
  rows = 4,
  disabled = false,
}: FormikTextAreaFieldProps) {
  const [field, meta] = useField(name);

  return (
    <div className="mt-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <textarea
        id={id}
        {...field}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 p-4 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-xs text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
