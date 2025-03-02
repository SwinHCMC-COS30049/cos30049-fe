"use client";

// Import necessary components and hooks
import { CircleHelp, LoaderCircle, Search, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { SuccessGetWalletsResponse, WalletDto } from "@/app/_api-types/wallets";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WalletCard } from "./wallet-card";
import { searchWallet } from "@/actions/wallet/search-wallet";
import { ActionResult } from "@/actions/action.type";
import SectionNeo4jGraph from "../[address]/_components/section-neo4j-graph";

const initialState = {
  success: false,
  message: "",
  payload: null,
};

const SectionWallet = () => {
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wallets, setWallets] = useState<WalletDto[]>([]);

  const [, action, pending] = useActionState(
    async (
      _previousState: ActionResult<SuccessGetWalletsResponse["data"]>,
      values: FormData
    ) => {
      const response = await searchWallet(values);
      setSearchQuery(values.get("searchQuery") as string);
      if (response.success) {
        setWallets(response.payload?.wallets || []);
      } else {
        setError(response.message || "An error occurred");
      }

      return response;
    },
    initialState
  );

  return (
    <div className="space-y-8">
      <section className="container mx-auto px-5 py-12 mt-20 flex flex-col gap-4 items-center">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Find wallet</h1>
          {searchQuery ? (
            <div className="text-center text-gray-500 mt-2">
              {`Found ${wallets.length} wallets for search query "${searchQuery}"`}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">
              Manage your digital assets securely
            </p>
          )}
        </div>

        {/* Search Section */}
        <div className="max-w-2xl w-full">
          <form action={action}>
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="Search by wallet address"
                name="searchQuery"
                className="w-full rounded-lg border border-gray-300"
              />
              <Button className="flex justify-center items-center" type="submit">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        {pending ? (
          <div className="flex items-center justify-center rounded-xl border p-4 w-full mt-8 h-[400px]">
            <LoaderCircle className="h-8 w-8 text-gray-500 animate-spin" />
          </div>
        ) : (
          <div className="rounded-xl border p-4 w-full mt-8">
            {error && (
              <div className="text-center text-red-500 font-semibold">
                {error}
              </div>
            )}

            <ScrollArea className="w-full h-[400px]">
              {wallets && wallets.length > 0 && (
                <div className="flex flex-col gap-4">
                  {wallets.map((wallet) => (
                    <div key={wallet.address}>
                      <WalletCard
                        wallet={wallet}
                        searchQuery={searchQuery}
                      />
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && wallets.length === 0 && (
                <div className="flex flex-col items-center gap-4 h-[400px] justify-center w-full">
                  <CircleHelp className="h-24 w-24 text-gray-500" />
                  <p>No wallets found</p>
                </div>
              )}

              {!searchQuery && (
                <div className="flex flex-col items-center gap-4 h-[400px] justify-center w-full">
                  <Wallet className="h-24 w-24 text-gray-500" />
                  <p>Search for a wallet to get started</p>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </section>

      {/* Graph View Section */}
      <section className="container mx-auto px-5 pb-12">
        <div className="rounded-xl border p-4">
          <h2 className="text-2xl font-semibold mb-4">Transaction Graph View</h2>
          {wallets.length > 0 ? (
            <SectionNeo4jGraph wallet={wallets[0]} />
          ) : (
            <div className="flex flex-col items-center gap-4 h-[400px] justify-center w-full">
              <CircleHelp className="h-24 w-24 text-gray-500" />
              <p>Search for a wallet to view its transaction graph</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SectionWallet;
