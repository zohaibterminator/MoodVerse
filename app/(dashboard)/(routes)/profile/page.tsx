"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@clerk/nextjs";
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

const formSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  date_of_birth: z.number().nullable(),
  profession: z.string().nullable(),
  gender: z.string().nullable(),
  phone_num: z.string().nullable(),
  });

function Profile() {
    const router = useRouter();
  
  type Profile = {
    id: string;
    first_name:string,
    last_name:string,
    email:string,
    date_of_birth:number,
    profession:string,
    gender:string,
    phone_num:string,
    // Other properties...
  };
  const [profile, setprofile] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setprofile(res.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchProfile();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profile ? profile[0] : undefined,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/profile", values);
      router.push(`/profile`);
      toast.success("Success");
    } catch {
      toast.error("Something went wrong");
    }
  };
  if (!profile || profile.length === 0) {
    return <div>Loading...</div>; // or display a message indicating no profile data
  }

  const user = profile[0];
  return( 
  <div className="p-6">
        <h1 className="text-purple-900 text-2xl font-medium my-3">Your Profile</h1>
        <div className="w-1/2 bg-white rounded-lg p-6">
            
            <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                  <Input {...field} placeholder="John" value={field.value || user.first_name} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ||user.last_name} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ||user.email} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                  <Input type="number" {...field} value={field.value ||user.date_of_birth} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ||user.profession} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ||user.gender} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_num"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                  <Input {...field} value={field.value ||user.phone_num} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" >
                Continue
              </Button>
            </div>
          </form>
        </Form>
            
        </div>
  </div>
  );
}
export default Profile;
