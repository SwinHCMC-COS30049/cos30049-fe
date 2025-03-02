import WalletNode from "./wallet-node";
import Neo4jWalletNode from "./neo4j-wallet-node";

export enum NodeType {
  WALLET_NODE = "walletNode",
  NEO4J_WALLET_NODE = "neo4jWalletNode"
}

export const nodeTypes = {
  [NodeType.WALLET_NODE]: WalletNode,
  [NodeType.NEO4J_WALLET_NODE]: Neo4jWalletNode
};