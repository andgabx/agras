import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconUsers } from "@tabler/icons-react";
import { getCommunities } from "../_actions/get-communities";

const Placeholderteste = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export async function BentoGridDemo() {
  const communities = await getCommunities();

  return (
    <BentoGrid className=" mx-auto mt-8">
      {communities.map((community, index) => (
        <BentoGridItem
          key={community.id}
          title={community.name}
          description={community.description || "Sem descrição"}
          city={community?.city || "Sem cidade"}
          state={community?.state || "Sem estado"}
          header={<Placeholderteste />}
          icon={<IconUsers className="h-4 w-4 text-neutral-500" />}
          className="relative"
        />
        ))}
    </BentoGrid>
  );
}
