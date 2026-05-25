"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
}

export function PageHeader({ title, subtitle, showBack = true, rightContent }: PageHeaderProps) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 px-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0 hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
        )}
        
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold truncate text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>

        {rightContent && (
          <div className="shrink-0">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}
