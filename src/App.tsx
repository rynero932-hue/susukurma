/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, animate, useInView } from "motion/react";
import { 
  MessageCircle, 
  Instagram, 
  Facebook, 
  MapPin, 
  ShoppingBag, 
  Phone,
  Milk,
  Leaf,
  Heart,
  Star,
  Loader2,
  CheckCircle2,
  Users,
  Truck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowUp,
  Mail,
  Clock,
  X,
  Info,
  Plus,
  Minus,
  Trash2
} from "lucide-react";

const QuantitySelector = ({ quantity, onUpdate, className = "" }: { quantity: number; onUpdate: (delta: number) => void; className?: string }) => (
  <div className={`flex items-center gap-3 bg-amber-50 p-1 rounded-xl border border-amber-100 ${className}`}>
    <button 
      onClick={() => onUpdate(-1)}
      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-amber-900 shadow-sm hover:bg-amber-100 transition-all disabled:opacity-50"
      disabled={quantity <= 0}
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-8 text-center font-black text-[#3E2723]">{quantity}</span>
    <button 
      onClick={() => onUpdate(1)}
      className="w-8 h-8 flex items-center justify-center bg-[#5D4037] rounded-lg text-white shadow-sm hover:bg-[#3E2723] transition-all"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

const PRODUCTS = [
  {
    id: 1,
    name: "Susu Kurma Original",
    price: "Rp 15.000",
    image: "https://healthybelly.s3.amazonaws.com/gambar_sampul/gambar_sampul_1687966483.webp",
    desc: "Perpaduan susu segar dan kurma pilihan tanpa pemanis buatan."
  },
  {
    id: 2,
    name: "Susu Kurma Almond",
    price: "Rp 20.000",
    image: "https://tse2.mm.bing.net/th/id/OIP.Bc8LH3YlrN91n6RZu8PYhAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Ditambah dengan gurihnya kacang almond yang kaya nutrisi."
  },
  {
    id: 3,
    name: "Susu Kurma Madu",
    price: "Rp 18.000",
    image: "https://umkmklaten.com/wp-content/uploads/2021/10/by-nunung.nooraisyah-1-Alunna-Indonesia.jpeg",
    desc: "Ekstra madu murni untuk stamina dan daya tahan tubuh."
  }
];

const BENEFITS = [
  {
    icon: <Leaf className="w-6 h-6 text-amber-700" />,
    title: "100% Natural",
    desc: "Tanpa bahan pengawet dan pemanis buatan."
  },
  {
    icon: <Milk className="w-6 h-6 text-amber-700" />,
    title: "Susu Segar",
    desc: "Menggunakan susu sapi segar berkualitas tinggi."
  },
  {
    icon: <Heart className="w-6 h-6 text-amber-700" />,
    title: "Kaya Nutrisi",
    desc: "Sumber energi murni yang bagus untuk jantung."
  }
];

const STATS = [
  { icon: <Users className="w-6 h-6" />, value: 1000, suffix: "+", label: "Pelanggan Puas" },
  { icon: <ShieldCheck className="w-6 h-6" />, value: 100, suffix: "%", label: "Natural & Halal" },
  { icon: <Truck className="w-6 h-6" />, value: 24, suffix: " Jam", label: "Pengiriman" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
};

const TESTIMONIALS = [
  {
    id: 1,
    name: "Siti Aminah",
    role: "Ibu Rumah Tangga",
    avatar: "https://picsum.photos/seed/milk/100/100",
    quote: "Anak-anak saya sangat suka! Manisnya pas dan saya tidak khawatir karena tanpa gula tambahan. Sangat membantu untuk daya tahan tubuh keluarga."
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Pekerja Kantoran",
    avatar: "https://picsum.photos/seed/dates/100/100",
    quote: "Minuman wajib setiap pagi sebelum berangkat kerja. Memberikan energi ekstra dan rasanya sangat segar. Pengirimannya juga sangat cepat!"
  },
  {
    id: 3,
    name: "dr. Sarah",
    role: "Nutrisionis",
    avatar: "https://picsum.photos/seed/bottle/100/100",
    quote: "Kombinasi susu dan kurma adalah sumber nutrisi yang luar biasa. Al-Barakah berhasil menjaga kualitas bahan bakunya tetap segar dan alami."
  }
];

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-[#3E2723] flex flex-col items-center justify-center"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="mb-8"
    >
      <Milk className="w-20 h-20 text-amber-100" />
    </motion.div>
    <div className="flex items-center gap-3 text-amber-100 font-bold tracking-widest uppercase text-sm">
      <Loader2 className="w-5 h-5 animate-spin" />
      Menyiapkan Kesegaran...
    </div>
  </motion.div>
);

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  key?: React.Key;
}

const FadeInWhenVisible = ({ children, delay = 0 }: FadeInWhenVisibleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      <div className="relative h-[400px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="absolute w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-amber-100 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-amber-50 shadow-inner">
                <img 
                  src={TESTIMONIALS[currentIndex].avatar} 
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-700 p-2 rounded-full text-white shadow-lg">
                <Quote className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium text-[#3E2723] italic leading-relaxed mb-6">
                "{TESTIMONIALS[currentIndex].quote}"
              </p>
              <div>
                <h4 className="text-lg font-black text-[#3E2723]">{TESTIMONIALS[currentIndex].name}</h4>
                <p className="text-amber-700 font-bold text-sm uppercase tracking-widest">{TESTIMONIALS[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-white border border-amber-100 text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? "bg-amber-700 w-8" : "bg-amber-200"
              }`}
            />
          ))}
        </div>
        <button 
          onClick={next}
          className="p-3 rounded-full bg-white border border-amber-100 text-[#5D4037] hover:bg-[#5D4037] hover:text-white transition-all shadow-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "rejected") => {
    localStorage.setItem("cookie-consent", choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[60] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[#3E2723] text-[#FFFBF2] p-6 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-amber-700/30 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <p className="text-sm md:text-base leading-relaxed">
                Kami menggunakan cookie untuk meningkatkan pengalaman Anda di website kami. Dengan melanjutkan, Anda menyetujui kebijakan privasi kami.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => handleChoice("rejected")}
                className="flex-1 md:flex-none px-6 py-3 rounded-xl text-sm font-bold border border-white/20 hover:bg-white/10 transition-all"
              >
                Tolak
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="flex-1 md:flex-none px-8 py-3 bg-amber-700 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-900/50"
              >
                Terima Semua
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProductModal = ({ product, onClose, whatsappUrl, quantity, onUpdateQuantity }: { product: any, onClose: () => void, whatsappUrl: string, quantity: number, onUpdateQuantity: (delta: number) => void }) => {
  if (!product) return null;

  const orderText = `Halo Azmaimnhly, saya ingin memesan ${product.name} sebanyak ${quantity || 1} botol.`;
  const finalWhatsappUrl = `${whatsappUrl.split('?')[0]}?text=${encodeURIComponent(orderText)}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 md:p-8 bg-[#3E2723]/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="bg-[#FFFBF2] w-full max-w-5xl my-4 md:my-auto rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#3E2723] hover:bg-white transition-all shadow-lg"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="w-full md:w-1/2 h-40 md:h-auto md:aspect-auto flex-shrink-0 overflow-hidden rounded-t-[2rem] md:rounded-l-[3rem] md:rounded-tr-none">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-1/2 p-5 md:p-16 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full text-amber-900 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-6 w-fit">
            <Info className="w-3 h-3 md:w-4 md:h-4" />
            Info Produk
          </div>
          <h2 className="text-xl md:text-5xl font-black text-[#3E2723] mb-1 md:mb-4 leading-tight">{product.name}</h2>
          <div className="flex items-center justify-between mb-3 md:mb-8">
            <p className="text-lg md:text-2xl font-black text-amber-700">{product.price}</p>
            <QuantitySelector quantity={quantity} onUpdate={onUpdateQuantity} />
          </div>
          
          <div className="space-y-3 md:space-y-6 mb-6 md:mb-12">
            <p className="text-[#5D4037]/80 text-xs md:text-lg leading-relaxed">
              {product.desc}
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="p-2 md:p-4 bg-amber-50 rounded-xl md:rounded-2xl border border-amber-100">
                <p className="text-[7px] md:text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5 md:mb-1">Ukuran</p>
                <p className="text-[10px] md:text-sm font-bold text-[#3E2723]">250ml / 500ml</p>
              </div>
              <div className="p-2 md:p-4 bg-amber-50 rounded-xl md:rounded-2xl border border-amber-100">
                <p className="text-[7px] md:text-[10px] font-black text-amber-700 uppercase tracking-widest mb-0.5 md:mb-1">Ketahanan</p>
                <p className="text-[10px] md:text-sm font-bold text-[#3E2723]">3-5 Hari (Kulkas)</p>
              </div>
            </div>
          </div>

          <a 
            href={finalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 md:py-5 bg-[#5D4037] text-white rounded-xl md:rounded-[1.5rem] font-black hover:bg-[#3E2723] transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-amber-900/20 text-xs md:text-lg text-center px-4"
          >
            <ShoppingBag className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0" />
            <span>Pesan Sekarang via WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const whatsappNumber = "6281286467275";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Halo%20Azmaimnhly,%20saya%20ingin%20konsultasi%20mengenai%20produk.`;

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const getCartTotal = (): number => {
    return (Object.values(cart) as number[]).reduce((sum: number, qty: number) => sum + qty, 0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] text-[#3E2723] font-sans selection:bg-amber-200 selection:text-amber-900 scroll-smooth">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CookieConsent />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            whatsappUrl={whatsappUrl}
            quantity={cart[selectedProduct.id] || 0}
            onUpdateQuantity={(delta) => updateQuantity(selectedProduct.id, delta)}
          />
        )}
      </AnimatePresence>

      {/* Order Summary Sticky */}
      <AnimatePresence>
        {getCartTotal() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[65]"
          >
            <div className="bg-[#3E2723] text-[#FFFBF2] p-4 md:p-6 rounded-[2rem] shadow-2xl border border-white/10 flex items-center justify-between gap-4 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-700 rounded-2xl flex items-center justify-center relative">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-[#3E2723] rounded-full flex items-center justify-center text-xs font-black border-2 border-[#3E2723]">
                    {getCartTotal()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold opacity-70">Pesanan Anda</p>
                  <p className="text-lg font-black leading-none">
                    {Object.entries(cart).map(([id, qty]) => {
                      const p = PRODUCTS.find(p => p.id === Number(id));
                      return `${qty}x ${p?.name}`;
                    }).join(", ")}
                  </p>
                </div>
                <div className="sm:hidden">
                  <p className="text-lg font-black">{getCartTotal()} Item Terpilih</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCart({})}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                  title="Hapus Semua"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <a 
                  href={`${whatsappUrl.split('?')[0]}?text=${encodeURIComponent(`Halo Azmaimnhly, saya ingin memesan:\n${Object.entries(cart).map(([id, qty]) => {
                    const p = PRODUCTS.find(p => p.id === Number(id));
                    return `- ${p?.name} (${qty} botol)`;
                  }).join("\n")}\n\nTotal: ${getCartTotal()} botol.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-amber-500 text-[#3E2723] rounded-xl font-black hover:bg-amber-400 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  Checkout WA
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promo Banner */}
      <div className="bg-[#3E2723] text-[#FFFBF2] py-2 text-center text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase z-[60] relative">
        <span className="opacity-90">✨ Promo Bulan ini: Beli 5 Gratis 1! ✨</span>
      </div>

      {/* Navbar */}
      <nav className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 bg-white/90 backdrop-blur-2xl border-amber-200 shadow-2xl shadow-amber-900/10 rounded-3xl" 
          : "top-10 bg-white/80 backdrop-blur-xl border-amber-100 rounded-2xl shadow-xl shadow-amber-900/5"
      } border`}>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-[#5D4037] rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                <Milk className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#3E2723]">Azmaimnhly</span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-10 text-sm font-bold text-[#5D4037]">
              {["Beranda", "Produk", "Manfaat", "Testimoni"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-amber-700 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#5D4037] text-white rounded-xl hover:bg-[#3E2723] transition-all shadow-md shadow-amber-900/10"
              >
                Konsultasi
              </motion.a>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-amber-50 rounded-lg text-[#3E2723] hover:bg-amber-100 transition-all"
            >
              <motion.div 
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full origin-center"
              ></motion.div>
              <motion.div 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current rounded-full"
              ></motion.div>
              <motion.div 
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full origin-center"
              ></motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-amber-50 bg-white/95 backdrop-blur-xl rounded-b-2xl overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                {["Beranda", "Produk", "Manfaat", "Testimoni"].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-amber-50 text-lg font-bold text-[#5D4037] hover:text-amber-700 transition-all"
                  >
                    {item}
                    <ChevronRight className="w-5 h-5 opacity-30" />
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-amber-50 flex flex-col gap-3">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#5D4037] text-white rounded-xl font-bold text-center shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Konsultasi WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#FFFBF2]">
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-[5%] w-32 h-32 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 right-[10%] w-64 h-64 bg-[#5D4037]/5 rounded-full blur-3xl pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <FadeInWhenVisible>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/50 rounded-full text-amber-900 text-xs font-bold border border-amber-200/50 uppercase tracking-widest">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Minuman Sehat No. 1 di Indonesia</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-[#3E2723] leading-[0.9] tracking-tighter">
                Energi Alami <br />
                <span className="text-amber-700">Setiap Hari.</span>
              </h1>
              <p className="text-xl text-[#5D4037]/70 max-w-lg leading-relaxed">
                Nikmati kesegaran susu murni berpadu dengan manisnya kurma pilihan. Tanpa gula tambahan, 100% nutrisi untuk keluarga Anda.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#produk"
                  className="px-10 py-5 bg-[#5D4037] text-white rounded-[1.5rem] font-bold text-lg hover:bg-[#3E2723] transition-all shadow-xl shadow-amber-900/20 flex items-center gap-3"
                >
                  Lihat Produk
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a 
                  href="#manfaat"
                  className="px-10 py-5 bg-white text-[#5D4037] rounded-[1.5rem] font-bold text-lg border-2 border-amber-100 hover:bg-amber-50 transition-all"
                >
                  Manfaat
                </a>
              </div>
              
              <div className="flex items-center gap-6 pt-8 border-t border-amber-100">
              </div>
            </div>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-200 rounded-[4rem] rotate-6 scale-95 blur-2xl opacity-20"></div>
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://tse4.mm.bing.net/th/id/OIP.7UWXCnFWuSg4ifh7io2THQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" 
                  alt="Susu Kurma Azmaimnhly" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl"
              >
                <div className="text-center">
                  <p className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">Freshly Made</p>
                  <p className="text-lg font-black text-amber-900">100%</p>
                  <p className="text-[10px] font-black text-amber-900 uppercase tracking-tighter">Natural</p>
                </div>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-800 mb-4">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl font-black text-[#3E2723]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[#5D4037]/60 font-bold uppercase tracking-widest text-xs mt-1">{stat.label}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="manfaat" className="py-32 bg-[#3E2723] text-[#FFFBF2] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-8 border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Kenapa Harus Susu Kurma?</h2>
              <p className="text-amber-100/70 max-w-2xl mx-auto text-xl">Kombinasi sempurna dua bahan alami yang telah teruji manfaatnya selama berabad-abad.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid md:grid-cols-3 gap-10">
            {BENEFITS.map((benefit, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.2}>
                <motion.div 
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all h-full"
                >
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-amber-900/50">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-amber-100/60 leading-relaxed text-lg">{benefit.desc}</p>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-5xl font-black text-[#3E2723] mb-4">Varian Favorit</h2>
                <p className="text-[#5D4037]/70 max-w-lg text-lg">Pilih rasa yang paling cocok dengan selera dan kebutuhan nutrisi Anda.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-amber-50 text-amber-900 rounded-full text-sm font-bold border border-amber-100 hover:bg-amber-100 transition-all">Semua</button>
                <button className="px-6 py-2.5 bg-white text-[#5D4037] rounded-full text-sm font-bold border border-amber-100 hover:bg-amber-50 transition-all">Terlaris</button>
              </div>
            </div>
          </FadeInWhenVisible>
          <div className="grid md:grid-cols-3 gap-12">
            {PRODUCTS.map((product, i) => (
              <FadeInWhenVisible key={product.id} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative bg-[#FFFBF2] rounded-[3rem] overflow-hidden border border-amber-100 hover:shadow-[0_40px_80px_-15px_rgba(62,39,35,0.15)] transition-all duration-500"
                >
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="aspect-[4/5] overflow-hidden relative block cursor-pointer"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#3E2723]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Info className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                      <span className="text-[#3E2723] font-black">{product.price}</span>
                    </div>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-black text-[#3E2723]">{product.name}</h3>
                      <QuantitySelector 
                        quantity={cart[product.id] || 0} 
                        onUpdate={(delta) => updateQuantity(product.id, delta)}
                      />
                    </div>
                    <p className="text-[#5D4037]/70 text-lg mb-8 leading-relaxed">
                      {product.desc}
                    </p>
                    <div className="flex flex-col gap-4">
                      <a 
                        href={`${whatsappUrl.split('?')[0]}?text=${encodeURIComponent(`Halo Azmaimnhly, saya ingin memesan ${product.name} sebanyak ${cart[product.id] || 1} botol.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-[#5D4037] text-white rounded-2xl font-bold hover:bg-[#3E2723] transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-900/10"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Pesan Sekarang
                      </a>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="w-full py-3 text-amber-800 font-bold text-sm uppercase tracking-widest hover:text-amber-600 transition-colors flex items-center justify-center gap-2"
                      >
                        Detail Produk
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#3E2723] mb-4">Apa Kata Mereka?</h2>
              <p className="text-[#5D4037]/70 max-w-lg mx-auto text-lg">Testimoni jujur dari pelanggan setia Azmaimnhly.</p>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <TestimonialCarousel />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact & Maps */}
      <section id="kontak" className="py-32 px-4 bg-[#FFFBF2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInWhenVisible>
              <div>
                <h2 className="text-5xl font-black text-[#3E2723] mb-8">Hubungi Kami</h2>
                <p className="text-[#5D4037]/70 mb-12 text-xl leading-relaxed">
                  Ingin bertanya tentang stok atau konsultasi manfaat susu kurma? Hubungi kami kapan saja.
                </p>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-800">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">Lokasi Toko</p>
                      <p className="text-lg font-bold text-[#3E2723]">Jl. Kurma Sehat No. 123, Jakarta Selatan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-800">
                      <Phone className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">WhatsApp</p>
                      <p className="text-lg font-bold text-[#3E2723]">+62 812 3456 7890</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5">
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#5D4037] border border-amber-100 hover:bg-[#5D4037] hover:text-white transition-all shadow-sm">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#5D4037] border border-amber-100 hover:bg-[#5D4037] hover:text-white transition-all shadow-sm">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#5D4037] border border-amber-100 hover:bg-[#5D4037] hover:text-white transition-all shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <div className="w-full h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273887222442!2d106.8246943147691!3d-6.227482995492043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4a43e73ad%3A0xad24941774971e99!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1648484848484!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-[#FFFBF2] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Milk className="text-amber-400 w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter">AL-BARAKAH</span>
              </div>
              <p className="text-amber-100/50 leading-relaxed">
                Menyediakan nutrisi terbaik dari alam untuk kesehatan keluarga Indonesia sejak 2020.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Tautan Cepat</h4>
              <ul className="space-y-4 text-amber-100/60">
                <li><a href="#beranda" className="hover:text-amber-400 transition-colors">Beranda</a></li>
                <li><a href="#manfaat" className="hover:text-amber-400 transition-colors">Manfaat</a></li>
                <li><a href="#produk" className="hover:text-amber-400 transition-colors">Produk</a></li>
                <li><a href="#testimoni" className="hover:text-amber-400 transition-colors">Testimoni</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Bantuan</h4>
              <ul className="space-y-4 text-amber-100/60">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Cara Pemesanan</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Pengiriman</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#kontak" className="hover:text-amber-400 transition-colors">Kontak Kami</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Newsletter</h4>
              <p className="text-amber-100/50 mb-6 text-sm">Dapatkan info promo dan tips kesehatan setiap minggu.</p>
              {isSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 border border-amber-400/30 rounded-xl p-4 text-amber-400 text-sm font-bold flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Terima kasih telah berlangganan!
                </motion.div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubscribed(true);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="Kontak Anda" 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:outline-none focus:border-amber-400 transition-all"
                  />
                  <button type="submit" className="bg-amber-700 p-3 rounded-xl hover:bg-amber-600 transition-all">
                    <Mail className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-amber-100/30 text-sm">
            <p>© 2026 Susu Kurma Al-Barakah. Created by AiDesign.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-amber-100/50 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-amber-100/50 transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-[70] w-14 h-14 bg-[#5D4037] text-white rounded-2xl shadow-2xl shadow-amber-900/40 flex items-center justify-center hover:bg-[#3E2723] transition-all border border-white/10"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-10 right-10 w-20 h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.4)] z-50 hover:bg-[#128C7E] transition-all"
      >
        <MessageCircle className="w-10 h-10" />
      </motion.a>
    </div>
  );
}

