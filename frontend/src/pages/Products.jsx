import FilterSidebar from '@/components/FilterSidebar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { setProducts } from '@/redux/productSlice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
  const { products } = useSelector(store => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // number of products per page

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/getallproducts`);
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering + sorting
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter(p => p.brand === brand);
    }

    filtered = filtered.filter(p => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]);

    if (sortOrder === "lowToHigh") {
  filtered.sort((a, b) =>
    Number(a.productPrice) - Number(b.productPrice)
  );
} else if (sortOrder === "highToLow") {
  filtered.sort((a, b) =>
    Number(b.productPrice) - Number(a.productPrice)
  );
}


    dispatch(setProducts(filtered));
    setCurrentPage(1); // reset to first page whenever filters change
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);


  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
  <div className="pt-24 pb-16 bg-slate-950 min-h-screen text-white">
    <div className="max-w-7xl mx-auto px-6">

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setShowFilter(prev => !prev)}
          className="w-full bg-slate-800 border border-slate-700"
        >
          Toggle Filters
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <div className="md:w-72 w-full">
          <div className="md:block hidden">
            <FilterSidebar
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              category={category}
              setCategory={setCategory}
              allProducts={allProducts}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1 space-y-8">

          {/* Sort */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Products ({products.length})
            </h2>
            <Select onValueChange={(v) => setSortOrder(v)}>
                        <SelectTrigger className="w-full sm:w-48 bg-[#1e293b] border-gray-700 text-white">
                          <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e293b] text-white border-gray-700">
                          <SelectItem value="lowToHigh">
                            Price: Low → High
                          </SelectItem>
                          <SelectItem value="highToLow">
                            Price: High → Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
          </div>

          {/* Product Grid */}
          <div className="grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5 
              gap-6">

            {loading ? (
              <p>Loading...</p>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-slate-800 border border-slate-700"
            >
              Prev
            </Button>

            <span className="text-slate-400">
              Page {currentPage} of {totalPages || 1}
            </span>

            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-slate-800 border border-slate-700"
            >
              Next
            </Button>
          </div>

        </div>
      </div>
    </div>
  </div>
);

};

export default Product;
