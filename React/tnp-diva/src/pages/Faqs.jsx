import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FaqElement from "../components/FaqElement";
import faqs from "../../faqs.json"
import { useState } from "react";

const Faqs = () => {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId(openId === id ? null : id);
    };
    return (
        <div className="min-h-screen bg-[#0F1021]">
            <Navbar />
            <div className="px-6 md:px-20 py-4 flex flex-row items-start justify-between">
                <div className="md:max-w-3xl">
                    <h3 className="text-xl md:text-4xl text-white font-bold leading-tight">
                        We're here to answer all your Questions!
                    </h3>
                </div>
                <div className="shrink-0">
                    <h2 className="text-4xl md:text-7xl text-[#7dfa96] font-bold">
                        FAQs
                    </h2>
                </div>
            </div>
            <div className="px-4 md:px-20 pb-4">
                {faqs.map((faq) => (
                    <FaqElement
                        key={faq.id}
                        number={faq.id}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openId === faq.id}
                        onToggle={() => handleToggle(faq.id)}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Faqs;