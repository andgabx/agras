"use client"
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  city?: string;
  state?: string;
  creator_name?: string;
  onClick?: () => void;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  city,
  state,
  creator_name,
  header,
  onClick,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 relative group/bento hover:shadow-2xl transition-all duration-300 ease-in-out",
        "rounded-2xl border border-white/10 bg-gradient-to-b from-[#f0f0f0] to-[#fafafa]",
        "dark:from-[#1a1a1a] dark:to-[#2d2d2d] dark:hover:shadow-black/40",
        "hover:scale-[1.02] transform-gpu overflow-hidden",
        className
      )}
    >
      <div className="" />

      <div className="h-full flex flex-col">
        <div className="relative h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 backdrop-blur-sm">
          {header}
        </div>

        <div className="p-4 pt-8 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
              {creator_name}
            </span>
          </div>

          <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-2">
            {title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4 flex-1">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            <span className="flex items-center">
              📍 {city}, {state}
            </span>
          </div>

          <Button onClick={onClick ?? (() => {})}>Entrar</Button>
        </div>
      </div>
    </div>
  );
};
