export interface paths {
    "/api/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create user */
        post: operations["UserController_createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login */
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Refresh token */
        get: operations["AuthController_refreshToken"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all wallets */
        get: operations["WalletController_getWallets"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets/{address}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a wallet based on the input address */
        get: operations["WalletController_getWallet"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets/{address}/details": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a wallet and its details based on the input address */
        get: operations["WalletController_getWalletDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets/{address}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a wallet transactions based on the input address */
        get: operations["WalletController_getWalletTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets/{address}/neighbors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all wallets that have transactions with the input wallet */
        get: operations["WalletController_getWalletNeighbors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/wallets/{address}/network": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a wallet network based on the input address */
        get: operations["WalletController_getWalletNetwork"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/transactions/graph": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["TransactionController_getGraphData"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/neo4j/wallets/{address}/details": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["Neo4jController_getWalletDetails"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/neo4j/wallets/{address}/neighbors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["Neo4jController_getWalletNeighbors"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        UserDto: {
            id: string;
            email: string;
            normalizedEmail?: Record<string, never>;
            address?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            fullName?: string | null;
            phone?: string | null;
            profileImg?: string | null;
        };
        CreateUserInput: {
            /**
             * Format: email
             * @description The email of the user
             */
            email: string;
            /** @description The password of the user */
            password: string;
            /** @description The address of the user */
            address?: string;
            /** @description The first name of the user */
            firstName?: string;
            /** @description The last name of the user */
            lastName?: string;
            /** @description The phone of the user */
            phone?: string;
            /** @description The profile image of the user */
            profileImg?: string;
        };
        LoginOutput: {
            user: components["schemas"]["UserDto"];
            accessToken: string;
            refreshToken: string;
        };
        ExchangeRateDto: {
            rate: number;
            /** Format: date-time */
            updatedAt: string;
            id: string;
            baseCurrency: components["schemas"]["CurrencyDto"];
            destinationCurrency: components["schemas"]["CurrencyDto"];
        };
        CurrencyDto: {
            id: string;
            symbol: string;
            name: string;
            iconImg: string;
            exchangeRates?: components["schemas"]["ExchangeRateDto"][] | null;
        };
        WalletDto: {
            id: string;
            address: string;
            type: string;
            balance: number;
            currency?: components["schemas"]["CurrencyDto"];
        };
        PaginationMetadata: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasPrevPage: boolean;
            hasNextPage: boolean;
        };
        GetWalletsOutput: {
            wallets: components["schemas"]["WalletDto"][];
            metadata: components["schemas"]["PaginationMetadata"];
        };
        TransactionDto: {
            id: string;
            value: string;
            hash: string;
            input: string;
            transactionIndex: number;
            gas: number;
            gasUsed: number;
            gasPrice: number;
            transactionFee: number;
            blockNumber: number;
            blockHash: string;
            /** Format: date-time */
            blockTimestamp: string;
            sourceWallet?: components["schemas"]["WalletDto"];
            destinationWallet?: components["schemas"]["WalletDto"];
            currency?: components["schemas"]["CurrencyDto"];
        };
        GetWalletDetailsOutput: {
            wallet: components["schemas"]["WalletDto"] | null;
            recentTransactions: components["schemas"]["TransactionDto"][];
            firstTransaction: components["schemas"]["TransactionDto"] | null;
        };
        GetWalletTransactionsOutput: {
            transactions: components["schemas"]["TransactionDto"][];
            metadata: components["schemas"]["PaginationMetadata"];
        };
        WalletNetworkNode: {
            address: string;
            wallet: components["schemas"]["WalletDto"];
            level: number;
            position: {
                x?: number;
                y?: number;
            };
            direction?: Record<string, never>;
            parent?: string;
        };
        WalletNetworkEdge: {
            source: string;
            target: string;
            direction?: Record<string, never>;
            transactionCount?: number;
            totalTransactionValue?: number;
            totalGasUsed?: number;
        };
        WalletNetwork: {
            rootAddress: string;
            nodes: components["schemas"]["WalletNetworkNode"][];
            edges: components["schemas"]["WalletNetworkEdge"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    UserController_createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserInput"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 201 */
                        statusCode: number;
                        data?: components["schemas"]["UserDto"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 201 */
                        statusCode: number;
                        data?: components["schemas"]["LoginOutput"];
                    };
                };
            };
        };
    };
    AuthController_refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["LoginOutput"];
                    };
                };
            };
        };
    };
    WalletController_getWallets: {
        parameters: {
            query?: {
                query?: string;
                limit?: number;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["GetWalletsOutput"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    WalletController_getWallet: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["WalletDto"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    WalletController_getWalletDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["GetWalletDetailsOutput"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    WalletController_getWalletTransactions: {
        parameters: {
            query?: {
                type?: "INCOMING" | "OUTGOING" | "ALL";
                limit?: number;
                page?: number;
                transactionHash?: string;
                dstAddress?: string;
                createdAtOrder?: "ASC" | "DESC";
            };
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["GetWalletTransactionsOutput"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    WalletController_getWalletNeighbors: {
        parameters: {
            query?: {
                type?: "INCOMING" | "OUTGOING" | "ALL";
            };
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["WalletDto"][];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    WalletController_getWalletNetwork: {
        parameters: {
            query?: {
                type?: "INCOMING" | "OUTGOING" | "ALL";
                depth?: number;
                maxWallets?: number;
            };
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        message?: string;
                        /** @default 200 */
                        statusCode: number;
                        data?: components["schemas"]["WalletNetwork"];
                    };
                };
            };
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        statusCode?: number;
                        message?: string;
                        error?: string;
                    };
                };
            };
        };
    };
    TransactionController_getGraphData: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    Neo4jController_getWalletDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    Neo4jController_getWalletNeighbors: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                address: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
