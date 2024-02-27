import {
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import * as NotesApi from "../api/notes-api";
import { Note } from "@/models/note";

interface FormProps {
  onFormSubmit: (note: Note) => void;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  text: z.string().max(1000),
});

const AddNoteForm = ({ onFormSubmit }: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const noteResponse = await NotesApi.createNote(values);
      onFormSubmit(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Note</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    required={true}
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <DialogClose asChild>
            <Button
              disabled={!form.formState.isValid}
              type="submit">
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddNoteForm;
