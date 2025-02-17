import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { getAreas } from "../_actions/get-areas";
import Image from "next/image";

const GridAreas = async ({ params }: { params: { communityId: string } }) => {
  const areas = await getAreas(Number(params.communityId));

  return (
    <div className="flex-1">
      <div className="flex-1">
        <ScrollShadow size={30} className="h-[calc(100vh-220px)]">
          {areas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Image src="/no-areas.png" alt="Logo" width={300} height={300} />
              <h3 className="text-xl font-semibold mb-2">
                Não há Áreas de Plantio criadas
              </h3>
              <h4 className="text-center text-sm text-muted-foreground">
                Clique no botão acima para criar uma nova área de plantio e
                comece a registrar seus canteiros e cultivos.
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6 p-4">
              {areas.map((area) => (
                <Card key={area.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-300"></div>
                  <CardHeader>
                    <CardTitle className="text-xl">{area.name}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-500">2 tarefas pendentes</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#95C11F] hover:bg-[#86AD1B]">
                      Visualizar Canteiros
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default GridAreas;
