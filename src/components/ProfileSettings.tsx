"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  bio: z.string().optional(),
  urls: z.array(z.string().url()).optional(),
})

const InputForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      urls: ["", ""],
    },
  })

  function onSubmit() {
    alert("Success: " );
  }

  return (
    <div className="w-90 p-6 rounded-lg shadow-md">
      <Form {...form}>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white">Profile</h3>
          <p className="text-sm ">This is how others will see you on the site.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input className=" text-white " placeholder="Enter Name" {...field} />
                </FormControl>
                <FormDescription >This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input className="text-white " placeholder="Your Email" {...field} />
                </FormControl>
                <FormDescription >Your Email will be used to send new updates.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Bio</FormLabel>
                <FormControl>
                  <Input className=" text-white " placeholder="Enter your Bio" {...field} />
                </FormControl>
                <FormDescription >You can write something about yourself you want to show others.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urls"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">URLs</FormLabel>
                <FormDescription >Enter URLs to your social media profiles, websites, etc.</FormDescription>
                
                  <FormControl >
                    <Input className=" text-white " placeholder="Enter URL" {...field} />
                  </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default InputForm;
