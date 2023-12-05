"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
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

const formSchema = z.object({
  journal_text: z.string().min(1, {
    message: "Journal journal_text is required",
  }),
});


function JournalPage(){
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      journal_text: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const [expanded, setExpanded] = useState(false);
  type JournalEntry = {
    id: string;
    journal_text: string;
    time: string;
    // Other properties...
  };
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const res = await axios.get("/api/journal");
        setJournalEntries(res.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const response = await axios.post("/api/journal", values);
        setJournalEntries((prevEntries) => [response.data, ...prevEntries]);
      router.push(`/journal`);
      toast.success("Success");
    } catch {
      toast.error("Something went wrong");
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
              name="journal_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal journal_text</FormLabel>
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
        <div className="flex flex-wrap -mx-4">
          {journalEntries.map((entry) => (
            <div key={entry.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4">
              <Card
                className="w-full"
                onClick={() => setExpanded(!expanded)}
              >
                <CardHeader>
                  <CardTitle>{new Date(entry.time).toLocaleDateString()}</CardTitle>
                  {expanded && (
                    <CardDescription>
                      {/* Display the journal text */}
                      {entry.journal_text}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
