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
  button_word?: string;
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
        "grid md:auto-rows-[23rem] grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4",
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
  button_word,
  onClick,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 relative group/bento hover:shadow-2xl transition-all duration-300 ease-in-out",
        "rounded-2xl border border-white/10 bg-gradient-to-b from-[#f0f0f0] to-[#fafafa]",
        "dark:from-[#1a1a1a] dark:to-[#2d2d2d] dark:hover:shadow-black/40",
        "hover:scale-[1.02] transform-gpu overflow-hidden shadow-sm",
        className
      )}
    >
      <div className="" />

      <div className="h-full flex flex-col">
        <div className="">
          {header}
        </div>

        <div className="p-5 pt-6 flex flex-col flex-1 gap-2 mb-8">
          <div className="space-y-0.5">
            <p className="text-[10px] text-neutral-500 -mt-3 dark:text-neutral-400 uppercase tracking-wide font-medium">
              Comunidade Criada Por
            </p>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              {creator_name}
            </p>
          </div>

          <h3 className="font-bold text-xl text-neutral-900 dark:text-neutral-100 text-center mb-1 mt-2">
            {title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed text-center mb-4 flex-1">
            {description}
          </p>

          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wide font-medium">
            <span className="flex items-center">
              {city}, {state}
            </span>
          </div>

          <Button 
            onClick={onClick ?? (() => {})} 
            className="mt-auto w-full"
          >
            {button_word}
          </Button>
        </div>
      </div>
    </div>
  );
};