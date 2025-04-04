import { components, paths } from "@/lib/types";

export type WalletDto = components["schemas"]["WalletDto"] & {
  transactionCount?: number;
};

export type WalletDetailsDto = components["schemas"]["GetWalletDetailsOutput"];

export type WalletNetworkNode = components["schemas"]["WalletNetworkNode"];
export type WalletNetworkEdge = components["schemas"]["WalletNetworkEdge"];
export type WalletNetwork = components["schemas"]["WalletNetwork"];

// GET /api/wallets
export type SuccessGetWalletsResponse =
  paths["/api/wallets"]["get"]["responses"]["200"]["content"]["application/json"];
export type ErrorGetWalletsResponse =
  paths["/api/wallets"]["get"]["responses"]["500"]["content"]["application/json"];

// GET /api/wallets/{address}/details
export type SuccessGetWalletDetailsResponse =
  paths["/api/wallets/{address}/details"]["get"]["responses"]["200"]["content"]["application/json"];
export type ErrorGetWalletDetailsResponse =
  paths["/api/wallets/{address}/details"]["get"]["responses"]["500"]["content"]["application/json"];

// GET /api/wallets/{address}
export type SuccessGetWalletResponse =
  paths["/api/wallets/{address}"]["get"]["responses"]["200"]["content"]["application/json"];
export type ErrorGetWalletResponse =
  paths["/api/wallets/{address}"]["get"]["responses"]["500"]["content"]["application/json"];

// GET /api/wallets/{address}/neighbors
export type SuccessGetWalletNeighborsResponse =
  paths["/api/wallets/{address}/neighbors"]["get"]["responses"]["200"]["content"]["application/json"];
export type ErrorGetWalletNeighborsResponse =
  paths["/api/wallets/{address}/neighbors"]["get"]["responses"]["500"]["content"]["application/json"];

export type SuccessGetWalletNetworkResponse =
  paths["/api/wallets/{address}/network"]["get"]["responses"]["200"]["content"]["application/json"];
export type ErrorGetWalletNetworkResponse =
  paths["/api/wallets/{address}/network"]["get"]["responses"]["500"]["content"]["application/json"];
