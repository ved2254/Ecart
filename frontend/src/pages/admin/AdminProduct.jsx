import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Filter
  let filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
  }
  if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
  }

  const deleteProductHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/product/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (res.data.success) {
        dispatch(setProducts(products.filter((p) => p._id !== id)));
        toast.success("Product deleted");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
  <div className="pt-25 min-h-screen bg-[#0f172a] text-white px-4 py-10 lg:pl-[300px]">
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          🛍 Product Management
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-[#1e293b] border-gray-700 text-white placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Sort */}
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
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No products found.
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6
          "
        >
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              className="bg-[#1e293b] border border-gray-700 p-4 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-[#0f172a]">
                <img
                  src={product.productImg[0]?.url}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Info */}
              <div className="mt-4 space-y-1">
                <h2 className="font-semibold text-white line-clamp-1">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-400">
                  {product.brand}
                </p>
                <p className="font-bold text-lg text-green-400">
                  ₹{product.productPrice}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4">

                {/* Edit */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-[#1e293b] text-white border-gray-700">
                    <DialogHeader>
                      <DialogTitle>
                        Edit functionality here
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      className="flex gap-2 bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-[#1e293b] text-white border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete product?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteProductHandler(product._id)
                        }
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default AdminProduct;
