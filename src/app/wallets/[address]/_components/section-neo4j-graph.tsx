"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle, RefreshCcw, X } from "lucide-react";
import { format } from "date-fns";
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
import { NodeType, nodeTypes } from "./graph/node-types";

export default function SectionNeo4jGraph({ wallet }: { wallet: WalletDto }) {
  const [selectedWallets, setSelectedWallets] = useState<WalletDto[]>([wallet]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const level = selectedWallets.length;
  const srcWallet = selectedWallets[selectedWallets.length - 1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [nodes, setNodes, onNodesChange] = useNodesState<Neo4jWalletNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [contextMenu, setContextMenu] =
    useState<WalletNodeContextMenuProps | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [nodePositions, setNodePositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  // Calculate node position based on level and index
  const calculateNodePosition = (
    level: number,
    index: number,
    totalNodes: number
  ) => {
    const baseX = level * 400;
    const spacing = 200;
    const totalHeight = (totalNodes - 1) * spacing;
    const startY = -totalHeight / 2;
    return {
      x: baseX,
      y: startY + index * spacing,
    };
  };

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
        (tx: any) => tx.hash === edge.data?.hash
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

      // Check if the node has already been expanded
      const nodeExpandKey = `${node.data.address}-level-${clickedLevel}`;
      if (expandedNodes.has(nodeExpandKey)) {
        return;
      }

      if (
        node.data.address === selectedWallets[0].address &&
        (level === 1 || clickedLevel === 1)
      ) {
        return;
      }

      // Check if the node exists as a source in any transaction
      const isSource = neighborsData?.data?.transactions?.some(
        (tx: any) => tx.sourceAddress === node.data.address
      );

      // Check if the node exists as a destination in any transaction
      const isDestination = neighborsData?.data?.transactions?.some(
        (tx: any) => tx.destinationAddress === node.data.address
      );

      // Allow expansion if the node is either a source or a destination
      if (!isSource && !isDestination) {
        return; // Don't expand if the node is neither a source nor a destination
      }

      if (clickedLevel < level) {
        setNodes((prevNodes) => {
          // Keep contract nodes and nodes at or below clicked level
          return prevNodes.filter((n) => {
            const nodeLevel = Number(n.id.split("-")[1]);
            return (
              nodeLevel <= clickedLevel ||
              n.data.type?.toLowerCase() === "contract"
            );
          });
        });

        setEdges((prevEdges) => {
          return prevEdges.filter((e) => {
            const targetLevel = Number(e.target.split("-")[1]);
            const sourceLevel = Number(e.source.split("-")[1]);
            return targetLevel <= clickedLevel || sourceLevel <= clickedLevel;
          });
        });

        setSelectedWallets((prev) => {
          return [...prev.slice(0, clickedLevel), node.data];
        });

        // Clear expanded nodes after this level
        setExpandedNodes((prev) => {
          const newExpandedNodes = new Set(prev);
          Array.from(prev).forEach(key => {
            if (key.includes('-level-')) {
              const keyLevel = parseInt(key.split('-level-')[1]);
              if (keyLevel > clickedLevel) {
                newExpandedNodes.delete(key);
              }
            }
          });
          return newExpandedNodes;
        });

        return;
      }

      // Add the node to expanded nodes set
      setExpandedNodes((prev) => new Set([...prev, nodeExpandKey]));
      setSelectedWallets((prev) => [...prev, node.data]);
    },
    [selectedWallets, level, setEdges, setNodes, expandedNodes, neighborsData]
  );

  // Reset graph to initial state
  const refreshGraph = () => {
    setNodes([]);
    setEdges([]);
    setSelectedWallets([wallet]);
    setContextMenu(null);
    setExpandedNodes(new Set());
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
          throw new Error(
            detailsData.message || "Failed to fetch wallet details"
          );
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
          id: level === 1 
            ? `${srcWallet.address}-${level}-root-src` 
            : `${srcWallet.address}-${level}-from-${selectedWallets[level-2]?.address || 'unknown'}-src`,
          type: NodeType.NEO4J_WALLET_NODE,
          data: {
            ...srcWallet,
            type: detailsData.wallet?.type || "EOA",
            transactionCount: detailsData.wallet?.transactionCount || 0,
          },
          style: {
            background:
              detailsData.wallet?.type?.toLowerCase() === "contract"
                ? "#f8d7da"
                : "#d1e7dd",
            borderColor:
              detailsData.wallet?.type?.toLowerCase() === "contract"
                ? "#f5c2c7"
                : "#badbcc",
            borderRadius: "9999px",
          },
          position: nodePositions[srcWallet.address] || {
            x: (level - 1) * 400,
            y: 0,
          },
          draggable: true,
        };

        const neighborNodes = (neighborsData.data?.neighbors || []).map(
          (neighbor: any, index: number) => ({
            id: `${neighbor.address}-${level + 1}`,
            type: NodeType.NEO4J_WALLET_NODE,
            data: {
              id: neighbor.address,
              address: neighbor.address,
              type: neighbor.type?.toLowerCase() || "eoa",
              transactionCount: neighbor.transactionCount || 0,
              balance: 0, // Add required balance field
            },
            style: {
              background:
                neighbor.type?.toLowerCase() === "contract"
                  ? "#f8d7da"
                  : "#d1e7dd",
              borderColor:
                neighbor.type?.toLowerCase() === "contract"
                  ? "#f5c2c7"
                  : "#badbcc",
              borderRadius: "9999px",
            },
            position: calculateNodePosition(
              level + 1,
              index,
              (neighborsData.data?.neighbors || []).length
            ),
            draggable: true,
          })
        );

        setNodes((prevNodes) => {
          // Filter out any existing nodes at the same level or higher
          const existingNodes = prevNodes.filter(
            (n) =>
              Number(n.id.split("-")[1]) <= level ||
              n.data.type?.toLowerCase() === "contract"
          );

          // Create a set of existing nodes at current level + 1 for quick lookup
          const existingNodesAtNextLevel = new Set(
            existingNodes
              .filter(n => Number(n.id.split("-")[1]) === level + 1)
              .map(node => node.data.address)
          );

          // Update source node position if it already exists
          const existingSourceNode = existingNodes.find(
            (n) => n.data.address === srcWallet.address && 
                   Number(n.id.split("-")[1]) === level
          );
          
          if (existingSourceNode) {
            sourceNode.position = existingSourceNode.position;
          }

          // Only add neighbor nodes that don't already exist at the current level + 1
          // AND ensure we never create a node for the current source wallet address
          const filteredNeighborNodes = [];
          for (const neighbor of neighborNodes) {
            // Skip this neighbor if:
            // 1. Its address already exists at current level + 1
            // 2. It's the same as the source wallet (avoid self-connections)
            if (
              typeof neighbor.data?.address === "string" &&
              !existingNodesAtNextLevel.has(neighbor.data.address) &&
              neighbor.data.address !== srcWallet.address
            ) {
              filteredNeighborNodes.push(neighbor);
            }
          }

          return [...existingNodes, sourceNode, ...filteredNeighborNodes];
        });

        // Update edges - filter out transactions that connect to the source wallet
        const newEdges = (neighborsData.data?.transactions || [])
          // Filter out transactions where source and destination are the same or 
          // where the destination is the same as the source wallet
          .filter((tx: any) => 
            tx.sourceAddress !== tx.destinationAddress && 
            tx.destinationAddress !== srcWallet.address
          )
          .map((tx: any) => {
            // Create a unique ID for the edge
            return {
              id: `${tx.hash}-from-${tx.sourceAddress}-to-${tx.destinationAddress}-level-${level}`,
              source: sourceNode.id, // Use the actual source node ID
              target: `${tx.destinationAddress}-${level + 1}`,
              data: {
                value: tx.value || "0",
                timestamp: tx.blockTimestamp,
                hash: tx.hash, // Store original hash in data for reference
              },
              label: `${tx.value || "0"} ETH`,
              labelStyle: { fill: "#666", fontSize: 10 },
              labelBgStyle: { fill: "#fff", fillOpacity: 0.8 },
              labelBgPadding: [4, 2],
              style: {
                stroke: "#666",
                strokeWidth: 2,
                strokeOpacity: 0.8,
              },
              markerEnd: {
                type: "arrowclosed",
                color: "#666",
                width: 20,
                height: 20,
              },
            };
          });

        setEdges((prevEdges) => {
          const existingEdges = prevEdges.filter((e) => {
            // Extract the level from the target
            const targetLevel = Number(e.target.split("-")[1]);
            // Also handle source nodes with the -src suffix
            const sourceParts = e.source.split("-");
            const sourceLevel = Number(sourceParts[1]);
            return targetLevel <= level || sourceLevel <= level;
          });
          return [...existingEdges, ...newEdges];
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [
    level,
    nodePositions,
    selectedWallets,
    setEdges,
    setNodes,
    srcWallet,
    srcWallet.address,
  ]);

  return (
    <Card className="w-full h-[800px] relative">
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
          <>
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
              nodesDraggable={true}
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
            </ReactFlow>

            {/* Transaction Details Side Panel */}
            {selectedTransaction && (
              <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-lg border-l border-gray-200 overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">
                      Transaction Details
                    </h3>
                    <button
                      onClick={() => setSelectedTransaction(null)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Hash
                      </label>
                      <p className="mt-1 text-sm break-all">
                        {selectedTransaction.hash}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        From
                      </label>
                      <p className="mt-1 text-sm break-all">
                        {selectedTransaction.sourceAddress}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        To
                      </label>
                      <p className="mt-1 text-sm break-all">
                        {selectedTransaction.destinationAddress}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Value
                      </label>
                      <p className="mt-1 text-sm">
                        {selectedTransaction.value || "0"} ETH
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Timestamp
                      </label>
                      <p className="mt-1 text-sm">
                        {selectedTransaction.blockTimestamp
                          ? (() => {
                              try {
                                // Extract timestamp value from object if needed
                                const timestampValue =
                                  typeof selectedTransaction.blockTimestamp ===
                                  "object"
                                    ? selectedTransaction.blockTimestamp.low ||
                                      selectedTransaction.blockTimestamp.value
                                    : selectedTransaction.blockTimestamp;

                                // Convert to number if it's not already
                                const timestamp = Number(timestampValue);

                                if (!isNaN(timestamp)) {
                                  const dateValue =
                                    timestamp < 10000000000
                                      ? new Date(timestamp * 1000)
                                      : new Date(timestamp);
                                  return format(dateValue, "PPpp");
                                }
                                return "Invalid timestamp";
                              } catch (error) {
                                console.error("Error formatting date:", error);
                                return "Date conversion error";
                              }
                            })()
                          : "No timestamp available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
