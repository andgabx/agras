import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Info, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const LeaveCommunity = ({ community }: { community: any }) => {
  return (
    <Card className="border-destructive/20 w-full">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" />
          Informações da Comunidade
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Data de Criação
          </h3>
          <p className="text-foreground font-medium">
            {format(new Date(community.created_at), "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
          <p className="text-sm text-muted-foreground">
            Desde então, temos crescido juntos compartilhando conhecimento e
            experiências valiosas.
          </p>
        </div>

        <div className="space-y-6 pt-8 border-t">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                Ao sair da comunidade, você perderá acesso aos conteúdos
                exclusivos e não poderá participar das discussões.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="w-full gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  Sair da Comunidade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-destructive flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Confirmar Saída
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-foreground">
                    Você está prestes a sair da comunidade{" "}
                    <span className="font-semibold text-destructive">
                      {community.name}
                    </span>.
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">
                      Você poderá solicitar entrada novamente no futuro, mas o
                      acesso anterior será perdido.
                    </p>
                  </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button 
                    variant="destructive"
                    className="w-full gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Confirmar Saída
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveCommunity;