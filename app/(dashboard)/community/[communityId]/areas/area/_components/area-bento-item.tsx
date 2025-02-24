"use client"

import { BentoGridItem } from "@/components/ui/bento-grid";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const AreaBentoItem = ({ area, ...props }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const communityId = pathname.split("/")[2];
  const isAreaCommunity = area?.community_id === Number(communityId);

  const handleClick = () => {
    if (isAreaCommunity) {
      router.push(`/community/${communityId}/areas/area/${area.id}/seedbeds`);
      toast.success(`Entrou na área ${area.name}`);
    } else {
      toast.error(`Você não tem acesso a esta área`);
    }
  };

  return (
    <BentoGridItem
      {...props}
      title={area.name}
      buttonClassName="-mt-5"
      description={area.description}
      button_word="Visualizar Canteiros"
      onClick={handleClick}
      header={
        <div className="w-full h-full min-h-[8rem] rounded-xl overflow-hidden">
          <div className="aspect-video bg-gray-300" />
        </div>
      }
    >
    </BentoGridItem>
  );
};
