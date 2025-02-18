import { Input } from "@/components/ui/input";
import AddAreaButton from "./area/_components/add-area-button";
import GridAreas from "./area/_components/grid-areas";
import { Search, Volume2 } from "lucide-react";

const Areas = async ({ params }: { params: { communityId: string } }) => {
  return (
    <div className="container mx-auto h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center py-6 bg-background">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Áreas de Plantio</h1>
          <Volume2 className="text-primary" size={32} />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Pesquise por Áreas de Plantio..."
            />
          </div>
          <AddAreaButton />
        </div>
      </div>

      <GridAreas params={params} />
    </div>
  );
};

export default Areas;
