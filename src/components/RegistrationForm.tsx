
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
  major: z.string().min(2, {
    message: "Адистик 2 символдон ашуун болушу керек.",
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
                <FormLabel>Аты-жөнү</FormLabel>
                <FormControl>
                  <Input placeholder="Асан Усенов" {...field} />
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
                <FormLabel>Электрондук почта</FormLabel>
                <FormControl>
                  <Input placeholder="asan.usenov@example.com" type="email" {...field} />
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
                <FormLabel>Телефон номери</FormLabel>
                <FormControl>
                  <Input placeholder="(0XXX) XX-XX-XX" {...field} />
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
                <FormLabel>Университет/Колледж</FormLabel>
                <FormControl>
                  <Input placeholder="Университет аты" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адистик</FormLabel>
                <FormControl>
                  <Input placeholder="Компьютердик илимдер" {...field} />
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
                <FormLabel>Бүтүрүү жылы</FormLabel>
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
                <FormLabel>Команда статусу</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Команда статусун тандаңыз" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="looking">Команда издеп жатам</SelectItem>
                    <SelectItem value="have_team">Командам бар</SelectItem>
                    <SelectItem value="solo">Жалгыз катышам</SelectItem>
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
                <FormLabel>Футболка өлчөмү</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Футболка өлчөмүн тандаңыз" />
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
        </div>
        
        <FormField
          control={form.control}
          name="projectIdea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Долбоор идеясы (Милдеттүү эмес)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Долбоор идеяңыз же эмне түзүүгө кызыкканыңыз жөнүндө бөлүшүңүз..."
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
              <FormLabel>Тамактануу чектөөлөрү (Милдеттүү эмес)</FormLabel>
              <FormControl>
                <Input placeholder="Вегетариандык, веган, глютенсиз, ж.б." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Каттоо жүрүүдө...</>
          ) : (
            "Каттоону аяктоо"
          )}
        </Button>
      </form>
    </Form>
  );
}
