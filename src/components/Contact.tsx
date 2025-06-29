import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea";
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { useEffect } from "react";
import { Send } from 'lucide-react';

const formSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email({ message: 'Please enter a valid Email.' }),
    message: z.string().nonempty({ message: 'This Field Cannot be Empty.' }),
})

const Contact = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: '',
            message: '',
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [])


    return (
        <div className="max-w-7xl mx-auto py-3 px-2 text-zinc-400 mb-20" >

            <div className="flex flex-col sm:flex-row items-center justify-center gap-20" >

                <div className="flex flex-col gap-20 w-full" >
                    <div className="space-y-4" >
                        <h1 className="text-5xl font-bold" >Contact Us</h1>
                        <p className="text-xl" >Any question? We would be happy to help you!</p>
                    </div>

                    <div className="text-2xl space-y-6 cursor-pointer" >
                        <div className="flex flex-row items-center gap-3 p-3 rounded-md transition-transform duration-500 ease-in-out translate-x-0 hover:translate-x-2" >
                            <Phone /> <p>+0123456789</p>
                        </div>
                        <div className="flex flex-row items-center gap-3 p-3 rounded-md text-zinc-900 bg-zinc-400 transition-transform duration-500 ease-in-out translate-x-0 hover:translate-x-2" >
                            <Mail /> <p>example@email.com</p>
                        </div>
                        <div className="flex flex-row items-center gap-3 p-3 rounded-md transition-transform duration-500 ease-in-out translate-x-0 hover:translate-x-2">
                            <MapPin /> 775 Rolling Greed Rd.
                        </div>
                    </div>
                </div>

                <div className="w-full " >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl font-semibold" >Name:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
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
                                        <FormLabel className="text-xl font-semibold" >Email:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Email" {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl font-semibold">How can we help?</FormLabel>
                                        <FormControl>
                                            <Textarea style={{ minHeight: 200, maxHeight: 300 }} placeholder="Type Your Message Here..." {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                            <Button
                                className="flex flex-row items-center w-full cursor-pointer font-medium bg-zinc-400 text-zinc-900 uppercase tracking-widest p-6"
                                type="submit"
                            >
                                Submit <Send />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default Contact;