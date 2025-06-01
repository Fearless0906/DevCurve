import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CurveCardProps } from "@/types";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CurveCard({
  id,
  thumbnail,
  title,
  description,
  views,
  react = false,
  className,
}: CurveCardProps) {
  return (
    <Link href={`/component/${id}`} className="block">
      <Card
        className={cn(
          "w-full max-w-sm rounded-2xl shadow-md transition hover:shadow-lg",
          className
        )}
      >
        <CardHeader className="p-0">
          <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
            <Image
              src={thumbnail ?? "/assets/images/placeholder.jpg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {react && <Heart className="w-5 h-5 text-pink-500" />}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{views.toLocaleString()} views</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
