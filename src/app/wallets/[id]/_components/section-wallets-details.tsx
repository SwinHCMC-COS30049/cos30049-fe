import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SectionWalletDetails() {
  return (
    <div className="container mx-auto px-5 py-12 mt-20 space-y-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wallet Details</h1>
        <p className="font-mono text-sm text-gray-600 mt-2">
          0x742d35Cc6634C0532925a3b844Bc454e4438f44e
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="details" className="flex-1">
            Details
          </TabsTrigger>
          <TabsTrigger value="neighbors" className="flex-1">
            Neighbors
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>

        {/* Details Tab Content */}
        <TabsContent value="details" className="space-y-6">
          {/* Balance Overview */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Balance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Balance</p>
                  <p className="text-2xl font-bold">12.458 ETH</p>
                  <p className="text-sm text-gray-500">$23,456.78 USD</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">24h Change</p>
                  <p className="text-lg font-semibold text-green-600">
                    +0.234 ETH
                  </p>
                  <p className="text-sm text-green-600">+2.45%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">First Transaction</p>
                  <p className="text-lg font-semibold">255 days ago</p>
                  <p className="text-sm text-gray-500">June 1, 2023</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <ArrowDownRight className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Received</p>
                      <p className="text-sm text-gray-500">
                        From: 0x742d...f44e
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">0.5 ETH</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sent</p>
                      <p className="text-sm text-gray-500">To: 0x123...a89b</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1.2 ETH</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Holdings */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Token Holdings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      ETH
                    </div>
                    <div>
                      <p className="font-medium">Ethereum</p>
                      <p className="text-sm text-gray-500">ETH</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">12.458 ETH</p>
                    <p className="text-sm text-gray-500">$23,456.78</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      UNI
                    </div>
                    <div>
                      <p className="font-medium">Uniswap</p>
                      <p className="text-sm text-gray-500">UNI</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">150 UNI</p>
                    <p className="text-sm text-gray-500">$1,234.56</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Neighbors Tab Content */}
        <TabsContent value="neighbors">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500">
                Connected wallets will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500">
                Transaction history will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
