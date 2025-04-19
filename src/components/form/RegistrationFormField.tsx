
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormValues } from "@/schemas/registrationSchema";

interface RegistrationFormFieldProps {
  form: UseFormReturn<RegistrationFormValues>;
  name: keyof RegistrationFormValues;
  label: string;
  placeholder?: string;
  type?: string;
}

export const RegistrationFormField = ({
  form,
  name,
  label,
  placeholder,
  type = "text"
}: RegistrationFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder || label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
