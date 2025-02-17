import { Input } from "@/components/ui/input";
import { Search, Volume2 } from "lucide-react";
import AddSeedbedButton from "./_components/add-seedbed-button";
import { getSeedbeds } from "./_actions/get-seedbeds";

const Seedbeds = async ({ params }: { params: { areaId: number } }) => {
  const seedbeds = await getSeedbeds(params.areaId);
  return (
    <div className="">
      <AddSeedbedButton />
      {seedbeds.map((seedbed, index) => {
        return (
          <div key={index}>
            <h1>========================</h1>
            <h1 className="font-bold">NOME: <span className="font-normal">{seedbed.name}</span></h1>
            <h1 className="font-bold">AREA ID: <span className="font-normal">{seedbed.area_id}</span></h1>
            <h1 className="font-bold">COMUNIDADE ID: <span className="font-normal">{seedbed.community_id}</span></h1>
            <h1 className="font-bold">
              CRIADO EM: <span className="font-normal">{seedbed.created_at.split('T')[0]}</span>
            </h1>
            <h1 className="font-bold">
              ID DO CANTEIRO: <span className="font-normal">{seedbed.id}</span>
            </h1>
            <h1>========================</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Seedbeds;
