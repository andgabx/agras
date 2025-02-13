import { Suspense } from "react";
import CommunityList from "./_components/community-list";
import AddCommunityButton from "./_components/add-community-button";
import { BentoGridDemo } from "./_components/grid-community";
// Componente para exibir a lista de comunidades

// Página principal
export default function CommunityPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center py-6 bg-background">
        <h1 className="text-2xl font-bold">Minhas Comunidades</h1>
        <AddCommunityButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <BentoGridDemo />
      </div>
    </div>
  );
}
