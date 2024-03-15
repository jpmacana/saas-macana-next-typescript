import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
             Pago Exitoso 😁
            </h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
              Felicitaciones por su suscripción, revise su correo electrónico para
                más instrucciones. 😊
              </p>
            </div>

            <div className="mt-5 sm:mt-6 w-full">
              <Button className="w-full" asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}