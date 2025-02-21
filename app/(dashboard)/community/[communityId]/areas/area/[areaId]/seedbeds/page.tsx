import { Input } from "@/components/ui/input";
import AddSeedbedButton from "./_components/add-seedbed-button";
import GridSeedbeds from "./_components/grid-seedbeds";
import { Search, Volume2 } from "lucide-react";

const Seedbeds = async ({ params }: { params: { areaId: number } }) => {
  return (
    <div className="container mx-auto h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center py-6 bg-background">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Canteiros</h1>
          <Volume2 className="text-primary" size={32} />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Pesquise por Canteiros..."
            />
          </div>
          <AddSeedbedButton />
        </div>
      </div>

      <GridSeedbeds params={params} />
    </div>
  );
};

export default Seedbeds;
