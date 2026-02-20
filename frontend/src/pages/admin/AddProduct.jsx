import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import ImageUpload from "@/components/ImageUpload";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (productData.productImg.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key !== "productImg") {
        formData.append(key, productData[key]);
      }
    });

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/product/add`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
        navigate("/dashboard/products");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="pt-25 min-h-screen bg-[#0f172a] text-white py-12 px-4 lg:pl-[300px]">
    <div className="max-w-6xl mx-auto space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#9CD5FF]">
          Add New Product
        </h1>
        <p className="text-gray-400 mt-1">
          Create a new product for your store
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-[#1e293b] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-xl">

            <h2 className="text-lg font-semibold text-gray-300">
              Basic Information
            </h2>

            <div className="space-y-2">
              <Label className="text-gray-400">Product Name</Label>
              <Input
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                className="bg-[#0f172a] border-gray-700 focus:border-[#9CD5FF] focus:ring-[#9CD5FF] text-white"
                placeholder="iPhone 15 Pro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Price</Label>
              <Input
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
                className="bg-[#0f172a] border-gray-700 focus:border-[#9CD5FF] focus:ring-[#9CD5FF] text-white"
                placeholder="₹ 0.00"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Brand</Label>
                <Input
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 focus:border-[#9CD5FF] text-white"
                  placeholder="Apple"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Category</Label>
                <Input
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="bg-[#0f172a] border-gray-700 focus:border-[#9CD5FF] text-white"
                  placeholder="Mobile"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Description</Label>
              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                rows={5}
                className="bg-[#0f172a] border-gray-700 focus:border-[#9CD5FF] text-white"
                placeholder="Enter product description..."
              />
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          <div className="bg-[#1e293b] border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Product Images
            </h2>

            <ImageUpload
              productData={productData}
              setProductData={setProductData}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#9CD5FF] hover:bg-[#7cc4f5] text-black font-semibold rounded-xl transition-all duration-300 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Creating...
              </span>
            ) : (
              "Create Product"
            )}
          </Button>

        </div>
      </form>
    </div>
  </div>
);

};

export default AddProduct;
