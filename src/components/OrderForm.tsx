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

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email({ message: "Please enter a valid Email." }),
  message: z.string().nonempty({ message: "This Field Cannot be Empty." }),
  phone: z.string().min(10, { message: "Phone is a required field." }).max(15),
  address: z.string().min(2, { message: "Address is a required field." }),
  state: z.string(),
  city: z.string(),
  select: z.enum(["PSLP", "PDSS", "TB", "EDD", "FDC", "LCS"]),
});

const data = [
  { name: "Printing Services for Legal Professionals", value: "PSLP" },
  { name: "Paper Discovery & Scanning Services", value: "PDSS" },
  { name: "Trial Boards", value: "TB" },
  {
    name: "Electronic Data Discovery (EDD) & Early Case Assessment",
    value: "EDD",
  },
  { name: "Forensic Data Collection", value: "FDC" },
  { name: "Litigation Consulting Services", value: "LCS" },
];

const OrderForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const selectedValue =
    data.find((item) => item.name === location?.state?.title)?.value || "LCS";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      select: selectedValue as z.infer<typeof formSchema>["select"],
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("rci-token");
    const user = localStorage.getItem("rci-user");

    if (!token || !user) {
      toast.warning("You must be logged in to access this page.");
      navigate("/");
    }

    window.scrollTo(0, 0);
  }, [navigate]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
    formData.append("state", values.state);
    formData.append("city", values.city);
    formData.append("message", values.message);
    formData.append("service", values.select);

    // Append all selected files
    files.forEach((file) => {
      formData.append("documents", file); 
    });

    const url = `http://localhost:5000/api/orders/create`;
    const token = localStorage.getItem("rci-token");

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response?.status === 201) {
          toast.success("Form Submitted Successfully.", {
            description: "Check Your Email to Download the Form.",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
        const errMsg = error?.response?.data?.message || "Submission failed";
        toast.error(errMsg.includes("duplicate") ? "Email Already Exist" : errMsg);
      });
  };

  const handleRef = () => {
    uploadRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
      console.log("Selected files:", selectedFiles);
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
              {/* All Form Fields Here */}
              {[
                ["username", "Name:"],
                ["email", "Email:"],
                ["phone", "Phone:"],
                ["address", "Address:"],
                ["state", "State:"],
                ["city", "City:"],
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
                        style={{ minHeight: 100, maxHeight: 200 }}
                        placeholder="Enter Your Message Here..."
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
                className="flex flex-row items-center w-full cursor-pointer font-medium bg-zinc-400 text-zinc-900 uppercase tracking-widest p-6"
                type="submit"
              >
                Submit <Send className="ml-2" />
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
