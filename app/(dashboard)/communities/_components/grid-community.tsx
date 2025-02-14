import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconUsers } from "@tabler/icons-react";
import { getCommunities } from "../_actions/get-communities";
import { ClientBentoItem } from "./ClientBentoItem";

const Placeholderteste = () => (
  <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-primary"></div>
);

export async function BentoGridDemo() {
  const communities = await getCommunities();

  return (
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
  );
}