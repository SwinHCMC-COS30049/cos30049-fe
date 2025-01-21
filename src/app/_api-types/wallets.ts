import { components, paths } from "@/lib/types";

export type WalletDto = components["schemas"]["WalletDto"];

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
