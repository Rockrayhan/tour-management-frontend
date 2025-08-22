import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateTourTypeMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface updateTourTypeProps {
  id: string;
  currentName: string;
}

export function UpdateTourTypeModal({ id, currentName }: updateTourTypeProps) {
  const [updateTourType] = useUpdateTourTypeMutation();
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: currentName,
    },
  });

  // Reset form values whenever the modal opens or currentName changes
  useEffect(() => {
    if (isOpen) {
      form.reset({ name: currentName });
    }
  }, [currentName, form, isOpen]);

  const onSubmit = async (data: any) => {
    try {
      const res = await updateTourType({ id, name: data.name }).unwrap();
      if (res.success) {
        toast.success("Tour Type Updated");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update tour type");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500">
          <Pencil size={16} /> 
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Tour Type</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id={`update-tour-type-${id}`}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter tour type name"
                      value={field.value || currentName}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the updated name for this tour type.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="submit" 
            form={`update-tour-type-${id}`}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}