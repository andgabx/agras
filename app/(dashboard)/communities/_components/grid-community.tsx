import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getCommunities } from "../_actions/get-communities";
import { ClientBentoItem } from "./ClientBentoItem";
import Image from "next/image";

const Placeholderteste = () => (
  <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-primary"></div>
);

export async function BentoGridDemo() {
  const communities = await getCommunities();

  return (
    <>
      {communities.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center space-y-8">
          <Image src="/no-community-image.png" alt="Logo" width={300} height={300} />
          <h3 className="text-xl font-semibold mb-2">
            Nenhuma comunidade encontrada
          </h3>
          <p className="text-muted-foreground">
            Clique no botão acima para criar uma nova comunidade
          </p>
        </div>
      ) : (
        <BentoGrid className="mx-auto mt-8">
          {communities.map((community) => (
            <ClientBentoItem
              community={community}
              key={community.id}
              title={community.name}
              creator_name={community.creator_name}
              description={community.description || "Sem descrição"}
              city={community?.city || "Sem cidade"}
              state={community?.state || "Sem estado"}
              header={<Placeholderteste />}
              className="relative"
            />
          ))}
        </BentoGrid>
      )}
    </>
  );
}
