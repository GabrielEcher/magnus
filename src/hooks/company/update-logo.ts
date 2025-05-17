import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UploadImageResponse {
  message: string;
}


interface UploadImageParams {
  file: File[];
}

const uploadCompanyLogo = async ({ file }: UploadImageParams): Promise<UploadImageResponse> => {
  const formData = new FormData();

  // Aqui você deve adicionar os arquivos reais
  file.forEach((file) => {
    formData.append("file", file); // "files" deve ser o nome esperado pela API
  });

  const response = await api_db.post<UploadImageResponse>(
    `/companies/logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Necessário para o envio de arquivos
      },
    }
  );

  return response.data;
};
export function useUploadImageLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCompanyLogo,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [`user-data`] });
      toast.success(response.message);
    },
    onError: (response) => {
      toast.error(response.message || "Erro ao enviar imagens");
    },
  });
}
