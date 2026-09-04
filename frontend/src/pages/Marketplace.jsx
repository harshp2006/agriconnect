import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ShoppingBag, MapPin, ShieldCheck, Search, Tag, ArrowUpRight, CheckCircle2, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';

function ProductCard({ product, onBuy, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white rounded-2xl border border-[#E5DCCF] hover:border-[#C2D6C6] p-5 flex flex-col justify-between craft-card-hover"
    >
      <div>
        {/* Visual Crop Header */}
        <div className="relative h-44 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E5DCCF] mb-4 flex items-center justify-center">
          <span className="text-6xl select-none">{product.emoji}</span>

          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {product.isDirect && (
              <span className="inline-flex items-center gap-1 bg-[#2D5A38] text-[#FAF7F2] font-semibold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                <ShieldCheck className="w-3 h-3" /> Direct Farm
              </span>
            )}
            {product.organic && (
              <span className="bg-[#8C6D46] text-[#FAF7F2] font-semibold text-[11px] px-2 py-0.5 rounded-full shadow-xs">
                Organic Certified
              </span>
            )}
          </div>

          <div className="absolute bottom-2 right-2 bg-white/95 text-[#232921] text-[11px] font-mono px-2 py-0.5 rounded-md border border-[#E5DCCF] shadow-xs">
            Stock: <strong>{product.stock}</strong>
          </div>
        </div>

        {/* Title and Producer */}
        <h3 className="font-bold text-base text-[#232921] font-heading mb-1.5 hover:text-[#2D5A38] transition-colors">
          {product.name}
        </h3>

        <div className="space-y-1 text-xs text-[#6B7264] mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A38]" />
            <span className="text-[#232921] font-medium">Producer:</span> {product.farmer}
          </div>
          <div className="flex items-center gap-1.5 text-[#6B7264]">
            <MapPin className="w-3.5 h-3.5 text-[#8E9687]" />
            <span>{product.location} • Mandi Hub 04</span>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-3.5 border-t border-[#E5DCCF] flex items-center justify-between mt-auto">
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-[#8E9687]">Direct Farm Price</div>
          <div className="text-xl font-bold font-mono text-[#2D5A38]">
            ₹{product.price}
            <span className="text-xs font-normal text-[#6B7264]">/{product.unit}</span>
          </div>
        </div>

        <button
          onClick={() => onBuy(product)}
          className="flex items-center gap-1.5 bg-[#2D5A38] hover:bg-[#1E3D27] text-[#FAF7F2] font-semibold px-3.5 py-2 rounded-xl shadow-xs active:scale-95 transition-all text-xs cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Buy Direct</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Marketplace() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Vine Tomatoes",
      farmer: "Ramesh Kumar (Kisan FPO)",
      location: "Ludhiana, Punjab",
      price: 35,
      unit: "kg",
      stock: "500 kg",
      isDirect: true,
      organic: true,
      emoji: "🍅",
      category: "Vegetables"
    },
    {
      id: 2,
      name: "Golden Sharbati Wheat",
      farmer: "Malwa Agri Cooperative",
      location: "Karnal, Haryana",
      price: 28,
      unit: "kg",
      stock: "1,200 kg",
      isDirect: true,
      organic: true,
      emoji: "🌾",
      category: "Grains"
    },
    {
      id: 3,
      name: "Aromatic Basmati Rice",
      farmer: "Suresh Singh Rawat",
      location: "Bareilly, UP",
      price: 85,
      unit: "kg",
      stock: "850 kg",
      isDirect: true,
      organic: false,
      emoji: "🍚",
      category: "Grains"
    },
    {
      id: 4,
      name: "Nashik Red Onions",
      farmer: "Sahyadri Farmers Collective",
      location: "Nashik, Maharashtra",
      price: 24,
      unit: "kg",
      stock: "2,000 kg",
      isDirect: true,
      organic: false,
      emoji: "🧅",
      category: "Vegetables"
    },
    {
      id: 5,
      name: "Himachal Royal Gala Apples",
      farmer: "Devbhoomi Orchard FPO",
      location: "Shimla, HP",
      price: 130,
      unit: "kg",
      stock: "400 kg",
      isDirect: true,
      organic: true,
      emoji: "🍎",
      category: "Fruits"
    },
    {
      id: 6,
      name: "Kashmiri Walnuts (In Shell)",
      farmer: "Gulmarg Valley Growers",
      location: "Anantnag, J&K",
      price: 340,
      unit: "kg",
      stock: "150 kg",
      isDirect: true,
      organic: true,
      emoji: "🥜",
      category: "Dry Fruits"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt to load products from Railway API
    api.getProducts().then(remoteProducts => {
      if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
        setProducts(remoteProducts);
      }
    });
  }, []);

  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Dry Fruits'];

  const filtered = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-2 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5DCCF] shadow-xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5A38] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>DIRECT FARM MANDI MARKETPLACE • 0% MIDDLEMAN COMMISSIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232921] font-heading">
            Farm-Fresh Mandi Harvests
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7264] mt-1">
            Browse authentic lots directly from verified FPOs and local agricultural cooperatives.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="bg-[#F2ECE1] px-3.5 py-2 rounded-xl border border-[#E5DCCF]">
            <span className="text-[#8E9687] block text-[10px] uppercase font-mono">Verified FPOs</span>
            <span className="text-sm font-bold text-[#2D5A38]">12 Active</span>
          </div>
          <div className="bg-[#F2ECE1] px-3.5 py-2 rounded-xl border border-[#E5DCCF]">
            <span className="text-[#8E9687] block text-[10px] uppercase font-mono">Transit ETA</span>
            <span className="text-sm font-bold text-[#232921]">Same Day</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2D5A38] text-white shadow-xs'
                  : 'bg-white text-[#6B7264] hover:text-[#232921] hover:bg-[#F2ECE1] border border-[#E5DCCF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-[#8E9687] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, farmer, or district..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#E5DCCF] text-xs text-[#232921] placeholder-[#8E9687] focus:outline-none focus:border-[#2D5A38] transition-colors"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            index={idx}
            onBuy={() => navigate('/tracking')}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E5DCCF]">
          <p className="text-[#6B7264] text-sm">No farm harvests match your search criteria.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-2 text-xs font-semibold text-[#2D5A38] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
