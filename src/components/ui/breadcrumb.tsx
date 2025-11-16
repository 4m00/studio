"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BreadcrumbProps = React.ComponentProps<"nav"> & {
  separator?: React.ReactNode;
  items: {
    label: React.ReactNode;
    href?: string;
  }[];
};

export function Breadcrumb({
  className,
  items,
  separator = <ChevronRight className="h-4 w-4" />,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span role="presentation">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
