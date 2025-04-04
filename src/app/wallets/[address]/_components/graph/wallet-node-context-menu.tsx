import { WalletDto } from "@/app/_api-types/wallets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export type WalletNodeContextMenuProps = {
  wallet: WalletDto;
} & React.HTMLProps<HTMLDivElement>;

export default function WalletNodeContextMenu({
  wallet,
  ...props
}: WalletNodeContextMenuProps) {
  return (
    <Card
      className="absolute z-10 w-[300px] m-[15px] p-4 flex flex-col gap-4 bg-white/95 backdrop-blur border shadow-lg"
      {...props}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold">Wallet Details</div>
        <div className="text-xs text-gray-500">Click outside to close</div>
      </div>

      {/* Address Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Address</div>
        <div className="text-xs font-mono bg-gray-50 p-2 rounded-md break-all">
          {wallet.address}
        </div>
      </div>

      {/* Type Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Type</div>
        <div className="text-xs">
          <span
            className={`px-2 py-1 rounded-full ${
              wallet.type?.toLowerCase() === "contract"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {wallet.type}
          </span>
        </div>
      </div>

      {/* Currency Section */}
      {wallet.currency && (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">Currency</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {wallet.currency.iconImg ? (
                <img
                  src={wallet.currency.iconImg}
                  alt={wallet.currency.symbol}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs">{wallet.currency.symbol}</span>
              )}
            </div>
            <span className="text-sm">{wallet.currency.name}</span>
          </div>
        </div>
      )}

      {/* View Wallet Button */}
      <Link href={`/wallets/${wallet.address}`} className="mt-2">
        <Button className="w-full">View Wallet Details</Button>
      </Link>
    </Card>
  );
}
