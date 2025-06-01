import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  icon: Icon,
  placeholder = "Search...",
  value,
  onChange,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
      )}
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn("pl-10", className)}
        {...props}
      />
    </div>
  );
}
