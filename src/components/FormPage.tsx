import { useEffect, useState } from "react";
import { Dot } from 'lucide-react';
import { useLocation } from "react-router-dom";

const FormPage = () => {
    const location = useLocation();
    console.log('FormPage Location', location?.state?.title);

    const data = [
        {
            title: 'Litigation Consulting Services',
            subTitle: 'Strategic Expertise. In-Person Support. End-to-End Solutions.',
            paragraph: 'Hands-on guidance from discovery planning through appeal.',
            Capabilities: [
                { text: 'ESI strategy and litigation hold implementation', },
                { text: 'Paper-to-digital document management', },
                { text: 'In-person project management and trial prep', },
                { text: 'Scanning support for small or enterprise-level matters', },
            ]
        },
        {
            title: 'Electronic Data Discovery (EDD) & Early Case Assessment',
            subTitle: '',
            paragraph: 'Cut through the data clutter and prepare your case faster with our precise, efficient EDD services.',
            Capabilities: [
                { text: 'Identify and eliminate duplicate files', },
                { text: 'Extract searchable metadata and text', },
                { text: 'Export to PDF, TIFF, native formats', },
                { text: 'Create load files compatible with Relativity, Concordance and others', },
            ]
        },
        {
            title: 'Forensic Data Collection',
            subTitle: 'Secure. Defensible. Admissible. ',
            paragraph: 'We perform forensic data acquisition with full chain-of-custody documentation for court-ready results.',
            Capabilities: [
                { text: 'Collect ESI from desktops, servers, phones, cloud platforms', },
                { text: 'Preserve metadata and file integrity', },
                { text: 'Remote or onsite data collection', },
                { text: 'Aligned with federal and state evidentiary standards', },
            ]
        },
        {
            title: 'Paper Discovery & Scanning Services',
            subTitle: 'Done Right. On Time. Every Time. ',
            paragraph: 'We specialize in high-volume, deadline-driven legal scanning and document conversion.',
            Capabilities: [
                { text: 'Legal-grade scanning with OCR', },
                { text: 'Bates stamping, coding and unitization', },
                { text: 'Trial binder creation', },
                { text: '24/7 availability', },
                { text: 'Secure Pickup & Delivery for Law Firms, Homes, and Medical Offices', },
            ]
        },
        {
            title: 'Printing Services for Legal Professionals',
            subTitle: 'Reliable Output. Smart Organization. Lightning-Fast Turnaround.',
            paragraph: 'Printing legal documents from digital files requires more than clicking “Print.” Our advanced workflow handles even the most complex jobs with speed and precision.',
            Capabilities: [
                { text: 'Intelligent batch printing from over 400 file types', },
                { text: 'Auto-detects print errors or unreadable files', },
                { text: 'Maintains folder structure and file order', },
                { text: 'Adds colored document break sheets with file metadata (To, From, File Name, etc.)', },
                { text: 'High-speed, high-volume printing for rush jobs and large case files', },
            ],
            matters: true,
            matterText: 'You get fast, organized print output that mirrors your digital structure—no manual sorting required.',
        },
        {
            title: 'Trial Boards',
            subTitle: 'Clear. Compelling. Custom.',
            paragraph: 'Make your argument stand out in the courtroom with professionally designed trial boards and exhibits.',
            Capabilities: [
                { text: 'Black & white or full-color enlargements', },
                { text: 'Callout boxes, highlights, arrows, custom titles', },
                { text: 'Multiple board sizes and layout options', },
                { text: 'Durable mounting for courtroom display', },
            ],
            matters: true,
            matterText: 'A well-designed visual can clarify complex information and strengthen juror understanding. We help you present your case with confidence.',
        },
    ];
    const [serviceData, setserviceData] = useState(data);
    useEffect(() => {
        window.scroll(0, 0);
        const filterFunction = () => {
            if (location?.state?.title) {
                const filteredData = data.filter(item => item?.title === location?.state?.title);
                setserviceData(filteredData);
            }
        };

        filterFunction();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-3 px-10 sm:px-2 mt-20 mb-20" >
            <div className="w-full sm:w-auto space-y-6 px-5" >
                <h1 className="text-3xl sm:text-5xl mb-5 text-zinc-400 text-center sm:text-start font-bold" >{'Litigation Support & E-Discovery Services '}</h1>
                <p className="text-zinc-400 font-semibold text-xl sm:text-2xl text-center sm:text-start">Fast. Secure. Local. Confidential.</p>
                <p className="text-zinc-400 font-medium text-center sm:text-start text-base sm:text-lg w-full sm:w-[60%]">
                    We help law firms and legal departments in South Florida manage complex casework with confidence—from digital evidence collection to trial presentation. Whether you need forensic data acquisition, document scanning, consulting or custom exhibits, we deliver accurate, timely and defensible solutions, all backed by personalized, in-person support. </p>
            </div>
            {serviceData && serviceData.map((item, index) => (
                <div key={index} className="w-full sm:w-auto space-y-6 px-5 py-3 mt-20 bg-zinc-800" >
                    <h2 className="text-zinc-400 font-semibold text-3xl sm:text-4xl text-center sm:text-start" >{item?.title}</h2>
                    <p className="text-zinc-400 font-semibold text-sm sm:text-base text-center sm:text-start" >{item?.subTitle}</p>
                    <p className="text-zinc-400 font-medium text-sm sm:text-base text-center sm:text-start" >{item?.paragraph}</p>

                    <h3 className="text-zinc-400 text-lg sm:text-xl font-bold" >Our Capabilities:</h3>
                    <ul className="text-zinc-400 text-xs sm:text-base" >
                        {item?.Capabilities && item?.Capabilities.map((Capability, index) => (
                            <li key={index} className="flex items-center" ><Dot /> {Capability?.text}</li>
                        ))}
                    </ul>
                    {item?.matters &&
                        <>
                            <h3 className="text-zinc-400 font-semibold text-2xl sm:text-3xl w-full sm:w-2/3 text-center sm:text-start mt-10" >Why It Matters:</h3>
                            <p className="text-zinc-400 font-medium text-sm sm:text-base w-full sm:w-2/3 text-center sm:text-start" >{item?.matterText}</p>
                        </>
                    }
                </div>
            ))}

            <div className="w-full sm:w-auto space-y-6 px-5 py-3" >



                <h3 className="text-zinc-400 font-semibold text-3xl md:text-4xl text-center md:text-start mt-20" >Why Choose Us</h3>
                <ul className="text-zinc-400 text-xs md:text-base space-y-6 md:space-y-0">
                    <li className="flex flex-col md:flex-row items-center gap-2 text-center md:text-start" >
                        <Dot className="hidden md:block" /> <span className="font-bold" >Local South Florida Support:</span>We're in your backyard and available when you need us
                    </li>
                    <li className="flex flex-col md:flex-row items-center gap-2 text-center md:text-start" >
                        <Dot className="hidden md:block" /> <span className="font-bold" >Fast Turnaround:</span>Built for high-pressure litigation timelines
                    </li>
                    <li className="flex flex-col md:flex-row items-center gap-2 text-center md:text-start" >
                        <Dot className="hidden md:block" /> <span className="font-bold" >Confidential & Secure:</span>Your data and documents are handled with full discretion
                    </li>
                    <li className="flex flex-col md:flex-row items-center gap-2 text-center md:text-start" >
                        <Dot className="hidden md:block" /> <span className="font-bold" >Courtroom-Ready Deliverables:</span>From digital evidence to trial boards, we cover every stage of the case
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default FormPage;