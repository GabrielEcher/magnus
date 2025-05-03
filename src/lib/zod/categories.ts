import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
})

export type CreateCategory = z.infer<typeof schema>

export function useCreateCategoryForm() {
  const form = useForm<CreateCategory>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  return form
}