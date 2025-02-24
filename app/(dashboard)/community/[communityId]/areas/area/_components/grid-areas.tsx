import { BentoGrid } from "@/components/ui/bento-grid";
import { getAreas } from "../_actions/get-areas";
import Image from "next/image";
import { AreaBentoItem } from "./area-bento-item";
import { ScrollShadow } from "@heroui/scroll-shadow";

const GridAreas = async ({ params }: { params: { communityId: string } }) => {
  const areas = await getAreas(Number(params.communityId));

  return (
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
          <BentoGrid className="mx-auto p-4">
            {areas.map((area) => (
              <AreaBentoItem 
                key={area.id}
                area={area}
              />
            ))}
          </BentoGrid>
        )}
      </ScrollShadow>
    </div>
  );
};

export default GridAreas;