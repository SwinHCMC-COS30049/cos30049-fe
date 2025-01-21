import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import SectionWalletDetails from "./section-wallet-details";
import SectionWalletNeighbors from "./section-wallet-neighbors";
import TransactionTable from "./section-history-table";
import { WalletDto } from "@/app/_api-types/wallets";

export default function SectionWallet({ wallet }: { wallet: WalletDto }) {
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
          <SectionWalletDetails />
        </TabsContent>

        {/* Neighbors Tab Content */}
        <TabsContent value="neighbors">
          <SectionWalletNeighbors wallet={wallet} />
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <TransactionTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
