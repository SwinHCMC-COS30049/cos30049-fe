"use client";

import {
  WalletDto,
  WalletNetwork,
  SuccessGetWalletNetworkResponse,
} from "@/app/_api-types/wallets";
import { SankeyGraph } from "./d3/sankey-graph";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function SectionSankey({ wallet }: { wallet: WalletDto }) {
  const [data, setData] = useState<WalletNetwork>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const searchParams = useSearchParams();
  const depth = searchParams.get("depth") || "2";
  const maxWallets = searchParams.get("maxWallets") || "100";
  const type = searchParams.get("type") || "OUTGOING";
  const metric = searchParams.get("metric") || "totalTransactionValue";
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wallets/${wallet.address}/network?depth=${depth}&maxWallets=${maxWallets}&type=${type}`
      );
      const response = await res.json();

      if (response.statusCode === 200) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch network data");
      }
      setLoading(false);
    };

    fetchData();
  }, [depth, maxWallets, type, wallet.address]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newDepth = formData.get("depth") as string;
    const newMaxWallets = formData.get("maxWallets") as string;
    const newType = formData.get("type") as string;
    const newMetric = formData.get("metric") as string;

    router.push(
      `/wallets/${wallet.address}?depth=${newDepth}&maxWallets=${newMaxWallets}&type=${newType}&metric=${newMetric}`
    );
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-5 gap-4 p-4 border rounded-lg"
      >
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium">Depth</div>
          <Input
            id="depth"
            name="depth"
            type="number"
            defaultValue={depth}
            min="1"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium">Max Wallets</div>
          <Input
            id="maxWallets"
            name="maxWallets"
            type="number"
            defaultValue={maxWallets}
            min="10"
            max="1000"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium">Direction</div>
          <Select name="type" defaultValue={type}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OUTGOING">Outgoing</SelectItem>
              <SelectItem value="INCOMING">Incoming</SelectItem>
              <SelectItem value="ALL">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium">Display Metric</div>
          <Select name="metric" defaultValue={metric}>
            <SelectTrigger id="metric">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transactionCount">
                Transaction Count
              </SelectItem>
              <SelectItem value="totalTransactionValue">
                Transaction Value
              </SelectItem>
              <SelectItem value="totalGasUsed">Gas Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button type="submit">Update Graph</Button>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center min-h-[500px]">
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {error && (
          <div className="text-red-500 text-lg font-bold">Error: {error}</div>
        )}
        {data && (
          <div className="flex flex-col items-center justify-center">
            <SankeyGraph
              width={800}
              height={800}
              data={data}
              metric={
                metric as
                  | "transactionCount"
                  | "totalTransactionValue"
                  | "totalGasUsed"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
