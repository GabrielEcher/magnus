import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


export const newProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  buyPrice: z.string().min(1, "Preço é obrigatório"),
  categoryId: z.string().min(1, "Categoria é obrigatório"),
})

export type CreateProduct = z.infer<typeof newProductSchema>

export function useCreateProductForm() {
  const form = useForm<CreateProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      price: "0",
      buyPrice: "0",
      categoryId: "",
    },
  })
  return form
}

export const editProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  buyPrice: z.string().min(1, "Preço é obrigatório"),
  categoryId: z.string().min(1, "Categoria é obrigatório"),
})

export type EditProduct = z.infer<typeof editProductSchema>
export function useEditProductForm() {
  const form = useForm<EditProduct>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "",
      price: "0",
      buyPrice: "0",
      categoryId: "",
    }
  })
  return form
}