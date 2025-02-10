"use client";

import { createInstrument } from "@/app/instruments/_actions/create-instrument";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function InstrumentForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <h2>Adicionar Instrumento</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        action={async (formData) => {
          try {
            await createInstrument(formData);
            alert("Instrumento cadastrado com sucesso!");
            
          } catch (err: any) {
            setError(err.message);
          }
        }}
      >
        <Label htmlFor="name">Nome do Instrumento</Label>
        <Input
          type="text"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 t..."
          name="name"
          placeholder="Nome do Instrumento"
          
        />

        <Label htmlFor="strings">Quantidade de Cordas</Label>
        <Input
          type="number"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 t..."
          name="strings"
          placeholder="Quantidade de Cordas"
          
        />

        <SubmitButton pendingText="Salvando...">Adicionar</SubmitButton>
      </form>
    </div>
  );
}
