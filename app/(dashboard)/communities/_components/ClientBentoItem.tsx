"use client"

import { BentoGridItem, BentoGridItemProps } from "@/components/ui/bento-grid";
import { joinCommunity } from "../_actions/join-community";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ClientBentoItem({ community, ...props }: BentoGridItemProps & { 
  community: any 
}) {
  const router = useRouter();

  const handleClick = async () => {
    const result = await joinCommunity(community.id);

    if (result.error) {
      toast.error(result.error);
    } else if (result.success) {
      toast.success(result.success);

    }
  };

  return <BentoGridItem {...props} onClick={handleClick} />;
}