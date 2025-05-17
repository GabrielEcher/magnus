"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "./company-image-upload"
import { useUploadImageLogo } from "@/hooks/company/update-logo"

const infoSchema = z.object({
  companyName: z.string().min(2),
  companyEmail: z.string().email(),
  companyContact: z.string().min(8),
  companyAddress: z.string().min(10),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
})

export type CompanyInfoData = z.infer<typeof infoSchema>
const logoSchema = z.object({
  companyLogo: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Envie um arquivo válido",
    }),
})

interface CompanyFormProps {
  initialData?: {
    companyName: string
    companyEmail: string
    companyContact: string
    companyAddress: string
    cnpj: string
    companyLogo: string | null
  }
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { mutateAsync: uploadLogo, isPending: isPendingLogo } = useUploadImageLogo()
  const infoForm = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      companyName: initialData?.companyName,
      companyEmail: initialData?.companyEmail,
      companyContact: initialData?.companyContact,
      companyAddress: initialData?.companyAddress,
      cnpj: initialData?.cnpj,
    },
  })

  const logoForm = useForm<z.infer<typeof logoSchema>>({
  resolver: zodResolver(logoSchema),
  defaultValues: {
    companyLogo: initialData?.companyLogo || null,
  },
})

  async function onInfoSubmit(values: z.infer<typeof infoSchema>) {
    setIsLoading(true)
    console.log("Submitting company info:", values)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  async function onLogoSubmit(values: z.infer<typeof logoSchema>) {
    await uploadLogo({file: [values.companyLogo]})
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-10">

        {/* Logo Form */}
        <Form {...logoForm}>
          <form onSubmit={logoForm.handleSubmit(onLogoSubmit)} className="space-y-4">
            <h3 className="text-lg font-medium">Logo da Empresa</h3>
            <p className="text-sm text-muted-foreground">Upload do logo da empresa (400x400px recomendado).</p>
            <FormField
              control={logoForm.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isPendingLogo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Logo
              </Button>
            </div>
          </form>
        </Form>

        <Separator />

        {/* Company Info Form */}
        <Form {...infoForm}>
          <form onSubmit={infoForm.handleSubmit(onInfoSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={infoForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua Empresa Ltda" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@empresa.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="companyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 98765-4321" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="12.345.678/0001-90" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={infoForm.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Rua Exemplo, 123" {...field} disabled={isLoading} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Informações
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
