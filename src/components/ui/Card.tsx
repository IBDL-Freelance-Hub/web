import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  interactive?: boolean;
}

export function Card({
  as: Component = "div",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 ease-out sm:p-8",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:transform-none",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-slate-100 pb-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  as: Component = "h3",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }) {
  return (
    <Component
      className={cn("text-base font-bold text-slate-900", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-slate-500", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 border-t border-slate-100 pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
