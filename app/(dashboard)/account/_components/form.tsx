import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Link } from "lucide-react";
import { Pencil } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import updateAccount from "../_actions/update-account";
import { SubmitButton } from "@/components/submit-button";

const Form = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
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
                className="absolute bottom-4 right-4 bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Avatar */}
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  {user?.user_metadata?.full_name?.charAt(0)}
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full absolute -bottom-1 -right-1 bg-white"
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
                <Input
                  id="fullName"
                  name="full_name"
                  defaultValue={user?.user_metadata?.full_name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário*</Label>
                <Input
                  id="username"
                  name="username"
                  defaultValue={user?.user_metadata?.username}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  defaultValue={user?.email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={user?.user_metadata?.phone}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 pt-4">
                <Button variant="outline">Cancelar</Button>
                <SubmitButton
                  formAction={updateAccount}
                  className="bg-primary hover:bg-primary/90"
                >
                  Salvar
                </SubmitButton>
                <Button variant="outline">
                  <a href="/protected/reset-password">Mudar senha</a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Form;
