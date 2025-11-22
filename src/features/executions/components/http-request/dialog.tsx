'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  endpoint: z.url({ message: "Please put a valid url" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
});

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultEndpoint?: string;
  defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  defaultBody?: string;
}


const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"]

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultBody,
  defaultEndpoint,
  defaultMethod,
}: DialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    },
  });
  const formWatch = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(formWatch);
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
    form.reset();
  };

  useEffect(() => {
    if(open) {
      form.reset({
        endpoint: defaultEndpoint,
        method: defaultMethod,
        body: defaultBody
      })
    } 
  }, [open, defaultBody, defaultEndpoint, defaultMethod, form]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Http Request Dialog</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request node.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a method:"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {METHODS.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The method to use for the request.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                 <FormControl>
                  <Input {...field} placeholder="https://api.example.com/users/2434" className="w-full" />
                 </FormControl>
                  <FormDescription>
                    The endpoint URL for the request.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            {showBodyField && (
              <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Body</FormLabel>
                 <FormControl>
                  <Textarea {...field} placeholder="{{body_data}}" className="w-full min-h-[120px] font-mono text-xs" />
                 </FormControl>
                  <FormDescription>
                    The body for the request.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
            )}
            <DialogFooter className="w-full flex justify-center mt-4">
              <Button type="submit" className="w-full">Send</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
