import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
export const saleSchema = z.object({
  productId: z.string().min(1, "Produto é obrigatório"),
  clientId: z.string().min(1, "Cliente é obrigatório"),
  quantity: z.number().min(1, "Quantidade é obrigatória"),
})
export type SaleFormValues = z.infer<typeof saleSchema>

export function useSaleForm() {
  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
        productId: "",
        clientId: "",
        quantity: 1
    },
  })
  return form
}

export const editSaleSchema = z.object({
  clientId: z.string().min(1, "Cliente é obrigatório"),
})

export type EditSaleFormValues = z.infer<typeof editSaleSchema>

export function useEditSaleForm( { defaultValues }: { defaultValues: EditSaleFormValues } ) {
  const form = useForm<EditSaleFormValues>({
    resolver: zodResolver(editSaleSchema),
    defaultValues,
  })
  return form
}