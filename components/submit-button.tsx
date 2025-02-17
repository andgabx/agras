"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Carregando...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      <div className="flex flex-row items-center">{pending ? <p className="flex flex-row items-center mr-2"><LoaderCircle className="w-4 h-4 animate-spin mr-2" /> {pendingText}</p> : children}</div>
    </Button>
  );
}
