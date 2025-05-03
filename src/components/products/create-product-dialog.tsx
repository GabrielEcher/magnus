import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormProvider } from "react-hook-form";
import { CreateProduct, useCreateProductForm } from "@/lib/zod/products";
import { usePostProduct } from "@/hooks/products/post-product";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CategoriesSelect } from "../categories/categories-select";
import { useState } from "react";


export function CreateProductDialog() {
    const [open, setOpen] = useState(false);
    const { mutateAsync: createProduct, isPending } = usePostProduct();

    const onSubmit = async (data: CreateProduct) => {
        await createProduct(data);
        setOpen(false);
        form.reset();
    }


    const form = useCreateProductForm();
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="hover:scale-105 transition-all duration-300 ease-in-out">
                    <PlusCircle />
                    Adicionar Produto
                </Button>
            </DialogTrigger>
            
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Adicionar um novo produto</DialogTitle>
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
                                        <Input placeholder="Nome do produto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Preço do Produto"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="buyPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço de Compra</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Preço de Compra" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <FormControl>
                                        <CategoriesSelect onValueChange={field.onChange} value={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} className="w-full hover:scale-105 transition-all duration-300 ease-in-out"><PlusCircle/>Adicionar</Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}