import CategoryScroll from "../components/CategoryScroll";
import BannerSlider from "../components/BannerSlider";
import Section from "../components/Section";

const electronics = [
    {
        name: "Laptops",
        img: "https://cdn.assets.prezly.com/cc1e3f98-2fc8-4410-8dde-76f813c9691c/Swift-Go-16-02.jpg",
    },
    {
        name: "Mobiles",
        img: "https://suprememobiles.in/cdn/shop/files/1_2ab6c803-16e7-4e9d-8177-09689c589a8a.webp?v=1738819846&width=1100",
    },
    {
        name: "Tablets",
        img: "https://r2media.horizondm.com/catalog/product/cache/eb4305db09fb6492bb059b8131f647e3/_/-/_-_2025-10-04t143604.964.jpg",
    },
    {
        name: "Audio",
        img: "https://www.theaudiostore.in/cdn/shop/files/sennheiser-accentum-hybrid-noise-canceling-wireless-headphones-black-41622095659263.jpg?v=1744394599",
    },
    {
        name: "Wearables",
        img: "https://www.gonoise.com/cdn/shop/products/1.5_ff788997-120a-4d9c-8b14-61eca1d973d9.png?v=1669869991",
    },
    {
        name: "Cameras",
        img: "https://png.pngtree.com/png-clipart/20240625/original/pngtree-there-is-a-camera-with-the-word-canon-on-it-png-image_15408466.png",
    },
    {
        name: "Gaming",
        img: "https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-3d-game-controller-png-image_13331475.png",
    },
    {
        name: "Accessories",
        img: "https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-metal-portable-power-bank-png-image_13261164.png",
    },
];

const fashion = [
    {
        name: "Men",
        img: "https://img.freepik.com/premium-photo/fashion-attitude-portrait-man-white-background-trendy-casual-stylish-clothes-confidence-handsome-isolated-male-fashion-model-kneel-studio-urban-retro-2000s-style_590464-125627.jpg?w=360",
    },
    {
        name: "Women",
        img: "https://www.nicepng.com/png/full/8-88585_women-fashion-png-example-of-magazine-cover.png",
    },
    {
        name: "Kids",
        img: "https://static.vecteezy.com/system/resources/thumbnails/072/032/061/small/bother-sister-and-portrait-of-kids-fashion-in-studio-with-smile-bonding-or-siblings-in-kindergarten-together-boy-girl-and-children-with-cool-style-trendy-clothes-and-friends-on-white-background-photo.jpg",
    },
    {
        name: "Footwear",
        img: "https://static.vecteezy.com/system/resources/thumbnails/046/323/598/small/pair-of-colorful-sports-shoes-for-active-lifestyle-png.png",
    },
    {
        name: "Watches",
        img: "https://static.vecteezy.com/system/resources/previews/052/935/241/non_2x/luxury-golden-watch-free-png.png",
    },
    {
        name: "Jewellery",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfN8xbP1GFQY4ym6IyP5unv2xklEj--DMwpw&s",
    },
    {
        name: "Bags",
        img: "https://i.pinimg.com/736x/7e/70/e5/7e70e554016ef2ddf149f040ecd70d1e.jpg",
    },
];

const Home = () => {

    return (
        <div>
            <CategoryScroll />
            <BannerSlider />
            <Section
                title="Electronics"
                items={electronics}
                bg="bg-gradient-to-r from-slate-300 to-indigo-400"
            />
            <Section
                title="Fashion"
                items={fashion}
                bg="bg-gradient-to-r from-orange-100 to-rose-200"
            />
        </div>

    );
}

export default Home;