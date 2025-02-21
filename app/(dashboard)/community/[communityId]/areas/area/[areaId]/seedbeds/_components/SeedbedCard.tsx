// components/GridAreaCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridSeedbedCardProps } from "./grid-seedbeds";

export const SeedbedCard = ({
  name,
  onClick,
}: GridSeedbedCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">1 tarefa pendente</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-[#95C11F] hover:bg-[#86AD1B]"
          onClick={onClick}
        >
          Visualizar Cultivos
        </Button>
      </CardFooter>
    </Card>
  );
};