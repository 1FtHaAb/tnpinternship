import ProductCard from "./ProductCard";

function Section({ title, items, bg }) {
  return (
    <div className={`${bg} py-6`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-widest">
          {title}
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {items.map((item, i) => (
            <ProductCard
              key={i}
              name={item.name}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section;