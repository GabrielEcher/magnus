// components/categories/categories-select.tsx
import { useCategories } from "@/hooks/categories/get-categories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoriesSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
}

export function CategoriesSelect({ value, onValueChange }: CategoriesSelectProps) {
  const { data } = useCategories();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias de Produtos</SelectLabel>
          {data.map((category) => (
            <SelectItem key={category.publicId} value={category.publicId}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
