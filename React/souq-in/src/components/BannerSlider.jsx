import { useEffect, useRef } from "react";

function Carousel() {
  const scrollRef = useRef();

  useEffect(() => {
    const container = scrollRef.current;

    const interval = setInterval(() => {
      if (container) {
        container.scrollLeft += 1200;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-5 px-6 py-4 max-w-7xl mx-auto overflow-x-auto scroll-smooth scrollbar-hide"
    >
      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.jpg"
        className="min-w-300 h-80 rounded-2xl object-cover"
      />

      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"
        className="min-w-300 h-80 rounded-2xl object-cover"
      />

      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg"
        className="min-w-300 h-80 rounded-2xl object-cover"
      />
      
      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/25/0pfZkpSF_60a17fdbda0a4622b8bd1f79585836c0.png"
        className="min-w-300 h-80 rounded-2xl object-cover"
      />
    </div>
  );
}

export default Carousel;