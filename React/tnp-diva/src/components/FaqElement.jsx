import { ChevronDown } from "lucide-react";

const FaqElement = ({ number, question, answer, isOpen, onToggle}) => {
    return (
        <div className="bg-[#1A1D4A] rounded-2xl mb-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-white hover:text-[#7dfa96]"
            >
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg">
                        {number}.
                    </span>

                    <h2 className="text-lg md:text-xl font-semibold">
                        {question}
                    </h2>
                </div>
                <ChevronDown className={`text-[#7dfa96] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}/>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-white leading-relaxed">{answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FaqElement;