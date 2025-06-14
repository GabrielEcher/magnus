import {
  zodResolver
} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import * as z from "zod"

const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional()
});

export type ClientFormValues = z.infer<typeof clientSchema>;    

export function useClientForm() {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: ""
    },
  });
  return form
}