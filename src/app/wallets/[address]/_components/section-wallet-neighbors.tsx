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
  SuccessGetWalletNeighborsResponse,
} from "@/app/_api-types/wallets";
import { NodeType, nodeTypes } from "./graph/node-types";
import { WalletNode } from "./graph/wallet-node";
import WalletNodeContextMenu, {
  WalletNodeContextMenuProps,
} from "./graph/wallet-node-context-menu";

export default function SectionWalletNeighbors({
  wallet,
}: {
  wallet: WalletDto;
}) {
  const [selectedWallets, setSelectedWallets] = useState<WalletDto[]>([wallet]);
  const level = selectedWallets.length;
  const srcWallet = selectedWallets[selectedWallets.length - 1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [nodes, setNodes, onNodesChange] = useNodesState<WalletNode>([
    {
      id: `${wallet.address}-1`,
      type: NodeType.WALLET_NODE,
      data: wallet,
      position: { x: 0, y: 0 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [contextMenu, setContextMenu] =
    useState<WalletNodeContextMenuProps | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  // Handle node click to show context menu
  const onNodeClick: NodeMouseHandler<WalletNode> = useCallback(
    (event, node) => {
      setContextMenu({
        wallet: node.data,
      });
    },
    [setContextMenu]
  );

  // Handle pane click to close context menu
  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      // Prevent the context menu from closing when clicking on it
      if (contextMenuRef.current?.contains(event.target as Node)) {
        return;
      }
      setContextMenu(null);
    },
    [setContextMenu]
  );

  // Prevent native context menu from showing on right-click
  const onPaneRightClick = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
    },
    []
  );

  // Handle node right-click to update selected wallets and graph
  const onNodeRightClick: NodeMouseHandler<WalletNode> = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Get the level of the clicked node
      const clickedLevel = Number(node.id.split("-")[1]);

      if (
        node.data.address === selectedWallets[0].address &&
        (level === 1 || clickedLevel === 1)
      ) {
        return;
      }

      if (clickedLevel < level) {
        // Remove all nodes after the clicked level
        setNodes((prevNodes) => {
          return prevNodes.filter(
            (n) => Number(n.id.split("-")[1]) <= clickedLevel
          );
        });

        // Remove all the edges after the clicked level
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

  // Refresh the graph to initial state
  const refreshGraph = () => {
    setNodes([
      {
        id: `${wallet.address}-1`,
        type: NodeType.WALLET_NODE,
        data: wallet,
        position: { x: 0, y: 0 },
      },
    ]);
    setEdges([]);
    setSelectedWallets([wallet]);
    setContextMenu(null);
  };

  // Fetch wallet neighbors on component mount and when selected wallets change
  useEffect(() => {
    setLoading(true);

    const fetchWalletNeighbors = async () => {
      // Fetch the neighbors of the source wallet
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wallets/${srcWallet.address}/neighbors?type=OUTGOING`
      );
      const data = await response.json();

      if (response.ok) {
        const successData: SuccessGetWalletNeighborsResponse = data;

        if (!successData.data) {
          return;
        }

        setNodes((prevNodes) => {
          return [
            ...prevNodes,
            ...(successData.data
              ? successData.data.map((dstWallet: WalletDto, index: number) => ({
                  id: `${dstWallet.address}-${level}`,
                  type: NodeType.WALLET_NODE,
                  data: dstWallet,
                  position: {
                    x: selectedWallets.length * 600,
                    y: index * 100,
                  },
                }))
              : []),
          ];
        });

        setEdges((prevEdges) => {
          return [
            ...prevEdges,
            ...(successData.data
              ? successData.data.map((dstWallet: WalletDto) => ({
                  id: `${srcWallet.address}-${dstWallet.address}-${level}`,
                  source:
                    level === 1
                      ? `${srcWallet.address}-1`
                      : `${srcWallet.address}-${level - 1}`,
                  target: `${dstWallet.address}-${level}`,
                }))
              : []),
          ];
        });
      } else {
        const errorData: ErrorGetWalletNeighborsResponse = data;
        setError(errorData.message || "An error occurred");
      }
    };

    fetchWalletNeighbors();

    setLoading(false);
  }, [level, selectedWallets, setEdges, setNodes, srcWallet.address]);

  return (
    <Card>
      <CardContent className="pt-6 h-[600px]">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 font-semibold">
              There was an error! Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onNodeContextMenu={onNodeRightClick}
            onPaneClick={onPaneClick}
            onPaneContextMenu={onPaneRightClick}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            nodesConnectable={false}
            edgesReconnectable={false}
            nodesDraggable={false}
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
        )}
      </CardContent>
    </Card>
  );
}
