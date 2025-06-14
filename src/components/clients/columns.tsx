import { Client } from "@/types/clients/clients";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ClientDialog } from "./client-dialog";
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog";
import { useDeleteClient } from "@/hooks/clients/delete-client";

export const clientsColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    id: "actions",
    header: "Ações",
    cell: function Cell ({ row }) {
      const { mutateAsync: deleteClient } = useDeleteClient();
      const handleDelete = async () => {
        await deleteClient(row.original.publicId);
      };
      return (
        <div className="flex items-center gap-2">
          <ClientDialog
          client={row.original}
            trigger={
              <Button className="hover:scale-105 transition-all duration-300" variant={"outline"} size={"icon"}>
                <Edit />
              </Button>
            }
            title="Editar cliente"
            description="Edite os dados cadastrais do cliente"
          />
          <ConfirmDeleteDialog
          onConfirm={handleDelete}         
           trigger={
            <Button className="hover:scale-105 transition-all duration-300" disabled={row.original.hasSales} variant={"outline"} size={"icon"}>
              <Trash2 />
            </Button>
          }
          title="Excluir cliente"
          description="Tem certeza que deseja excluir este cliente?"
          />
        </div>
      )

    },  }
];