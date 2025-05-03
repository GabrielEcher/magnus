import { Edit, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormProvider } from "react-hook-form";
import { EditProduct, useEditProductForm } from "@/lib/zod/products";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { CategoriesSelect } from "../categories/categories-select";
import { useEffect, useState } from "react";
import { Product } from "@/types/products/products";
import { useEditProduct } from "@/hooks/products/update-product";

interface EditProductDialogProps {
  product: Product | null;
}

export function EditProductDialog({ product }: EditProductDialogProps) {
    const [open, setOpen] = useState(false);
    const { mutateAsync: editProduct, isPending } = useEditProduct();
    const form = useEditProductForm();
  
    // Preenche o formulário com os dados do produto
    useEffect(() => {
      if (product) {
        form.reset({
          name: product.name,
          price: product.price.toString(),
          buyPrice: product.buyPrice.toString(),
          categoryId: product.categoryId,
        });
      }
    }, [product, form]);
  
    // Função chamada ao confirmar a edição
    const onSubmit = async () => {
      if (product) {
        const data: EditProduct = form.getValues();
        await editProduct({ data, id: product.publicId }); // Realiza a edição
        setOpen(false); // Fecha o diálogo após a edição
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="hover:scale-110 transistion-all duration-300">
    <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>Faça as alterações no produto.</DialogDescription>
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
                    <Input type="number" placeholder="Preço do Produto" {...field} />
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
            <Button disabled={isPending} className="w-full hover:scale-105 transition-all duration-300 ease-in-out">
              <Save />
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
