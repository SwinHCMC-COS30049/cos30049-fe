"use client";
import React from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SectionWallet = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <section className="container mx-auto px-5 py-12 mt-20 space-y-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">crypto. Wallet</h1>
        <p className="text-gray-600 mt-2">
          Manage your digital assets securely
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by wallet address or transaction..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b">
            <h2 className="text-xl font-semibold">Total Balance</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">$0.00</p>
            <p className="text-sm text-gray-500 mt-1">Across all wallets</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-500">No recent transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition">
                Send Crypto
              </button>
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition">
                Receive Crypto
              </button>
              <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition">
                Buy Crypto
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500">
        <p>Secure crypto management • 24/7 Support • Real-time tracking</p>
      </div>
    </section>
  );
};

export default SectionWallet;
