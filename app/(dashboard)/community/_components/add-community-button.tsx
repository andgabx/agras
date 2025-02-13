"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CreateCommunityForm } from "./form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const AddCommunityButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-lg items-center">
          <PlusIcon className="w-6 h-6 mr-2" />
          Criar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary font-bold">
          Criar Comunidade
        </DialogTitle>
        <CreateCommunityForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCommunityButton;
