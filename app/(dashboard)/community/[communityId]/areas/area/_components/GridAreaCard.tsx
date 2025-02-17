// components/GridAreaCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridAreaCardProps } from "./grid-areas";

export const GridAreaCard = ({
  name,
  description,
  onClick,
}: GridAreaCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">2 tarefas pendentes</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-[#95C11F] hover:bg-[#86AD1B]"
          onClick={onClick}
        >
          Visualizar Canteiros
        </Button>
      </CardFooter>
    </Card>
  );
};