import Image from "next/image";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { WalletDto } from "@/app/_api-types/wallets";

// Define the Neo4jWalletNode type based on Node with WalletDto data
export type Neo4jWalletNode = Node<WalletDto>;

// Neo4jWalletNode component to display wallet information in a graph node
export default function Neo4jWalletNode({
  data,
  selected,
}: NodeProps<Neo4jWalletNode>) {
  const isExpandable = data.transactionCount && data.transactionCount > 0;

  return (
    <>
      <div
        className={`relative w-[120px] h-[120px] rounded-full shadow-lg flex items-center justify-center ${
          selected ? "ring-4 ring-blue-300" : ""
        } ${
          isExpandable
            ? "cursor-pointer hover:scale-105 transition-transform"
            : ""
        }`}
        style={{
          background:
            data.type?.toLowerCase() === "contract" ? "#f8d7da" : "#d1e7dd",
          borderColor:
            data.type?.toLowerCase() === "contract" ? "#f5c2c7" : "#badbcc",
          borderWidth: "2px",
          borderStyle: "solid",
          boxShadow: isExpandable ? "0 0 15px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2 p-2 text-center w-full h-full">
          {data.currency && (
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
              {data.currency.iconImg ? (
                <Image
                  src={data.currency.iconImg}
                  alt={data.currency.symbol}
                  className="object-cover"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="w-full h-full bg-black text-white text-xs flex items-center justify-center">
                  {data.currency.symbol}
                </div>
              )}
            </div>
          )}
          <div className="text-xs font-medium w-full truncate px-2">
            {`${data.address.slice(0, 6)}...${data.address.slice(-4)}`}
          </div>
          <div className="text-[10px] text-gray-600 bg-white/50 px-2 py-0.5 rounded-full">
            {data.type}
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400"
      />
    </>
  );
}
