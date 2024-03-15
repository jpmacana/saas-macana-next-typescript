import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { CheckCircle2 } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { StripeSubscriptionCreationButton } from "@/app/components/SubmitButtons";

const featureItems = [
  { name: "Lorem ipsum" },
  { name: "Lorem ipsum" },
  { name: "Lorem ipsum" },
  { name: "Lorem ipsum" },
  { name: "Lorem ipsum" },
  { name: "Lorem ipsum" },
];

async function getData(userId: string) {
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

    return redirect(subscriptionUrl);
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
            $30{" "}
            <span className="ml-1 text-2xl text-muted-foreground">/ mes</span>
          </div>
          <p className="mt-5 text-muted-foreground text-sm">
            Escribe tantas notas como quieras por
            <span className="ml-1 text-sm text-primary"> $30 /mes</span>
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
