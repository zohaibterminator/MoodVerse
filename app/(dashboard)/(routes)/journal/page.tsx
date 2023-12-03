"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { json } from "stream/consumers";

const formSchema = z.object({
  entry: z.string().min(1, {
    message: "Journal Entry is required",
  }),
});

const JournalPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [expanded, setExpanded] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        console.log("in page try");
        console.log(values);
        const jsonValues = JSON.stringify(values);
        console.log(jsonValues);
        // Make the axios POST request with JSON values
        const response = await axios.post("/api/journal", jsonValues);
      console.log("in page try 2");
      router.push(`/journal/${response.data.id}`);
      toast.success("Success");
    } catch {
        console.log("in page catch");
      toast.error("something went wrong");
    }
  };
  return (
    <div className="mx-auto p-6">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-purple-700">
          Write a Journal
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Entry</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Write about how you are feeling, what you did today, what you are planning to do, etc."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="mt-8">
        <h1 className="text-2xl my-6 font-semibold text-purple-700">
          Your Journal Entries
        </h1>
        <Card className="mt-3 w-80" onClick={() => setExpanded(!expanded)}>
          <CardHeader>
            <CardTitle>16 November 2023</CardTitle>
            {expanded && (
              <CardDescription>
                Today was a beautiful day filled with moments of joy and
                reflection. The morning sun painted the sky in hues of pink and
                orange, creating a serene atmosphere. In the afternoon, I spent
                some quiet time at the park, surrounded by the rustling leaves
                and the soothing sound of birdsong. Nature has a way of calming
                the mind, and today, it was a welcome escape. Later, I treated
                myself to a cup of hot coffee at my favorite cafe. The aroma of
                freshly brewed coffee and the cozy ambiance made it the perfect
                spot to unwind and reflect on the day. In the evening, I caught
                up with a good friend over a video call. It's amazing how
                technology can bridge the distance and bring people together,
                even when miles apart. As the day comes to a close, I'm filled
                with gratitude for the simple joys and meaningful connections
                that made today special. Looking forward to more moments like
                these.
              </CardDescription>
            )}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default JournalPage;
