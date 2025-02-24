"use client"

import { BentoGridItem } from "@/components/ui/bento-grid";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const SeedbedBentoItem = ({ seedbed, ...props }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const communityId = pathname.split("/")[2];
  const communityIdNumber = communityId ? Number(communityId) : null;

  const areaId = pathname.split("/")[5];
  const areaIdNumber = areaId ? Number(areaId) : null;

  const handleClick = () => {
      router.push(`/community/${communityIdNumber}/areas/area/${areaIdNumber}/seedbeds/seedbed/${seedbed.id}`);
      toast.success(`Entrou na área ${seedbed.name}`);
  };

  return (
    <BentoGridItem
      {...props}
      buttonClassName="-mt-5"
      title={seedbed.name}
      button_word="Visualizar Cultivos"
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
