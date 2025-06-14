import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PhoneInput
} from "@/components/ui/phone-input";
import {
  Textarea
} from "@/components/ui/textarea"
import { useEditClient } from "@/hooks/clients/edit-client";
import { usePostClient } from "@/hooks/clients/post-client"
import { ClientFormValues, useClientForm } from "@/lib/zod/clients";
import { Client } from "@/types/clients/clients";
import { LoaderCircle } from "lucide-react";

interface ClientFormProps {
  onSuccess?: () => void;
  client?: Client
};

export default function ClientForm({ onSuccess, client }: ClientFormProps) {
  const { mutateAsync: createClient, isPending } = usePostClient();
  const { mutateAsync: editClient, isPending: isPendingEdit } = useEditClient();
  const form = useClientForm();
  if (client) {
    form.setValue("name", client.name);
    form.setValue("email", client.email ?? undefined);
    form.setValue("phone", client.phone ?? undefined);
    form.setValue("address", client.address ?? undefined);
  }
    async function onSubmit(data: ClientFormValues) {
        if (client) {
            await editClient({ id: client.publicId, data });
            form.reset();
            onSuccess?.();
        } else if (!client) {
            await createClient(data);
            form.reset();
            onSuccess?.();
        }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input 
                placeholder="Digite o nome do cliente..."
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>Telefone</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    
                    placeholder="Digite o telefone do cliente"
                    {...field}
                    defaultCountry="BR"
                  />
                </FormControl>
              <FormDescription>(Opcional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input 
                placeholder="Digite o e-mail do cliente..."
                
                type="email"
                {...field} />
              </FormControl>
              <FormDescription>(Opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite o endereço do cliente..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>(Opcional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending || isPendingEdit}>
            {isPending && <LoaderCircle className="animate-spin"/>}
            {isPendingEdit && <LoaderCircle className="animate-spin"/>}
            Salvar
        </Button>
        </div>
      </form>
    </Form>
  )
}