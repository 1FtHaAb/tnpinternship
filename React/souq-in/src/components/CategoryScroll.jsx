function CategoryScroll() {
  const cats = [
    "All","Electronics","Fashion","Groceries","Home","Beauty"
  ];

  return (
    <div className="flex overflow-x-auto gap-3 px-3 py-2 scrollbar-hide">
      {cats.map((c, i) => (
        <button
          key={i}
          className="shrink-0 px-4 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600"
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryScroll;