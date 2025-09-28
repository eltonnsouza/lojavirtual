
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

export default function ProductModal({ product, isOpen, onClose, onShare }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) return null;

  const allImages = [product.main_image, ...(product.additional_images || [])];
  
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

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => prev === 0 ? allImages.length - 1 : prev - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Images Section */}
          <div className="relative bg-gray-50">
            <div className="aspect-square relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {categoryLabels[product.category]}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h1>
                    {product.brand && (
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="text-3xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </div>

                {product.description && (
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                )}

                {product.material && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Material</h3>
                    <p className="text-sm text-gray-600">{product.material}</p>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Tamanhos</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                            selectedSize === size
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-6"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full py-6"
                onClick={() => onShare(product)}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}