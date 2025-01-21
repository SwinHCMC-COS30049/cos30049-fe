import { NodeTypes } from "@xyflow/react";
import WalletNode from "./wallet-node";

export enum NodeType {
  "WALLET_NODE" = "WALLET_NODE",
}

export const nodeTypes: NodeTypes = {
  [NodeType.WALLET_NODE]: WalletNode,
};
