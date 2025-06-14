import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ClientForm from "./client-form";
import { useState } from "react";
import { Client } from "@/types/clients/clients";
interface ClientDialogProps {
  trigger: React.ReactNode;
  client?: Client
  title: string;
  description: string;

}
export function ClientDialog({ trigger, title, description, client }: ClientDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <ClientForm client={client} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}