import { Card } from "@/components/ui/card";
import { formatEther } from "viem";
import React from "react";

export type TransactionEdgeContextMenuProps = {
  hash: string;
  value: string;
  sourceAddress: string;
  destinationAddress: string;
  blockTimestamp: number;
  blockNumber: number;
  blockHash: string;
  gas: string;
  gasUsed: string;
  gasPrice: string;
  transactionFee: string;
} & React.HTMLProps<HTMLDivElement>;

export default function TransactionEdgeContextMenu({
  hash,
  value,
  sourceAddress,
  destinationAddress,
  blockTimestamp,
  blockNumber,

  gasUsed,
  gasPrice,
  transactionFee,
  ...props
}: TransactionEdgeContextMenuProps) {
  // Function to safely format ETH value
  const formatEthValue = (value: string) => {
    try {
      return value === "0" ? "0 ETH" : `${formatEther(BigInt(value))} ETH`;
    } catch (error) {
      console.error("Error formatting ETH value:", error);
      return "Invalid value";
    }
  };

  return (
    <Card
      className="absolute z-10 w-[400px] m-[15px] p-4 flex flex-col gap-4 bg-white/95 backdrop-blur border shadow-lg"
      {...props}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold">Transaction Details</div>
        <div className="text-xs text-gray-500">Click outside to close</div>
      </div>

      {/* Transaction Hash Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">
          Transaction Hash
        </div>
        <div className="text-xs font-mono bg-gray-50 p-2 rounded-md break-all">
          {hash}
        </div>
      </div>

      {/* Value Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Value</div>
        <div className="text-xs font-mono">{formatEthValue(value)}</div>
      </div>

      {/* Addresses Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">From</div>
          <div className="text-xs font-mono bg-gray-50 p-2 rounded-md break-all">
            {sourceAddress}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">To</div>
          <div className="text-xs font-mono bg-gray-50 p-2 rounded-md break-all">
            {destinationAddress}
          </div>
        </div>
      </div>

      {/* Block Info Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">Block Number</div>
          <div className="text-xs font-mono">{blockNumber || "N/A"}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">Timestamp</div>
          <div className="text-xs font-mono">
            {blockTimestamp
              ? new Date(blockTimestamp * 1000).toLocaleString()
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Gas Info Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">Gas Used</div>
          <div className="text-xs font-mono">{gasUsed || "N/A"}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium text-gray-600">Gas Price</div>
          <div className="text-xs font-mono">
            {gasPrice ? `${gasPrice} Wei` : "N/A"}
          </div>
        </div>
      </div>

      {/* Transaction Fee Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-gray-600">Transaction Fee</div>
        <div className="text-xs font-mono">
          {formatEthValue(transactionFee)}
        </div>
      </div>
    </Card>
  );
}
