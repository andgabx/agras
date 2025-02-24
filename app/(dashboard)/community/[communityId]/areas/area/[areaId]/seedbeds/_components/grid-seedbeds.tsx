import { ScrollShadow } from "@heroui/scroll-shadow";
import { getSeedbeds } from "../_actions/get-seedbeds";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SeedbedBentoItem } from "./seedbed-bento-item";

export interface GridSeedbedCardProps {
  name: string;
  onClick?: () => void;
}

const GridSeedbeds = async ({ params }: { params: { areaId: number } }) => {
  const seedbeds = await getSeedbeds(Number(params.areaId));
  return (
    <div className="flex-1">
      <div className="flex-1">
        <ScrollShadow size={30} className="h-[calc(100vh-220px)]">
          {seedbeds.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Image
                src="/no-community-image.png"
                alt="Logo"
                width={300}
                height={300}
              />
              <h3 className="text-xl font-semibold mb-2">
                Não há canteiros criados
              </h3>
              <h4 className="text-center text-sm text-muted-foreground">
                Clique no botão acima no lado direito para criar um novo
                canteiro e comece a registrar seus cultivos.
              </h4>
            </div>
          ) : (
            <BentoGrid className="mx-auto p-4">
              {seedbeds.map((seedbed) => (
                <SeedbedBentoItem
                  key={seedbed.id}
                  seedbed={seedbed}
                />
              ))}
            </BentoGrid>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default GridSeedbeds;
