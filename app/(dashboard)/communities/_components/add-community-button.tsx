"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateCommunityForm } from "./form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const AddCommunityButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-lg gap-2 px-6 py-5">
          <PlusIcon className="w-5 h-5" />
          Criar Comunidade
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto sm:w-full">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Criar Nova Comunidade
          </h2>
          <CreateCommunityForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCommunityButton;