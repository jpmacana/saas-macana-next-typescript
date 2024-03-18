import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { CheckCircle2 } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession,stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { StripePortal, StripeSubscriptionCreationButton } from "@/app/components/SubmitButtons";
import {unstable_noStore as noStore} from 'next/cache'

const featureItems = [
  { name: "Acceso global: Los clientes pueden acceder al sistema desde cualquier lugar." },
  { name: "Escalabilidad instantánea: Los clientes pueden aumentar o reducir recursos según sus necesidades sin interrupciones." },
  { name: "Actualizaciones automáticas: El proveedor se encarga de mantener y actualizar el software." },
  { name: "Mantenimiento simplificado: Elimina la necesidad de gestionar infraestructura loca" },
  { name: "Modelo de precios flexible: Los clientes pagan una tarifa regular por el uso del software" },
  { name: "Acceso a la documentación: Los clientes pueden acceder a la documentación de la aplicación" },
];


async function getData(userId: string) {
  noStore();
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });
  return data;
}


export default async function BillingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  async function createSubscription() {
    "use server";

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id as string,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!dbUser?.stripeCustomerId) {
      throw new Error("No hay un usuario activo");
    }
    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionUrl);}

    async function createCustomerPortal() {
      "use server";
      const session = await stripe.billingPortal.sessions.create({
        customer: data?.user.stripeCustomerId as string,
        return_url:'http://localhost:3000/dashboard'
      });
         return redirect(session.url);
    }

if (data?.status === 'active') {
  return (

    <div className="grid items-start gap-8">
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-3xl md:text-4xl ">Subscripcion</h1>
        <p className="text-lg text-muted-foreground">
          Ajustes de su facturacion
        </p>
      </div>
    </div>
    <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Editar Subscripcion</CardTitle>
            <CardDescription>
            Haga clic en el botón de abajo, esto le dará la oportunidad de
              cambie sus datos de pago y vea su estado de cuenta al mismo tiempo
              tiempo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form >
              <StripePortal />
            </form>
          </CardContent>
        </Card>
    </div>
);

  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex items-center gap-2 px-4 py-1 text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Mensualidad
            </h3>
          </div>

          <div className=" mt-4 items-baseline text-6xl font-extrabold flex">
            $5{" "}
            <span className="ml-1 text-2xl text-muted-foreground">/ mes</span>
          </div>
          <p className="mt-5 text-muted-foreground text-sm">
            Escribe tantas notas como quieras por
            <span className="ml-1 text-sm text-primary"> $5 /mes</span>
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4 flex flex-col items-start justify-start">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>
          <form className="w-full" action={createSubscription}>
            <StripeSubscriptionCreationButton/>
          </form>
        </div>
      </Card>
    </div>
  );
}
