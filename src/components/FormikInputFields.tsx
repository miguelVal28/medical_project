import { useField } from "formik";
import { InputField } from "./InputFields";

interface FormikInputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
}

export function FormikInputField({
  id,
  name,
  label,
  placeholder,
  type,
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
    />
  );
}
