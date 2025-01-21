"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  ErrorGetWalletNeighborsResponse,
  WalletDto,
} from "@/app/_api-types/wallets";
import { NodeType, nodeTypes } from "./graph/node-types";
import { SuccessGetWalletNeighborsResponse } from "@/app/_api-types/wallets";

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
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<WalletDto>>([
    {
      id: `${wallet.address}-1`,
      type: NodeType.WALLET_NODE,
      data: wallet,
      position: { x: 0, y: 0 },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    setLoading(true);

    const fetchWalletNeighbors = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wallets/${srcWallet.address}/neighbors`
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
              ? successData.data.map((dstWallet, index) => ({
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
              ? successData.data.map((dstWallet) => ({
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
  }, [selectedWallets]);

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
              There was an error! Please try again later
            </p>
          </div>
        )}

        {!loading && !error && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(event, node) => {
              // Get the level of the clicked node
              const clickedLevel = Number(node.id.split("-")[1]);

              if (clickedLevel === 0) {
                return;
              }

              if (
                node.data.address === selectedWallets[0].address &&
                level === 1
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
            }}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            edgesReconnectable={false}
            nodesDraggable={false}
            className="rounded-sm"
          >
            <Controls showInteractive={false} />
          </ReactFlow>
        )}
      </CardContent>
    </Card>
  );
}
