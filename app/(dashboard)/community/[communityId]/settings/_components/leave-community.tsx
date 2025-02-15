import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const LeaveCommunity = ({ community }: { community: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data de Criação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600">
          A comunidade foi criada em{" "}
          {format(new Date(community.created_at), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
          . Desde então, temos crescido juntos, compartilhando conhecimento e
          experiências valiosas.
        </p>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-gray-500">
            Sentimos muito em vê-lo partir! Se você realmente deseja sair da
            comunidade, clique no botão abaixo. Tenha certeza de que pode voltar
            a qualquer momento, caso queira se reconectar.
          </p>
          <p className="text-sm text-gray-500">
            A saída da comunidade não afetará seu acesso a outros conteúdos ou
            serviços da plataforma.
          </p>
          <div className="flex justify-end">
            <Button
              variant="destructive"
            >
              Sair da Comunidade</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveCommunity;
