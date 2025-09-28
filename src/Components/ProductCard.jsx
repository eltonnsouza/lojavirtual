import React from "react";
import { motion } from "framer-motion";
import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product, onProductClick, onShare }) {
  const categoryLabels = {
    shorts_jeans: "Shorts Jeans",
    bermudas_jeans: "Bermudas Jeans",
    calca_mom: "Calça Mom",
    calca_flair: "Calça Flair",
    bermuda_lycra: "Bermuda Lycra",
    shorts_linho: "Shorts 100% Linho",
    shorts_algodao: "Shorts 100% Algodão",
    calca_wide_leg: "Calça Wide Leg"
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-50">
        <img
          src={product.main_image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/90 hover:bg-white shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Heart functionality
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-white/90 hover:bg-white shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onShare(product);
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-amber-400 text-black text-xs font-semibold rounded-full">
              Destaque
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {categoryLabels[product.category]}
          </span>
          {product.brand && (
            <span className="text-xs text-gray-400">{product.brand}</span>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            R$ {product.price.toFixed(2)}
          </p>
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex space-x-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size}
                  className="w-6 h-6 bg-gray-100 text-gray-600 text-xs flex items-center justify-center rounded"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}