import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { Pencil } from "lucide-react";

const Form = () => {
  return (
    <div>
      <Card className=" mx-auto">
        {/* Banner and Avatar Section */}
        <div className="relative">
          <div className="h-48 overflow-hidden rounded-t-lg">
            <img
              src="https://s3-alpha-sig.figma.com/img/5726/6653/8f5e91def2ce12f0c428eb4842fbc29b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gKo-8pL0pm8PZOEyrbmayfSHWvejntjByfoT7hu1dYe0Uq8gV283RI1xQoajaycN0Exec~7HtXTIvSdkYLRjm7hh7AZOFSiAwOhrWwxJTHL7ENd~LOfTGFx4lGQGzOrdki6b4gIREPFyzvzASFpxeghMTI3BlCOpwK7TnZzmFzHHBjAMJy-Hx07IdalQZxhhxHSe0uWJRlBc6Y5W3YGYnLDuk6GophiUnUsxZxMCEn~LRu1i6tsuufVyGlQ3ZLH0sVzrpKpUhhHMjDx88vOM3oU1P9PisVarQCgmDg-RdZKmub1RVgqr0N~bBtgT~VOxyvKAPrbXOhvzL5V7jmy5mw__"
              alt="Profile banner"
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4 bg-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                MJ
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardHeader className="pt-16 pb-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Pencil className="h-5 w-5" />
            Editar perfil
          </div>
          <p className="text-sm text-muted-foreground">
            Carregue sua foto e edite suas informações pessoais
          </p>
        </CardHeader>

        <CardContent>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo*</Label>
              <Input id="fullName" defaultValue="Maria José" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário*</Label>
              <Input id="username" defaultValue="mariajose123" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                defaultValue="mariajose@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue="+ 55 (81) 97340-6840" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado*</Label>
              <Input id="state" defaultValue="Pernambuco" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade*</Label>
              <Input id="city" defaultValue="Carpina" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input id="newPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-primary hover:bg-primary/90">Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
