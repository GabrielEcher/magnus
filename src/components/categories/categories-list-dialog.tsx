"use client"

import { Pencil, X, Check, Trash2, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCategories } from "@/hooks/categories/get-categories"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateCategoryForm } from "@/lib/zod/categories"
import { useUpdateCategory } from "@/hooks/categories/update-category"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteCategory } from "@/hooks/categories/delete-category"

interface Category {
  name: string
  description: string
  publicId: string
}

interface CategoryItemProps {
  category: Category
}

function CategoryItem({ category }: CategoryItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const form = useCreateCategoryForm()
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory()
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategory()

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    deleteCategory(category.publicId, {
      onSuccess: () => {
        setShowDeleteConfirm(false)
      },
    })
  }

  const handleEdit = () => {
    form.reset({
      name: category.name,
      description: category.description,
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.reset()
  }

  const onSubmit = form.handleSubmit((data) => {
    updateCategory(
      {
        id: category.publicId,
        data,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  })

  if (isEditing) {
    return (
      <Card className="mb-3">
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Textarea placeholder="Descrição da categoria" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button type="submit" size="sm" disabled={isUpdating || !form.formState.isDirty}>
                  <Check className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="mb-3">
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a categoria <span className="font-medium">{category.name}</span>?
              <br />
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function CategoriesListDialog() {
  const { data: categories, isLoading } = useCategories()

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="hover:scale-105 transistion-all duration-300 ease-in-out">
          <Tags className="h-4 w-4 mr-2" />
          Categorias
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Veja as categorias dos seus Produtos</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edite ou exclua as categorias de seus produtos
        </DialogDescription>
        <div className="mt-4">
          {isLoading ? (
            <p className="text-center py-4 text-muted-foreground">Carregando categorias...</p>
          ) : !categories || categories.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">Nenhuma categoria encontrada.</p>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <CategoryItem key={category.publicId} category={category} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
