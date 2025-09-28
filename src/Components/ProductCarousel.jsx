import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, onProductClick, onShare }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  if (featuredProducts.length === 0) return null;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Produtos em Destaque</h2>
          <p className="text-gray-600">Descubra nossa seleção especial desta temporada</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border-gray-200 hover:border-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="w-10 h-10 rounded-full border-gray-200 hover:border-gray-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div 
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[600px]">
          <AnimatePresence mode="wait">
            {featuredProducts.slice(currentIndex, currentIndex + 3).map((product, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onShare={onShare}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-gray-900 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}