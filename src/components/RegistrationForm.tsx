
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { saveParticipant } from "@/utils/excelUtils";
import { useTranslation } from "@/utils/i18n";
import { registrationSchema, type RegistrationFormValues } from "@/schemas/registrationSchema";
import { RegistrationFormField } from "./form/RegistrationFormField";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      university: "",
      teamName: "",
      teamSize: "",
      teamMembers: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      await saveParticipant(data);
      toast.success("Каттоо ийгиликтүү болду!");
      navigate("/success");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Каттоо маселеси келип чыкты. Кайра аракет кылыңыз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RegistrationFormField 
            form={form}
            name="name"
            label={t('form.fullName')}
          />
          <RegistrationFormField 
            form={form}
            name="phone"
            label={t('form.phone')}
            placeholder="+996 XXX XXX XXX"
          />
          <RegistrationFormField 
            form={form}
            name="email"
            label={t('form.email')}
            type="email"
            placeholder="email@example.com"
          />
          <RegistrationFormField 
            form={form}
            name="university"
            label={t('form.university')}
          />
          <RegistrationFormField 
            form={form}
            name="teamName"
            label={t('form.teamName')}
          />
          <RegistrationFormField 
            form={form}
            name="teamSize"
            label={t('form.teamSize')}
            type="number"
            placeholder="1"
          />
        </div>
        
        <RegistrationFormField 
          form={form}
          name="teamMembers"
          label={t('form.teamMembers')}
        />
        
        <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('common.loading')}</>
          ) : (
            t('common.submit')
          )}
        </Button>
      </form>
    </Form>
  );
}
