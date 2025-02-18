"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GridAreaCardProps } from "./grid-areas";
import { createClient } from "@/utils/supabase/client";
import { GridAreaCard } from "./GridAreaCard";
import { toast } from "sonner";

export function ClientAreaCard({
  areas,
  ...props
}: GridAreaCardProps & { areas: any }) {
  const router = useRouter();
  const pathname = usePathname();

  const communityId = pathname.split("/")[2];
  const communityIdNumber = communityId ? Number(communityId) : null;

  
  const isAreaCommunity = areas?.community_id == communityIdNumber;
  const handleClick = async () => {
    if (isAreaCommunity) {
      router.push(`/community/${communityId}/areas/area/${areas.id}/seedbeds`);
      toast.success(`Entrou na área ${areas.name}`);
    } else {
      router.push(`#`);
      toast.error(`Você não tem acesso a esta área`);
    }
  };

  return <GridAreaCard {...props} onClick={handleClick} />;
}