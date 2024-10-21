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
  gpt: z.string().min(2, {
    message: "API Key must be at least 8 of length.",
  })
})

const GPTForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gpt: "",

    },
  })

  function onSubmit() {
    alert("Success: " );
  }

  return (
    <div className="w-90 p-6 rounded-lg shadow-md">
      <Form {...form}>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white">ChatGPT Settings</h3>
          <p className="text-sm ">Here you can integrate ChatGPT assistant through API KEYS.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="gpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">ChatGPT API Key</FormLabel>
                <FormControl>
                  <Input className=" text-white " placeholder="Enter API Key" {...field} />
                </FormControl>
                <FormDescription >This is personal to you .</FormDescription>
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

export default GPTForm;
