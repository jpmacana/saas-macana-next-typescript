"use client";
import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Espere por favor!
        </Button>
      ) : (
        <Button
          className="w-fit rounded-lg"
          type="submit"
     
        
        >
          Guardar
        </Button>
      )}
    </>
  );
}
