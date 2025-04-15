
import { z } from "zod";

export const registrationSchema = z.object({
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
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
