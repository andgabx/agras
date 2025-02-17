
import AddCommunityButton from "./_components/add-community-button";
import { BentoGridDemo } from "./_components/grid-community";
import { ScrollShadow } from "@heroui/scroll-shadow";
// Componente para exibir a lista de comunidades

// Página principal
export default function CommunityPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center py-6 bg-background">
        <h1 className="text-2xl font-bold">Minhas Comunidades</h1>
        <AddCommunityButton />
      </div>
      <div className="flex-1">
        <ScrollShadow size={30} className="h-[calc(100vh-220px)]">
          <BentoGridDemo />
        </ScrollShadow>
      </div>
    </div>
  );
}
