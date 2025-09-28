
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  const categoryLabels = {
    all: "Todos",
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
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <motion.div
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gray-900 text-white shadow-lg"
                : "border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {categoryLabels[category]}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
