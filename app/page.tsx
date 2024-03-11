import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]	">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="w-auto px-6 py-3 rounded-full bg-secondary">
            <span className="text-sm font-medium text-center">
              Ordena tus notas facilmente
            </span>
          </span>
          <h1 className="mt-8 text-5xl font-bold md:text-7xl leading-tight tracking-tight">
            Crea notas facilmente
          </h1>
          <p className="mt-12 text-base font-serif tracking-tight text-foreground sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            itaque explicabo deleniti veritatis iste eius ut quisquam vero!
            Labore, vitae. Placeat harum obcaecati officiis tempora fuga ad
            sequi exercitationem autem.
          </p>
          <div className="flex justify-center max-w-xs mx-auto mt-12">
            <RegisterLink>
              <Button size={"lg"} className="w-full">
                Registrate gratis!
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
