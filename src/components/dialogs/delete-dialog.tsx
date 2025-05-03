import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { useState } from "react"
  
  interface ConfirmDeleteDialogProps {
    trigger: React.ReactNode
    onConfirm: () => Promise<void> | void
    title?: string
    description?: string
  }
  
  export function ConfirmDeleteDialog({
    trigger,
    onConfirm,
    title = "Tem certeza que deseja excluir?",
    description = "Essa ação não pode ser desfeita.",
  }: ConfirmDeleteDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
  
    const handleConfirm = async () => {
      try {
        setLoading(true)
        await onConfirm()
        setOpen(false) // fecha o dialog se tudo der certo
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
              {loading ? "Excluindo..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  