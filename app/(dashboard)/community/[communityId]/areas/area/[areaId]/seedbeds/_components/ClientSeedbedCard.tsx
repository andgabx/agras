"use client"

import { GridSeedbedCardProps } from "./grid-seedbeds"
import { usePathname, useRouter } from "next/navigation";
import { SeedbedCard } from "./SeedbedCard";
import { toast } from "sonner";

const ClientSeedbedCard = ({seedbeds, ...props}: GridSeedbedCardProps & { seedbeds: any}) => {
    const router = useRouter();
    const pathname = usePathname();

    const communityId = pathname.split("/")[2];
    const communityIdNumber = communityId ? Number(communityId) : null;

    const areaId = pathname.split("/")[5];
    const areaIdNumber = areaId ? Number(areaId) : null;

    const isSeedbedCommunity = seedbeds?.community_id == communityIdNumber;
    const handleClick = async () => { 
        if (isSeedbedCommunity) {
            router.push(`/community/${communityId}/areas/area/${areaIdNumber}/seedbeds/seedbed/${seedbeds.id}`);
            toast.success(`Entrou no canteiro ${seedbeds.name}`);
        } else {
            router.push(`#`);
            toast.error(`Você não tem acesso a este canteiro`);    
        }
    }

    return <SeedbedCard {...props} onClick={handleClick}/>
}

export default ClientSeedbedCard