const Banner = ({ title }) => {
    return (
        <div className="px-6 md:px-12">
            <div className="bg-[#1A1D4A] rounded-2xl px-8 py-6 mb-8">
                <h1 className="text-[#7dfa96] text-3xl font-bold">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default Banner