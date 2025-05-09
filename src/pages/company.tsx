import { CompanyForm } from "../components/company/company-form";
import { useUserData } from "@/hooks/use-user-info"

export default function CompanyPage() {
  const { data: companyData } = useUserData();

  return (
    <div className=" py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Informações da Empresa</h1>
          <p className="text-muted-foreground">Visualize e altere os detalhes da sua empresa</p>
        </div>

        <CompanyForm initialData={companyData} />
      </div>
    </div>
  )
}