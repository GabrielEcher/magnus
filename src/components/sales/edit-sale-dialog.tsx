import { LoaderCircle, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EditSaleFormValues, useEditSaleForm } from "@/lib/zod/sale";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ClientsSelect } from "../clients/clients-select";
import { useEffect, useState } from "react";
import { useClients } from "@/hooks/clients/get-clients";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEditSale } from "@/hooks/products/sales/edit-sale";

interface EditSaleDialogProps {
    saleId: string;
    clientName: string;
}
export function EditSaleDialog({ clientName, saleId }: EditSaleDialogProps) {
    const [open, setOpen] = useState(false)
    const { data: clients = [], isLoading } = useClients()
    const { mutateAsync: editSale, isPending } = useEditSale()
    const [clientId, setClientId] = useState<string | undefined>()

    useEffect(() => {
        if (!isLoading) {
            const client = clients.find(c => c.name === clientName)
            if (client) setClientId(client.publicId)
            else setClientId(undefined) // ou alguma outra lógica caso não ache o cliente
        }
    }, [clientName, clients, isLoading])

    const form = useEditSaleForm({
        defaultValues: {
            clientId: clientId || "",
        },
    })

    // Quando o clientId mudar, reseta o form para sincronizar o valor
    useEffect(() => {
        if (clientId) {
            form.reset({ clientId })
        }
    }, [clientId, form])

    async function onSubmit(data: EditSaleFormValues) {
        if (!clientId) return
        await editSale({ saleId, data })
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="hover:scale-105 transition-all duration-300 mr-1" variant={"outline"} size={"sm"}>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Venda</DialogTitle>
                    <DialogDescription className="text-muted-foreground">Edite o cliente da venda</DialogDescription>
                    <Form {...form}>
                        <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cliente</FormLabel>
                                        <FormControl>
                                            <ClientsSelect value={field.value} onSelect={field.onChange} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button disabled={isPending} type="submit" className="mt-4">
                                    {isPending && (
                                        <LoaderCircle className="mr-2 animate-spin"/>
                                    )}
                                    {isPending ? "Salvando..." : "Salvar"}
                                    </Button>
                            </DialogFooter>
                            
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}