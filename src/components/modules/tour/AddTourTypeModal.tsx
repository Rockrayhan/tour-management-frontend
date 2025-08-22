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
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { toast } from "sonner";

export function AddTourTypeModal() {
  const [addTourType] = useAddTourTypeMutation();
  const form = useForm();

  const onSubmit = async (data: any) => {
    const res = await addTourType({ name: data.name }).unwrap();
    if( res.success ) {
        toast.success("Tour Type Added") ;
        document.getElementById('close-addTourType-modal')?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Tour Type</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Add Tour Type </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="add-tour-type"
          >
            {/* email */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button id="close-addTourType-modal" variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="add-tour-type" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
