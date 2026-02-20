import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Stepper from "@/components/Stepper";
import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
import axios from "axios";
import { toast } from "sonner";
// import { Import } from "lucide-react";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { cart, addresses, selectedAddress } = useSelector((store) => store.product);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cart?.totalPrice
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2))
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setShowForm(false);
  };

  console.log('cart', cart);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const accessToken = localStorage.getItem("accessToken")
  // const handlePayment = async () => {
  //   try {
  //     // Step 1: Create order on backend
  //     console.log({ tax, shipping, total, products: cart?.items });
  //     const { data } = await axios.post("http://localhost:8000/api/v1/orders/create-order", {
  //       products: cart?.items?.map(item => ({
  //         productId: item.productId._id,   // rename _id to productId
  //         quantity: item.quantity,
  //       })),
  //       tax: tax,
  //       shipping: shipping,
  //       amount: total,
  //       currency: "INR"
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });

  //     if (!data.success) return alert("Something went wrong");

  //     // Step 2: Razorpay Checkout
  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY_ID, // replace with your Razorpay Key ID
  //       amount: data.order.amount,
  //       currency: data.order.currency,
  //       name: "Ekart",
  //       description: "Order Payment",
  //       order_id: data.order.id,
  //       handler: async function (response) {
  //         console.log('response', response);

  //         // Step 3: Verify payment
  //         const verifyRes = await axios.post("http://localhost:8000/api/v1/orders/verify-payment", response, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`
  //           }
  //         });

  //         if (verifyRes.data.success) {
  //           toast.success("✅ Payment Successful!");
  //           navigate("/order-success"); // redirect after payment success
  //           dispatch(setCart({ items: [], totalPrice: 0 }));
  //         } else {
  //           toast.error("❌ Payment Verification Failed");
  //         }
  //       },
  //       prefill: {
  //         name: formData.fullName,
  //         email: formData.email,
  //         contact: formData.phone,
  //       },
  //       theme: {
  //         color: "#F472B6", // pink theme
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong while processing payment");
  //   }
  // }
  const handlePayment = async () => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/create-order`,
    // const { data } = await axios.post("http://localhost:8000/api/v1/orders/create-order",
        
        {
      products: cart?.items?.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      tax,
      shipping,
      amount: total,
      currency: "INR",
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!data.success) return toast.error("Something went wrong");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Ekart",
      description: "Order Payment",
      order_id: data.order.id,

      handler: async function (response) {
        // ✅ SUCCESS payment flow
        try {
          const verifyRes = await axios.post(
            "http://localhost:8000/api/v1/orders/verify-payment",
            response,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          if (verifyRes.data.success) {
            toast.success("✅ Payment Successful!");
            dispatch(setCart({ items: [], totalPrice: 0 }));
            navigate("/order-success");
          } else {
            toast.error("❌ Payment Verification Failed");
          }
        } catch (error) {
          toast.error("Error verifying payment");
        }
      },

      modal: {
        ondismiss: async function () {
          // ❌ Handle user closing the popup
          await axios.post("http://localhost:8000/api/v1/orders/verify-payment", {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          }, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          toast.error("Payment cancelled or failed");
        },
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#F472B6" },
    };

    const rzp = new window.Razorpay(options);

    // ❌ Listen for payment failures
    rzp.on("payment.failed", async function (response) {
      await axios.post("http://localhost:8000/api/v1/orders/verify-payment", {
        razorpay_order_id: data.order.id,
        paymentFailed: true,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      toast.error("Payment Failed. Please try again.");
    });

    rzp.open();
  } catch (error) {
    // console.error(error);
    toast.error("Something went wrong while processing payment");
  }
};


  return (
  <div className="pt-20 pb-16 bg-slate-950 min-h-screen text-white">
    <div className="max-w-7xl mx-auto px-4">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-5">

              {showForm ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Add Shipping Address
                  </h2>

                  <div>
                    <Label>Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>

                  <div>
                    <Label>Address</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-slate-900 border-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="bg-slate-900 border-slate-700"
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="bg-slate-900 border-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Zip</Label>
                      <Input
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="bg-slate-900 border-slate-700"
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="bg-slate-900 border-slate-700"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSave}
                    className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
                  >
                    Save & Continue
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Saved Addresses
                  </h2>

                  <div className="space-y-4">
                    {addresses.map((addr, index) => (
                      <div
                        key={index}
                        onClick={() => dispatch(setSelectedAddress(index))}
                        className={`p-4 rounded-lg border cursor-pointer relative transition 
                          ${
                            selectedAddress === index
                              ? "border-purple-500 bg-slate-700"
                              : "border-slate-600 bg-slate-800"
                          }`}
                      >
                        <p className="font-medium">{addr.fullName}</p>
                        <p className="text-sm text-slate-400">
                          {addr.address}, {addr.city}, {addr.state}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteAddress(index));
                          }}
                          className="absolute top-2 right-3 text-red-400 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setShowForm(true)}
                  >
                    + Add New Address
                  </Button>

                  <Button
                    disabled={selectedAddress === null}
                    onClick={handlePayment}
                    className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
                  >
                    Proceed To Checkout
                  </Button>
                </>
              )}

            </CardContent>
          </Card>
        </div>

        {/* RIGHT SECTION - SUMMARY */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700 sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal?.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping?.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax?.toLocaleString("en-IN")}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total?.toLocaleString("en-IN")}</span>
              </div>

              <div className="text-sm text-slate-400 pt-4 space-y-1">
                <p>• Free shipping over ₹50</p>
                <p>• 30-day return policy</p>
                <p>• Secure checkout</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  </div>
);

};

export default AddressForm;