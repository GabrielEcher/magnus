import { api_db } from "@/services/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UploadImageResponse {
  message: string;
}


interface UploadImageParams {
  productId: string;
  files: File[];
}

const uploadProductImage = async ({ productId, files }: UploadImageParams): Promise<UploadImageResponse> => {
  const formData = new FormData();

  // Aqui você deve adicionar os arquivos reais
  files.forEach((file) => {
    formData.append("files", file); // "files" deve ser o nome esperado pela API
  });

  const response = await api_db.post<UploadImageResponse>(
    `/products/photo/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Necessário para o envio de arquivos
      },
    }
  );

  return response.data;
};
export function useUploadProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProductImage,
    onSuccess: (response, data) => {
      queryClient.invalidateQueries({ queryKey: [`images-${data.productId}`] });
      toast.success(response.message);
    },
    onError: (response) => {
      toast.error(response.message || "Erro ao enviar imagens");
    },
  });
}
