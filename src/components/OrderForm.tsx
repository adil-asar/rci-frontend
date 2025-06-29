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
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import background from '../assets/Background2.png'
import { CloudUpload } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email({ message: 'Please enter a valid Email.' }),
  message: z.string().nonempty({ message: 'This Field Cannot be Empty.' }),
  phone: z.string().min(10, { message: 'Phone is a required field.' }).max(15),
  address: z.string().min(2, { message: 'Address is a required field.' }),
  state: z.string(),
  city: z.string(),
  select: z.enum([
    'PSLP',
    'PDSS',
    'TB',
    'EDD',
    'FDC',
    'LCS',
  ])
})

const data = [
  { name: 'Printing Services for Legal Professionals', value: 'PSLP' },
  { name: 'Paper Discovery & Scanning Services', value: 'PDSS' },
  { name: 'Trial Boards', value: 'TB' },
  { name: 'Electronic Data Discovery (EDD) & Early Case Assessment', value: 'EDD' },
  { name: 'Forensic Data Collection', value: 'FDC' },
  { name: 'Litigation Consulting Services', value: 'LCS' },
]

const OrderForm = () => {
  const [fileName, setFileName] = useState<File | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state?.title);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const selectedValue = data.find((item) => item.name === location?.state?.title)?.value || 'LCS';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      message: '',
      phone: '',
      address: '',
      state: '',
      city: '',
      select: selectedValue as z.infer<typeof formSchema>['select']
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!fileName) {
      toast.warning("File is Required.", {
        description: 'Upload File before submitting form.',
        action: {
          label: "Cancel",
          onClick: () => console.log("Undo"),
        },
      });
    }
    else {
      const formData = new FormData();
      formData.append('name', values?.username);
      formData.append('number', values?.phone);
      formData.append('email', values?.email);
      formData.append('address', values?.address);
      formData.append('state', values?.state);
      formData.append('city', values?.city);
      formData.append('message', values?.message);
      formData.append('documents', fileName);
      formData.append('select', values?.select );
      const url = `${import.meta.env.VITE_API_URL}/api/contact`;
      axios.post(url, formData)
        .then((response) => {
          console.log(response);
          if (response?.status === 201) {
            toast.success("Form Submitted Successfully.", {
              description: 'Check Your Email to Download the Form.',
              action: {
                label: "Cancel",
                onClick: () => console.log("Undo"),
              },
            });
            setTimeout(() => {
              navigate('/');
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          const errMsg = error?.response?.data?.message;
          const includeErrMsg = errMsg.includes('duplicate') ? 'Email Already Exist' : error?.message;
          toast.error(`${includeErrMsg}`);
        });
      console.log(values);
    }
  };

  const handleRef = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file)
      console.log('Selected file:', file);
    }
  };

  return (
    <div className="text-zinc-400 max-w-7xl mx-auto py-3 px-2" >
      <p className="text-center text-5xl sm:text-6xl font-extrabold py-10 capitalize" >Fill The Details</p>
      <div className="flex flex-col-reverse sm:flex-row items-center gap-10 px-5 sm:px-0" >
        <div className="w-full" >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold" >Name:</FormLabel>
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
                    <FormLabel className="text-sm font-semibold" >Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="select"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Select Service:</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold" >Phone:</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Phone" {...field} />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Address:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Address" {...field} />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">State:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter State" {...field} />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">City:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter City" {...field} />
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
                    <FormLabel className="text-sm font-semibold">How can we help?</FormLabel>
                    <FormControl>
                      <Textarea style={{ minHeight: 100, maxHeight: 200 }} placeholder="Enter Your Message Here..." {...field} />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <input type="file" hidden ref={uploadRef} onChange={handleFileChange} />
              <div
                className="flex flex-col gap-5 justify-center items-center cursor-pointer w-full border p-3 rounded-md"
                onClick={handleRef}
              >
                <CloudUpload />
                {fileName ? fileName?.name : 'Upload a File or Image'}
              </div>
              <Button
                className="flex flex-row items-center w-full cursor-pointer font-medium bg-zinc-400 text-zinc-900 uppercase tracking-widest p-6"
                type="submit"
              >
                Submit <Send />
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full" >
          <img src={background} alt="background" />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;