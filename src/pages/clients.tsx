import { ClientsTable } from "@/components/clients/clients-table";
import { clientsColumns } from "@/components/clients/columns";
import { ClientDialog } from "@/components/clients/client-dialog";
import { useClients } from "@/hooks/clients/get-clients";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ClientsAccordion from "@/components/clients/clients-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Clients() {
  const { data } = useClients();
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-4">
      <div className="pl-12 pt-6 space-y-2">
        <h1 className="text-2xl font-bold ">Clientes</h1>
        <p className="text-muted-foreground">Gerencie seus Clientes</p>
      </div>
      <div className="pl-12 flex justify-end items-center gap-2 pr-4">
        <ClientDialog
          title="Adicionar um novo cliente"
          description="Adicione um novo cliente a sua carteira"
          trigger={
            <Button className="hover:scale-105 transition-all duration-300">
              <PlusCircle /> Adicionar Cliente
            </Button>
          } />
      </div>
      <div className="p-4">
        {isMobile ? (
          <ClientsAccordion clients={data} />
        ) : (
          <ClientsTable columns={clientsColumns} data={data} />
        )}
      </div>

    </div>

  )
}