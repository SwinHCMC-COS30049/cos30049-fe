import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionWalletDetails from "./section-wallet-details";
import SectionWalletNeighbors from "./section-wallet-neighbors";
import { WalletDetailsDto } from "@/app/_api-types/wallets";
import { ReactFlowProvider } from "@xyflow/react";
import { TransactionsTable } from "./table/transactions-table";
import { notFound } from "next/navigation";
import SectionNeo4jGraph from "./section-neo4j-graph";
import SectionSankey from "./section-sankey";

export default function SectionWallet({ data }: { data: WalletDetailsDto }) {
  const { wallet } = data;

  if (!wallet) {
    notFound();
  }

  return (
    <div className="container mx-auto px-5 py-12 mt-20 space-y-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Wallet Details</h1>
        <div className="flex gap-2 pt-2">
          <span className="font-bold -mt-0.5">Address:</span>
          <p className="text-sm break-all">{wallet.address}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full max-w-lg">
          <TabsTrigger value="details" className="flex-1">
            Details
          </TabsTrigger>
          <TabsTrigger value="neighbors" className="flex-1">
            Neighbors
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
          <TabsTrigger value="neo4jgraph" className="flex-1">
            Neo4j Graph View
          </TabsTrigger>

          <TabsTrigger value="sankey" className="flex-1">
            Sankey
          </TabsTrigger>
        </TabsList>

        {/* Details Tab Content */}
        <TabsContent
          value="details"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <SectionWalletDetails data={data} />
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
          <TransactionsTable />
        </TabsContent>

        {/* Graph Tab Content */}
        <TabsContent
          value="neo4jgraph"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ReactFlowProvider>
            <SectionNeo4jGraph wallet={wallet} />
          </ReactFlowProvider>
        </TabsContent>

        <TabsContent
          value="sankey"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <SectionSankey wallet={wallet} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
