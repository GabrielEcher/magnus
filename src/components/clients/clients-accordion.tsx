

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Search, Users, TrendingUp, Edit, Trash2 } from "lucide-react"
import { Clients } from "@/types/clients/clients"
import { Button } from "../ui/button"
import { ClientDialog } from "./client-dialog"
import { ConfirmDeleteDialog } from "../dialogs/delete-dialog"
import { useDeleteClient } from "@/hooks/clients/delete-client"



// Mock data for demonstration
interface ClientsAcordionProps {
    clients: Clients
}

export default function ClientsAccordion({ clients }: ClientsAcordionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { mutateAsync: deleteClient } = useDeleteClient();
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm),
  )

  const totalClients = filteredClients.length
  const clientsWithSales = filteredClients.filter((client) => client.hasSales).length

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm ">Total Clientes</p>
                    <p className="text-2xl font-bold">{totalClients}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm ">Com Compras</p>
                    <p className="text-2xl font-bold ">{clientsWithSales}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 " />
            <Input
              placeholder="Pesquisar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Clients Accordion */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredClients.length === 0 ? (
              <div className="p-8 text-center">
                <Users className="mx-auto h-12 w-12 " />
                <p className="mt-4 text-lg font-medium ">No clients found</p>
                <p className="">Try adjusting your search terms</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredClients.map((client) => (
                  <AccordionItem key={client.publicId} value={client.publicId} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 hover:no-underline">
                      <div className="flex w-full items-center justify-between text-left">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold  truncate pr-2">{client.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {client.hasSales && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Possui Compras
                              </Badge>
                            )}
                            {client.email && (
                              <span className="text-sm  truncate hidden text-muted-foreground sm:inline">{client.email}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-4 pt-2">
                        {/* Contact Information */}
                        <div className="space-y-3">
                          {client.email && (
                            <div className="flex items-start gap-3">
                              <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium ">Email</p>
                                <span
                                  
                                  className="text-blue-600 hover:text-blue-800 break-all"
                                >
                                  {client.email}
                                </span>
                              </div>
                            </div>
                          )}

                          {client.phone && (
                            <div className="flex items-start gap-3">
                              <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">Telefone</p>
                                <span  className="text-blue-600 hover:text-blue-800">
                                  {client.phone}
                                </span>
                              </div>
                            </div>
                          )}

                          {client.address && (
                            <div className="flex items-start gap-3">
                              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium ">Endereço</p>
                                <p className="text-gray-900">{client.address}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Status */}
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Status Comercial</span>
                            <Badge
                              variant={client.hasSales ? "default" : "secondary"}
                              className={client.hasSales ? "bg-green-600" : "bg-gray-500"}
                            >
                              {client.hasSales ? "Possui Compras" : "Nenhuma Compra"}
                            </Badge>
                          </div>
                        </div>

                        {/* Client ID */}
                        <div className="text-xs text-gray-500">ID: {client.publicId}</div>
                      </div>
                      <div className="pt-4 border-t">
            <div className="flex gap-3 w-full">
                <ClientDialog
                title="Editar Cliente"
                description="Edite as informações do cliente"
                client={client}
                trigger={
                    <Button
                variant="outline"
                size="sm"
                className="flex-1  gap-2 bg-transparent"
              >
                <Edit className="h-4 w-4" />
                Editar
              </Button>
                }
                />
              <ConfirmDeleteDialog
              onConfirm={() => {
                deleteClient(client.publicId)
              }}
              title="Excluir Cliente"
              description="Tem certeza que deseja excluir este cliente?"
              trigger={
                <Button
                variant="destructive"
                size="sm"
                className="flex-1  gap-2 "
                disabled={client.hasSales} 
              >
            
                <Trash2 className="h-4 w-4" />
                Excluir
              </Button>
              }
              
              />
              
            </div>
          </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
