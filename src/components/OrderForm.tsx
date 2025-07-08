import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send, CloudUpload } from "lucide-react";
import { Textarea } from "./ui/textarea";
import background from "../assets/Background2.png";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Updated schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email({ message: "Please enter a valid Email." }),
  phone: z.string().min(10).max(15),
  address: z.string().min(2),
  city: z.string(),
  state: z.string(),
  deliveryAddress: z.string().min(2),
  deliveryCity: z.string(),
  deliveryState: z.string(),
  message: z.string().nonempty(),
  select: z.enum(["Printing Services for Legal Professionals", "Paper Discovery & Scanning Services", "Trial Boards", "Electronic Data Discovery (EDD)", "Forensic Data Collection", "Litigation Consulting Services"]),
});

const data = [
  { 
    name: "Printing Services for Legal Professionals", 
    value: "Printing Services for Legal Professionals"
   },
  {
     name: "Paper Discovery & Scanning Services", 
     value: "Paper Discovery & Scanning Services"
     },
  { 
    name: "Trial Boards",
     value: "Trial Boards" 
    },
  {
    name: "Electronic Data Discovery (EDD) & Early Case Assessment",
    value: "Electronic Data Discovery (EDD) & Early Case Assessment",
  },
  { 
    name: "Forensic Data Collection", 
    value: "Forensic Data Collection" 
  },
  {
     name: "Litigation Consulting Services",
      value: "Litigation Consulting Services" 
    },
];

const OrderForm = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();

  const selectedValue =
    data.find((item) => item.name === location?.state?.title)?.value || "Litigation Consulting Services";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      deliveryAddress: "",
      deliveryCity: "",
      deliveryState: "",
      message: "",
      select: selectedValue as z.infer<typeof formSchema>["select"],
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("rci-token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!files.length) {
      toast.warning("File is Required.", {
        description: "Upload File(s) before submitting form.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", values.username);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("deliveryAddress", values.deliveryAddress);
    formData.append("deliveryCity", values.deliveryCity);
    formData.append("deliveryState", values.deliveryState);
    formData.append("message", values.message);
    formData.append("service", values.select);

    files.forEach((file) => {
      formData.append("documents", file);
    });

    const url = `http://localhost:5000/api/orders/create`;
    const token = localStorage.getItem("rci-token");

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Form Submitted Successfully.", {
          description: "Check Your Email to Download the Form.",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Submission failed";
      toast.error(errMsg.includes("duplicate") ? "Email Already Exist" : errMsg);
    }
  };

  const handleRef = () => uploadRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  return (
    <div className="text-zinc-400 max-w-7xl mx-auto py-3 px-2">
      <p className="text-center text-5xl sm:text-6xl font-extrabold py-10 capitalize">
        Fill The Details
      </p>
      <div className="flex flex-col-reverse sm:flex-row items-center gap-10 px-5 sm:px-0">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* Basic Fields */}
              {[
                ["username", "Name:"],
                ["email", "Email:"],
                ["phone", "Phone:"],
                ["address", "Your Address:"],
                ["city", "Your City:"],
                ["state", "Your State:"],
                ["deliveryAddress", "Delivery Address:"],
                ["deliveryCity", "Delivery City:"],
                ["deliveryState", "Delivery State:"],
              ].map(([name, label]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${label}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Select Service */}
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

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">How can we help?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Your Message Here..."
                        style={{ minHeight: 100, maxHeight: 200 }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* File Upload */}
              <input type="file" hidden ref={uploadRef} onChange={handleFileChange} multiple />
              <div
                className="flex flex-col gap-5 justify-center items-center cursor-pointer w-full border p-3 rounded-md"
                onClick={handleRef}
              >
                <CloudUpload />
                {files.length > 0
                  ? files.map((f) => f.name).join(", ")
                  : "Upload Files or Images"}
              </div>

              <Button
                className="flex flex-row items-center w-full font-medium bg-zinc-400 text-zinc-900 uppercase tracking-widest p-6"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Processing..." : "Submit"}
                {!form.formState.isSubmitting && <Send className="ml-2" />}
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full">
          <img src={background} alt="background" />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
