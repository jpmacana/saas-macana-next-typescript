import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

async function getData(userId: string) {

const data = await prisma.user.findUnique({
  where: {
    id: userId
  },
  select: {
    name: true,
    email: true,
    colorSchema:true,
  }
  })

  return data;
}

export default async function SettingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function postData(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const colorScheme = formData.get("color") as string;

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
        colorSchema: colorScheme ?? undefined,
      },
    });

    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Ajustes</h1>
          <p className="text-lg text-muted-foreground">Tu configuracion</p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>Informacion General</CardTitle>
            <CardDescription>
              Por favor agrega tus datos personales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Nombre</Label>
                <Input
                  placeholder="Escribi tu nombre..."
                  name="name"
                  id="name"
                  type="text"
                  defaultValue={data?.name ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  placeholder="Escribi tu email..."
                  name="email"
                  id="email"
                  type="email"
                  defaultValue={data?.email as string}
                  disabled
                />
              </div>

              <div className="space-y-1">
                <Label>Panel de Colores</Label>
                <Select name="color" defaultValue={data?.colorSchema}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Elegi un color para tu panel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Color</SelectLabel>
                      <SelectItem value="theme-green">Verde</SelectItem>
                      <SelectItem value="theme-blue">Azul</SelectItem>
                      <SelectItem value="theme-violet">Violeta</SelectItem>
                      <SelectItem value="theme-yellow">Amarillo</SelectItem>
                      <SelectItem value="theme-orange">Naranja</SelectItem>
                      <SelectItem value="theme-red">Rojo</SelectItem>
                      <SelectItem value="theme-rose">Rosado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton/>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
