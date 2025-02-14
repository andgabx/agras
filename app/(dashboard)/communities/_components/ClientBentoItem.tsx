"use client"

import { BentoGridItem, BentoGridItemProps } from "@/components/ui/bento-grid";
import { joinCommunity } from "../_actions/join-community";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function ClientBentoItem({ community, ...props }: BentoGridItemProps & { 
  community: any 
}) {
  const router = useRouter();

    const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const getUser = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };
  
      getUser();
    }, []);

  const isMember = community?.members.some((member: { id: string }) => member.id === user?.id);

  const handleClick = async () => {
    const result = await joinCommunity(community.id);
    console.log(isMember)
    if (result.error === "Você já é membro") {
      router.push(`community/${community.id}/dashboard/`)
    }
    else if (result.error) {
      toast.error(result.error);
    } 
    else if (result.success) {
      toast.success(result.success);
      router.push(`community/${community.id}/dashboard/`)
    }
  };

  return <BentoGridItem {...props} button_word={isMember ? "Entrar" : "Solicitar Acesso"} onClick={handleClick} />;
}