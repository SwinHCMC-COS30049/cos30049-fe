"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  Edge,
  ControlButton,
  MiniMap,
  NodeMouseHandler,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  ErrorGetWalletNeighborsResponse,
  WalletDto,
} from "@/app/_api-types/wallets";
import { SuccessGetWalletNeighborsResponse } from "@/app/_api-types/wallets";
import { Neo4jWalletNode } from "./graph/neo4j-wallet-node";
import WalletNodeContextMenu, {
  WalletNodeContextMenuProps,
} from "./graph/wallet-node-context-menu";
import { TransactionDetailDialog } from "./transaction-detail-dialog";
import { NodeType, nodeTypes } from "./graph/node-types";

export default function SectionNeo4jGraph({
  wallet,
}: {
  wallet: WalletDto;
}) {
  const [selectedWallets, setSelectedWallets] = useState<WalletDto[]>([wallet]);
  const level = selectedWallets.length;
  const srcWallet = selectedWallets[selectedWallets.length - 1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [nodes, setNodes, onNodesChange] = useNodesState<Neo4jWalletNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [contextMenu, setContextMenu] = useState<WalletNodeContextMenuProps | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Handle node click to show wallet details
  const onNodeClick: NodeMouseHandler<Neo4jWalletNode> = useCallback(
    (event, node) => {
      setContextMenu({
        wallet: node.data,
      });
    },
    [setContextMenu]
  );

  const [neighborsData, setNeighborsData] = useState<any>(null);

  // Handle edge click to show transaction details
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      if (!neighborsData) return;
  
      const transaction = (neighborsData.data?.transactions || []).find(
        (tx: any) => tx.hash === edge.id
      );
      if (transaction) {
        setSelectedTransaction({
          ...transaction,
          sourceWallet: { address: transaction.sourceAddress },
          destinationWallet: { address: transaction.destinationAddress },
          transactionIndex: 0, // Default value if not available
        });
      }
    },
    [neighborsData]
  );

  // Handle pane click to close context menus
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      if (contextMenuRef.current?.contains(event.target as Node)) {
        return;
      }
      setContextMenu(null);
      setSelectedTransaction(null);
    },
    [setContextMenu]
  );

  // Prevent native context menu
  const onPaneRightClick = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
    },
    []
  );

  // Handle node right-click
  const onNodeRightClick: NodeMouseHandler<Neo4jWalletNode> = useCallback(
    (event, node) => {
      event.preventDefault();
      const clickedLevel = Number(node.id.split("-")[1]);

      if (
        node.data.address === selectedWallets[0].address &&
        (level === 1 || clickedLevel === 1)
      ) {
        return;
      }

      if (clickedLevel < level) {
        setNodes((prevNodes) => {
          return prevNodes.filter(
            (n) => Number(n.id.split("-")[1]) <= clickedLevel
          );
        });

        setEdges((prevEdges) => {
          return prevEdges.filter((e) => {
            const targetLevel = Number(e.target.split("-")[1]);
            return targetLevel <= clickedLevel;
          });
        });

        setSelectedWallets((prev) => {
          return [...prev.slice(0, clickedLevel), node.data];
        });

        return;
      }

      setSelectedWallets((prev) => [...prev, node.data]);
    },
    [selectedWallets, level, setEdges, setNodes]
  );

  // Reset graph to initial state
  const refreshGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedWallets([wallet]);
    setContextMenu(null);
  };

  // Fetch wallet data and update graph
  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      setError(undefined);

      try {
        // Fetch wallet details
        const detailsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/neo4j/wallets/${srcWallet.address}/details`
        );
        const detailsData = await detailsResponse.json();

        if (!detailsResponse.ok) {
          throw new Error(detailsData.message || "Failed to fetch wallet details");
        }

        // Fetch wallet neighbors
        const neighborsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/neo4j/wallets/${srcWallet.address}/neighbors`
        );
        const neighborsData = await neighborsResponse.json();

        if (!neighborsResponse.ok) {
          throw new Error(neighborsData.message || "Failed to fetch neighbors");
        }

        setNeighborsData(neighborsData);

        // Update nodes
        const sourceNode = {
          id: `${srcWallet.address}-${level}`,
          type: NodeType.NEO4J_WALLET_NODE,
          data: {
            ...srcWallet,
            type: detailsData.wallet?.type || "EOA",
            transactionCount: detailsData.wallet?.transactionCount || 0,
          },
          style: {
            background: detailsData.wallet?.type?.toLowerCase() === "contract" ? "#f8d7da" : "#d1e7dd",
            borderColor: detailsData.wallet?.type?.toLowerCase() === "contract" ? "#f5c2c7" : "#badbcc",
            borderRadius: "9999px"
          },
          position: { x: (level - 1) * 300, y: 0 },
        };

        const neighborNodes = (neighborsData.data?.neighbors || []).map((neighbor: any, index: number) => ({
          id: `${neighbor.address}-${level + 1}`,
          type: NodeType.NEO4J_WALLET_NODE,
          data: {
            address: neighbor.address,
            type: neighbor.type?.toLowerCase() || "eoa",
            transactionCount: neighbor.transactionCount || 0,
          },
          style: {
            background: neighbor.type?.toLowerCase() === "contract" ? "#f8d7da" : "#d1e7dd",
            borderColor: neighbor.type?.toLowerCase() === "contract" ? "#f5c2c7" : "#badbcc",
            borderRadius: "9999px"
          },
          position: {
            x: level * 400,
            y: (index - ((neighborsData.data?.neighbors || []).length - 1) / 2) * 150,
          },
        }));

        setNodes((prevNodes) => {
          const existingNodes = prevNodes.filter(
            (n) => Number(n.id.split("-")[1]) < level
          );
          return [...existingNodes, sourceNode, ...neighborNodes];
        });

        // Update edges
        const newEdges = (neighborsData.data?.transactions || []).map((tx: any) => ({
          id: `${tx.hash}`,
          source: `${tx.sourceAddress}-${level}`,
          target: `${tx.destinationAddress}-${level + 1}`,
          data: {
            value: tx.value || "0",
            timestamp: tx.blockTimestamp,
          },
          label: "Transaction",
          animated: true,
          style: { stroke: "#666", strokeWidth: 2 },
        }));

        setEdges((prevEdges) => {
          const existingEdges = prevEdges.filter(
            (e) => Number(e.target.split("-")[1]) <= level
          );
          return [...existingEdges, ...newEdges];
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [level, selectedWallets, srcWallet.address]);

  return (
    <Card className="w-full h-[800px]">
      <CardContent className="pt-6 h-full w-full">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onNodeContextMenu={onNodeRightClick}
            onPaneClick={onPaneClick}
            onPaneContextMenu={onPaneRightClick}
            fitView
            proOptions={{ hideAttribution: true }}
            nodesConnectable={false}
            edgesReconnectable={false}
            nodesDraggable={false}
            nodeTypes={nodeTypes}
            className="rounded-sm"
            zoomOnScroll={true}
            minZoom={0.25}
          >
            <Controls showInteractive={false} className="rounded-sm">
              <ControlButton onClick={refreshGraph}>
                <RefreshCcw />
              </ControlButton>
            </Controls>
            <MiniMap pannable zoomable className="rounded-sm" />
            <Background />
            {contextMenu && (
              <WalletNodeContextMenu
                ref={contextMenuRef}
                onClick={onPaneClick}
                {...contextMenu}
              />
            )}
            {selectedTransaction && (
              <TransactionDetailDialog
                transaction={selectedTransaction}
              >
                <div style={{ display: "none" }} />
              </TransactionDetailDialog>
            )}
          </ReactFlow>
        )}
      </CardContent>
    </Card>
  );
}