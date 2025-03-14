"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  country: z.string().min(1, {
    message: "Please select your country.",
  }),
  university: z.string().min(1, {
    message: "Please enter your university.",
  }),
  groupPreference: z.string().min(1, {
    message: "Please select your group preference.",
  }),
  hobbies: z.string().min(1, {
    message: "Please enter at least one hobby.",
  }),
});

export function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      university: "",
      groupPreference: "",
      hobbies: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which country are you from?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sg">Singapore</SelectItem>
                  <SelectItem value="my">Malaysia</SelectItem>
                  <SelectItem value="id">Indonesia</SelectItem>
                  <SelectItem value="th">Thailand</SelectItem>
                  <SelectItem value="vn">Vietnam</SelectItem>
                  <SelectItem value="ph">Philippines</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which university do you attend?</FormLabel>
              <FormControl>
                <Input placeholder="Enter your university" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What&apos;s your group preference?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="same-country">Same Country</SelectItem>
                  <SelectItem value="same-university">
                    Same University
                  </SelectItem>
                  <SelectItem value="mixed">Mixed Group</SelectItem>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your hobbies?</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your hobbies (comma-separated)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
}
