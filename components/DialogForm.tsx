"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import FormInput from "./FormInput";

export default function DialogForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Guide</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Guide</DialogTitle>
          <DialogDescription>
            Create a new guide for this project. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <FormInput projectId={projectId} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
