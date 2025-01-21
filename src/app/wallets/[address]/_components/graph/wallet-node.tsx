import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { WalletDto } from "@/app/_api-types/wallets";

export type WalletNode = Node<WalletDto>;

export default function WalletNode({ data }: NodeProps<WalletNode>) {
  return (
    <>
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
        <div className="flex gap-4">
          {data.currency && (
            <div className="w-12 rounded-full">
              <AspectRatio ratio={1}>
                {data.currency.iconImg ? (
                  <Image
                    src={data.currency?.iconImg}
                    alt={data.currency?.symbol}
                    className="object-fit"
                    sizes="48px"
                    fill
                  />
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-black text-white rounded-full">
                    {data.currency.symbol}
                  </div>
                )}
              </AspectRatio>
            </div>
          )}

          <div className="ml-2">
            <div className="font-bold text-sm text-ellipsis overflow-hidden">
              {data.address}
            </div>
            <div className="text-gray-500">{data.type}</div>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </>
  );
}
