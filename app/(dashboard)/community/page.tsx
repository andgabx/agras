import { Suspense } from "react";
import { CreateCommunityForm } from "./_components/form";
import { getCommunities } from "./_actions/get-communities";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Componente para exibir a lista de comunidades
async function CommunitiesList() {
  const communities = await getCommunities();

  return (
    <div className="space-y-4 mt-6">
      {communities.map((community) => (
        <Card key={community.id}>
          <CardHeader>
            <CardTitle>{community.name}</CardTitle>
            <CardDescription>
              Membros: {community.members_count}
              <br />
              Criado em: {new Date(community.created_at).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

// Página principal
export default function CommunityPage() {
  return (
    <div className="container mx-auto py-10">
      <CreateCommunityForm />
      <Suspense fallback={<div>Carregando comunidades...</div>}>
        <CommunitiesList />
      </Suspense>
    </div>
  );
}
