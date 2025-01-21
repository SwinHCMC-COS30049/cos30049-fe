import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import SectionWalletDetails from "./section-wallet-details";
import SectionWalletNeighbors from "./section-wallet-neighbors";
import TransactionTable from "./graph/section-history-table";
import { WalletDto } from "@/app/_api-types/wallets";
import { ReactFlowProvider } from "@xyflow/react";

export default function SectionWallet({ wallet }: { wallet: WalletDto }) {
  return (
    <div className="container mx-auto px-5 py-12 mt-20 space-y-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wallet Details</h1>
        <div className="flex items-center gap-2">
          <span className="font-bold">Address:</span>
          <p className=" text-sm ">{wallet.address}</p>
        </div>
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
        <TabsContent
          value="details"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <SectionWalletDetails />
        </TabsContent>

        {/* Neighbors Tab Content */}
        <TabsContent
          value="neighbors"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ReactFlowProvider>
            <SectionWalletNeighbors wallet={wallet} />
          </ReactFlowProvider>
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent
          value="history"
          forceMount
          className="data-[state=inactive]:hidden"
        >
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
