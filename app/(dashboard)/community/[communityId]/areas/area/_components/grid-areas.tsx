// app/(dashboard)/community/[communityId]/areas/grid-areas.tsx
import { Button } from "@/components/ui/button";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { getAreas } from "../_actions/get-areas";
import Image from "next/image";
import { ClientAreaCard } from "./ClientAreaCard";

export interface GridAreaCardProps {
  name?: string;
  description?: string;
  onClick?: () => void;
}

const GridAreas = async ({ params }: { params: { communityId: string } }) => {
  const areas = await getAreas(Number(params.communityId));

  return (
    <div className="flex-1">
      <div className="flex-1">
        <ScrollShadow size={30} className="h-[calc(100vh-220px)]">
          {areas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Image src="/no-areas.png" alt="Logo" width={300} height={300} />
              <h3 className="text-xl font-semibold mb-2">
                Não há Áreas de Plantio criadas
              </h3>
              <h4 className="text-center text-sm text-muted-foreground">
                Clique no botão acima para criar uma nova área de plantio e
                comece a registrar seus canteiros e cultivos.
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 p-4">
              {areas.map((area) => (
                <ClientAreaCard
                  key={area.id}
                  areas={area}
                  name={area.name}
                  description={area.description}
                />
              ))}
            </div>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default GridAreas;