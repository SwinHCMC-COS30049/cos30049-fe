"use client";

import { TransactionDto } from "@/app/_api-types/transactions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TransactionDetailDialogProps {
  transaction: TransactionDto;
  children: React.ReactNode;
}

const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <div className="min-h-[3rem] bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center">
      {value}
    </div>
  </div>
);
export function TransactionDetailDialog({
  transaction,
  children,
}: TransactionDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[700px] p-0">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2 flex-wrap">
            Transaction Details
            <Badge variant="outline" className="bg-blue-50 text-sm">
              Block #{transaction.blockNumber}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(100vh-16rem)]">
          <div className="max-w-sm sm:max-w-full p-8 flex flex-col gap-6">
            {/* Transaction Identification */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Transaction Identity
              </h3>
              <InfoField
                label="Hash"
                value={<span className="break-all">{transaction.hash}</span>}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                <InfoField
                  label="Block Number"
                  value={transaction.blockNumber}
                />
                <InfoField
                  label="Timestamp"
                  value={
                    transaction.blockTimestamp
                      ? format(new Date(Number(transaction.blockTimestamp) * 1000), "PPpp")
                      : "N/A"
                  }
                />
              </div>
            </div>

            {/* Transaction Status */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Status Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoField
                  label="Status"
                  value={
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-700 font-medium">
                        Confirmed
                      </span>
                    </div>
                  }
                />
                <InfoField
                  label="Transaction Index"
                  value={transaction.transactionIndex}
                />
              </div>
            </div>

            {/* Addresses */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Address Information
              </h3>
              <InfoField
                label="From Address"
                value={
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="truncate whitespace-nowrap">
                        {transaction.sourceWallet?.address}
                      </span>
                      <Link
                        href={`/wallets/${transaction.sourceWallet?.address}`}
                        onClick={() => setIsOpen(false)}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-4 h-4 text-gray-500" />
                      </Link>
                    </div>
                  </div>
                }
              />
              <InfoField
                label="To Address"
                value={
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="truncate whitespace-nowrap">
                        {transaction.destinationWallet?.address}
                      </span>
                      <Link
                        href={`/wallets/${transaction.destinationWallet?.address}`}
                        onClick={() => setIsOpen(false)}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-4 h-4 text-gray-500" />
                      </Link>
                    </div>
                  </div>
                }
              />
            </div>

            {/* Value Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Value & Gas Information
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 sm:p-4">
                  <label className="text-sm font-medium text-gray-500 block mb-1">
                    Value
                  </label>
                  <div className="text-base font-semibold text-blue-600 sm:text-lg">
                    {transaction.value}
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200 sm:p-4">
                  <label className="text-sm font-medium text-gray-500 block mb-1">
                    Gas Price
                  </label>
                  <div className="text-base font-semibold text-gray-700 sm:text-lg">
                    {transaction.gasPrice}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoField
                  label="Gas Used"
                  value={`${transaction.gasUsed} units`}
                />
                <InfoField label="Gas" value={`${transaction.gas} units`} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
