import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveParticipant } from "@/utils/excelUtils";
import { useTranslation } from "@/utils/i18n";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Аты-жөнү 2 символдон ашуун болушу керек.",
  }),
  email: z.string().email({
    message: "Туура электрондук почта дарегин киргизиңиз.",
  }),
  phone: z.string().min(10, {
    message: "Туура телефон номерин киргизиңиз.",
  }),
  university: z.string().min(2, {
    message: "Университеттин аты 2 символдон ашуун болушу керек.",
  }),
  teamName: z.string().min(2, {
    message: "Команданын аталышы 2 символдон ашуун болушу керек.",
  }),
  teamSize: z.string().min(1, {
    message: "Команда мүчөлөрүнүн санын киргизиңиз.",
  }),
  teamMembers: z.string().min(2, {
    message: "Команда мүчөлөрүнүн аты-жөнүн киргизиңиз.",
  }),
  graduationYear: z.string().regex(/^\d{4}$/, {
    message: "Туура бүтүрүү жылын киргизиңиз (мисалы, 2025).",
  }),
  teamStatus: z.string({
    required_error: "Команда статусун тандаңыз.",
  }),
  projectIdea: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  tshirtSize: z.string({
    required_error: "Футболка өлчөмүн тандаңыз.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      university: "",
      major: "",
      graduationYear: "",
      teamStatus: "",
      projectIdea: "",
      dietaryRestrictions: "",
      tshirtSize: "",
      teamName: "",
      teamSize: "",
      teamMembers: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.fullName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.fullName')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.phone')}</FormLabel>
                <FormControl>
                  <Input placeholder="+996 XXX XXX XXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.university')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.university')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.teamName')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.teamName')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.teamSize')}</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="teamMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.teamMembers')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form.teamMembers')}
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.gradYear')}</FormLabel>
              <FormControl>
                <Input placeholder="2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="teamStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.teamStatus')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.teamStatusSelect')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="looking">{t('form.looking')}</SelectItem>
                  <SelectItem value="have_team">{t('form.haveTeam')}</SelectItem>
                  <SelectItem value="solo">{t('form.solo')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tshirtSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.tshirtSize')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.tshirtSizeSelect')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="xxl">XXL</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="projectIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.projectIdea')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form.projectIdeaPlaceholder')}
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.dietaryRestrictions')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.dietaryRestrictionsPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
