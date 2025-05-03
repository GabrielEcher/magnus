import { PlusCircle, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormProvider } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { usePostCategory } from "@/hooks/categories/post-category";
import { CreateCategory, useCreateCategoryForm } from "@/lib/zod/categories";
import { Textarea } from "../ui/textarea";


export function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);
    const { mutateAsync: createCategory, isPending } = usePostCategory();

    const onSubmit = async (data: CreateCategory) => {
        console.log(data)
        await createCategory(data);
        setOpen(false);
        form.reset();
    }


    const form = useCreateCategoryForm();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="hover:scale-105 transition-all duration-300 ease-in-out">
                    <Tag />
                    Adicionar Categoria
                </Button>
            </DialogTrigger>
            
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Adicione uma nova categoria de produtos</DialogTitle>
                <DialogDescription>
                    Preencha os dados abaixo
                </DialogDescription>
            </DialogHeader>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome da categoria" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} placeholder="Descreva a Categoria..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button disabled={isPending} className="w-full hover:scale-105 transition-all duration-300 ease-in-out"><PlusCircle/>
                        Adicionar
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}