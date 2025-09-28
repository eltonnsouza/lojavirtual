import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCarousel from "./components/ProductCarousel";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // A função para carregar os produtos foi atualizada para usar a API Fetch.
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // Faz a requisição para o endpoint do JSON Server.
      const response = await fetch("http://localhost:3001/products");
      
      // Verifica se a resposta foi bem-sucedida (status 200 OK).
      if (!response.ok) {
        throw new Error("Erro na rede. Não foi possível carregar os produtos.");
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      // Você pode definir um estado de erro aqui para mostrar uma mensagem ao usuário.
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os produtos quando o componente é montado.
  useEffect(() => {
    loadProducts();
  }, []);

  // Filtra os produtos sempre que a categoria ou a lista de produtos muda.
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleShare = (product) => {
    const message = `🛍️ Confira este produto incrível!\n\n*${product.name}*\n💰 Por apenas R$ ${product.price.toFixed(2)}\n\n📱 Veja mais detalhes e faça seu pedido!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const categories = [
    "all", 
    "shorts_jeans", 
    "bermudas_jeans", 
    "calca_mom", 
    "calca_flair", 
    "bermuda_lycra", 
    "shorts_linho", 
    "shorts_algodao", 
    "calca_wide_leg"
  ];

  const getCategoryTitle = (category) => {
    const titles = {
      all: "Todos os Produtos",
      shorts_jeans: "Shorts Jeans",
      bermudas_jeans: "Bermudas Jeans",
      calca_mom: "Calças Mom", 
      calca_flair: "Calças Flair",
      bermuda_lycra: "Bermudas Lycra",
      shorts_linho: "Shorts 100% Linho",
      shorts_algodao: "Shorts 100% Algodão",
      calca_wide_leg: "Calças Wide Leg"
    };
    return titles[category] || "Produtos";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
            >
              Estilo que
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                Inspira
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Descubra nossa coleção exclusiva de roupas premium, 
              onde qualidade e design se encontram.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Products Carousel */}
        {products.some(p => p.featured) && (
          <section className="mb-20">
            <ProductCarousel
              products={products}
              onProductClick={handleProductClick}
              onShare={handleShare}
            />
          </section>
        )}

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {getCategoryTitle(selectedCategory)}
            </h2>
            <p className="text-gray-500">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onProductClick={handleProductClick}
                    onShare={handleShare}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShare={handleShare}
      />
    </div>
  );
}

export default App;
