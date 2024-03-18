import { SubmitButton } from "@/app/components/SubmitButtons";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import {unstable_noStore as noStore} from 'next/cache'


export default async function NewNoteRoute() {
    noStore();
    const { getUser } = getKindeServerSession();
  const user = await getUser();


    async function postData(formData: FormData) {
        "use server";
    
        if (!user) {
          throw new Error("Not authorized");
        }
    
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
    
        await prisma.note.create({
          data: {
            userId: user?.id,
            description: description,
            title: title,
          },
        });
    
        return redirect("/dashboard");
      }
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Note</CardTitle>
          <CardDescription>
            Aca es donde podes crear tus notas 😁
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Titulo</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Titulo de la nota..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Descripcion</Label>
            <Textarea
              name="description"
              placeholder="Escribi lo que vos quieras..."
              required
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive">
            <Link href="/dashboard">Cancelar</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
