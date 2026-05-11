import Navbar from "../components/Navbar"
import Banner from "../components/Banner"
import Footer from "../components/Footer"

const About = () => {
    return (
        <div className="min-h-screen bg-[#0B0E2C] text-white">
            <Navbar />
            <Banner title="ABOUT US" />
            <div className="flex flex-col lg:flex-row justify-between gap-16 px-6 md:px-12 pb-16">
                <div className="lg:w-[45%]">
                    <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-200">
                        <p>
                            Welcome to <span className="text-[#7dfa96] font-semibold">DIVA</span> (Data Integrity and Validation Assistant), an innovative data quality validation tool designed and developed by TNP.  At TNP, we are leaders in data science and engineering, where exceptional data quality forms the foundation of accurate insights and impactful decision-making.
                        </p>
                        <p> Recognizing the inefficiencies and risks associated with manual data validation — prolonged processes, resource-heavy operations, and susceptibility to errors — we developed DIVA as a transformative solution.</p>
                    </div>

                    <div className="mt-16 space-y-12">
                        <div className="flex gap-5 items-center">
                            <i className="fa-brands fa-500px text-[#7dfa96] mt-1 text-3xl"></i>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">50,000 Data points in under 2 minutes</h2>
                                <p className="text-gray-300 text-sm"> DIVA delivers exceptional speed and efficiency, seamlessly processing over 50,000 data points in under 2 minutes.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center">
                            <i className="fa-solid fa-file-lines text-[#7dfa96] mt-1 text-3xl"></i>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Instant Validation Reports</h2>
                                <p className="text-gray-300 text-sm"> DIVA simplifies report generation by producing detailed and accurate data quality reports in PDF format.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-center">
                            <i className="fa-solid fa-sliders text-[#7dfa96] mt-1 text-3xl"></i>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2"> Five Quality Parameters</h2>
                                <p className="text-gray-300 text-sm"> DIVA ensures data quality by validating five essential parameters: Accuracy, Consistency, Completeness, Occupancy and Uniqueness.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[48%] flex flex-col items-center">
                    <img src="/world-map.svg" alt="world map" className="w-full max-w-175 mb-10" />

                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-5"> TNP operates in three strategic regions of the world:
                        </h2>
                        <ul className="space-y-4 text-gray-300">
                            <li>
                                <span className="text-[#7dfa96] font-semibold"> Western Europe :&nbsp;</span>Paris, Lyon, Marseille, Monaco, Luxembourg, Milan, Geneva and Frankfurt
                            </li>
                            <li>
                                <span className="text-[#7dfa96] font-semibold">North and West Africa :&nbsp;</span> Casablanca, Abidjan, Tunis and Libreville
                            </li>
                            <li>
                                <span className="text-[#7dfa96] font-semibold"> India and the Middle East :&nbsp; </span>Cochin, Mumbai, Delhi and Dubai
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About