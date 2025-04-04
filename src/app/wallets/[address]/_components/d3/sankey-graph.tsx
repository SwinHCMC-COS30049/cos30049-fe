import { scaleOrdinal } from "d3";
import {
  sankey,
  sankeyJustify,
  sankeyLinkHorizontal,
  SankeyNode,
  SankeyLink,
  SankeyGraph as SankeyGraphType,
} from "d3-sankey";
import { WalletNetwork } from "@/app/_api-types/wallets";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

const MARGIN_Y = 25;
const MARGIN_X = 5;
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

type SankeyProps = {
  width: number;
  height: number;
  data: WalletNetwork;
  metric?: "transactionCount" | "totalTransactionValue" | "totalGasUsed";
};

// Extended node type that includes our custom properties
interface SankeyNodeExtended extends SankeyNode<any, any> {
  address: string;
  category: string;
  name: string;
  wallet: any;
}

// Extended link type
interface SankeyLinkExtended extends SankeyLink<any, any> {
  source: SankeyNodeExtended;
  target: SankeyNodeExtended;
  transactionData?: {
    count: number;
    totalValue?: number;
    totalGasUsed?: number;
  };
}

export const SankeyGraph = ({
  width,
  height,
  data,
  metric = "totalTransactionValue",
}: SankeyProps) => {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [selectedLink, setSelectedLink] = useState<SankeyLinkExtended | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);

  const allGroups = [...new Set(data.nodes.map((d) => d.wallet.type))].sort();
  const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

  // Transform data into format expected by d3-sankey
  const sankeyNodes = data.nodes.map((node) => ({
    address: node.wallet.address,
    name: node.wallet.currency?.symbol || "Unknown",
    category: node.wallet.type,
    wallet: node.wallet, // Store the full wallet object for dialog
  }));

  // Find the edge data and use the selected metric for link thickness
  const sankeyLinks = data.edges.map((edge) => {
    // Choose the metric to use for link thickness
    let value = 1; // Default minimum value

    switch (metric) {
      case "transactionCount":
        value = Math.max(edge.transactionCount ?? 0, 1);
        break;
      case "totalTransactionValue":
        value = Math.max(edge.totalTransactionValue ?? 0, 1);
        break;
      case "totalGasUsed":
        value = Math.max(edge.totalGasUsed ?? 0, 1);
        break;
      default:
        value = Math.max(edge.totalTransactionValue ?? 0, 1); // Default to transaction value
    }

    return {
      source: edge.source,
      target: edge.target,
      value: value,
      transactionData: {
        count: edge.transactionCount || 0,
        totalValue: edge.totalTransactionValue || 0,
        totalGasUsed: edge.totalGasUsed || 0,
      },
    };
  });

  // Set the sankey diagram properties
  const sankeyGenerator = sankey<SankeyNodeExtended, SankeyLinkExtended>()
    .nodeWidth(26)
    .nodePadding(10)
    .extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
    .nodeId((node) => node.address)
    .nodeAlign(sankeyJustify);

  // Compute nodes and links positions
  // Use type assertion to handle the format conversion that d3-sankey does internally
  const { nodes, links } = sankeyGenerator({
    nodes: sankeyNodes,
    links: sankeyLinks,
  } as unknown as SankeyGraphType<SankeyNodeExtended, SankeyLinkExtended>);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    setDialogOpen(true);
  };

  const handleLinkClick = (link: SankeyLinkExtended) => {
    setSelectedLink(link);
    setLinkDialogOpen(true);
  };

  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    return (
      <g
        key={node.index}
        onClick={() => handleNodeClick(node)}
        style={{ cursor: "pointer" }}
      >
        <rect
          height={(node.y1 ?? 0) - (node.y0 ?? 0)}
          width={sankeyGenerator.nodeWidth()}
          x={node.x0 ?? 0}
          y={node.y0 ?? 0}
          stroke={"black"}
          fill={colorScale(node.category)}
          fillOpacity={1}
          rx={0.9}
        />
      </g>
    );
  });

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    // Calculate a minimum width for links with zero value
    const minWidth = 1;
    const strokeWidth = (link.width ?? 0) || minWidth;

    return (
      <g
        key={i}
        onClick={() => handleLinkClick(link)}
        style={{ cursor: "pointer" }}
      >
        <path
          d={path ?? ""}
          stroke={colorScale(link.source.category)}
          fill="none"
          strokeOpacity={0.3}
          strokeWidth={strokeWidth}
        />
        <path
          d={path ?? ""}
          stroke="transparent"
          fill="none"
          strokeWidth={strokeWidth + 10}
          style={{ pointerEvents: "all" }}
        />
      </g>
    );
  });

  //
  // Draw the Labels
  //
  const allLabels = nodes.map((node, i) => {
    return (
      <text
        key={i}
        onClick={() => handleNodeClick(node)}
        style={{ cursor: "pointer" }}
        x={(node.x0 ?? 0) < width / 2 ? (node.x1 ?? 0) + 6 : (node.x0 ?? 0) - 6}
        y={((node.y1 ?? 0) + (node.y0 ?? 0)) / 2}
        dy="0.35rem"
        textAnchor={(node.x0 ?? 0) < width / 2 ? "start" : "end"}
        fontSize={12}
      >
        {node.name}
      </text>
    );
  });

  return (
    <div>
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">
          Network Visualization by{" "}
          <span className="font-semibold">
            {metric === "transactionCount"
              ? "Transaction Count"
              : metric === "totalTransactionValue"
              ? "Transaction Value"
              : "Gas Used"}
          </span>
        </h3>
      </div>
      <svg width={width} height={height}>
        {allLinks}
        {allNodes}
        {allLabels}
      </svg>

      {/* Node Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[400px] w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Wallet Details
            </DialogTitle>
          </DialogHeader>
          {selectedNode && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                {selectedNode.wallet?.currency?.iconImg && (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <AspectRatio ratio={1}>
                      <Image
                        src={selectedNode.wallet.currency.iconImg}
                        alt={selectedNode.wallet.currency.symbol}
                        className="object-cover"
                        fill
                        sizes="48px"
                      />
                    </AspectRatio>
                  </div>
                )}
                <div>
                  <p className="font-medium text-lg">
                    {selectedNode.wallet?.currency?.name || "Unknown Currency"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedNode.wallet?.currency?.symbol || ""}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Wallet Address</p>
                <p className="text-sm break-all">{selectedNode.address}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-500">Wallet Type</p>
                <p className="font-medium">{selectedNode.category}</p>
              </div>

              {selectedNode.wallet?.balance !== undefined && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="font-medium">{selectedNode.wallet.balance}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="max-w-[500px] w-full">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Transaction Details
            </DialogTitle>
          </DialogHeader>
          {selectedLink && (
            <div className="space-y-6 pt-2 ">
              {/* Transaction Summary */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`space-y-1 ${
                      metric === "transactionCount"
                        ? "bg-blue-50 p-2 rounded border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="text-xl font-bold">
                      {selectedLink.transactionData?.count || 0}
                    </p>
                  </div>
                  <div
                    className={`space-y-1 ${
                      metric === "totalTransactionValue"
                        ? "bg-blue-50 p-2 rounded border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-xl font-bold w-[190px] truncate">
                      {selectedLink.transactionData?.totalValue}
                    </p>
                    {selectedLink.transactionData?.totalValue ? (
                      <p className="text-xs text-gray-500">
                        {selectedLink.transactionData.totalValue.toLocaleString()}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Add Gas metrics to dialog */}
                <div className="mt-4">
                  <div
                    className={`space-y-1 ${
                      metric === "totalGasUsed"
                        ? "bg-blue-50 p-2 rounded border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <p className="text-sm text-gray-500">Gas Used</p>
                    <p className="text-xl font-bold">
                      {selectedLink.transactionData?.totalGasUsed?.toString()}
                    </p>
                    {selectedLink.transactionData?.totalGasUsed ? (
                      <p className="text-xs text-gray-500">
                        {selectedLink.transactionData.totalGasUsed.toString()}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Wallets Involved */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Wallets</h3>

                {/* Source Wallet */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {selectedLink.source.wallet?.currency?.iconImg && (
                      <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                        <AspectRatio ratio={1}>
                          <Image
                            src={selectedLink.source.wallet.currency.iconImg}
                            alt={
                              selectedLink.source.wallet.currency.symbol || ""
                            }
                            className="object-cover"
                            fill
                            sizes="32px"
                          />
                        </AspectRatio>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">
                        {selectedLink.source.name} -{" "}
                        {selectedLink.source.wallet?.type}
                      </p>
                      <p className="text-xs text-gray-500 truncate w-[250px]">
                        {selectedLink.source.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flow direction */}
                <div className="flex justify-center">
                  <ArrowDown className="text-gray-400" />
                </div>

                {/* Target Wallet */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {selectedLink.target.wallet?.currency?.iconImg && (
                      <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                        <AspectRatio ratio={1}>
                          <Image
                            src={selectedLink.target.wallet.currency.iconImg}
                            alt={
                              selectedLink.target.wallet.currency.symbol || ""
                            }
                            className="object-cover"
                            fill
                            sizes="32px"
                          />
                        </AspectRatio>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">
                        {selectedLink.target.name} -{" "}
                        {selectedLink.target.wallet?.type}
                      </p>
                      <p className="text-xs text-gray-500 truncate w-[250px]">
                        {selectedLink.target.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
