import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(
      "http://localhost:8000/api/v1/orders/sales",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("FULL RESPONSE:", res.data);


    if (res.data.success) {
      const data = res.data.data || res.data; // handles both cases

      setStats({
        totalUsers: data.totalUsers || 0,
        totalProducts: data.totalProducts || 0,
        totalOrders: data.totalOrders || 0,
        totalSales: data.totalSales || 0,
        salesByDate: Array.isArray(data.salesByDate)
          ? data.salesByDate
          : [],
        });
        console.log("Sales By Date:", data.salesByDate);
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 pb-16 lg:pl-[350px]">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight">
          📊 Sales Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {stats.totalUsers}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {stats.totalProducts}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600 to-pink-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {stats.totalOrders}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              ₹{stats.totalSales.toLocaleString()}
            </CardContent>
          </Card>

        </div>

        {/* Chart Section */}
        <Card className="bg-[#1e293b] border border-gray-700 shadow-2xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg">
              Sales (Last 30 Days)
            </CardTitle>
          </CardHeader>

          {/* IMPORTANT: h-[350px] instead of style height */}
          <CardContent className="h-[350px]">

            {stats.salesByDate.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No sales data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.salesByDate}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminSales;
