"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogTitle, DialogClose, DialogOverlay, DialogPortal } from '@/components/ui/dialog';

interface Transaction {
  hash: string;
  to_address: string;
  value: string;
  gas_used: number;
  block_timestamp: number;
}

interface TransactionTableProps {
  walletAddress?: string;
}

interface Column {
  id: string;
  label: string;
  width: number;
  minWidth: number;
  fixed?: boolean;
}

const initialTransactions: Transaction[] = [
  {
    hash: "0xf3a14bfddc65725b4a345e0bafa84afd328de1b9487339157a0f24c9085b66f2",
    to_address: "0xb0606f433496bf66338b8ad6b6d51fc4d84a44cd",
    value: "31404516258391761125",
    gas_used: 21000,
    block_timestamp: 1667378123
  },
  {
    hash: "0x59f90e381121e516560972f6c07d1a95c82ba1dcc0c245c7efd6be7f767e3369",
    to_address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "0",
    gas_used: 159828,
    block_timestamp: 1667353667
  },
  {
    hash: "0x223ae18897927db102cc0560277adeb3fe065f4523697bb67f6e8fe07feada39",
    to_address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "0",
    gas_used: 159814,
    block_timestamp: 1667351987
  },
  {
    hash: "0xa43beda2d8739c679012b26b8b5f66dc4b7196eb31e39d6f7cdbede134e19720",
    to_address: "0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4",
    value: "20000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667351687
  },
  {
    hash: "0xdd608c8c4e8d8529967955d89f9e71842e80c3c84d592c72054f68090a5a102c",
    to_address: "0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4",
    value: "650000000000000000",
    gas_used: 21000,
    block_timestamp: 1667348243
  },
  {
    hash: "0x3ce66ee43f23b037aa64440f1e545c574ce779876aeefccf8b0905b74392215b",
    to_address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    value: "31404516258391761125",
    gas_used: 21000,
    block_timestamp: 1667378123
  },
  {
    hash: "0xa1822e68a736bcdb57d05b2679260904813efdd17df62ede1d716dec9eeb4e8c",
    to_address: "0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4",
    value: "6947000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667347031
  },
  {
    hash: "0x26d1a9459d4d27f28f49798ba6a6c7c7d1e2c1267d1a525fee558aaa05767049",
    to_address: "0x3089df0e2349faea1c8ec4a08593c137da10fe2d",
    value: "0",
    gas_used: 935469,
    block_timestamp: 1667347211
  },
  {
    hash: "0xb17f5561abb19f6cd3ccf67f010ba79fe5e608e4455de126ebb00a84a65b65eb",
    to_address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    value: "6947000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667347031
  },
  {
    hash: "0x547d378c90e5d09a9aac3c5d214f90ab86a2329ccf28bbc55218253934f488b7",
    to_address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    value: "7501378274808852048809",
    gas_used: 21000,
    block_timestamp: 1667847119
  },
  {
    hash: "0x938f7daf7d84dfa3692085d8854775f8d94af7b60b33f57d81ca42afe76932eb",
    to_address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    value: "100000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667639603
  },
  {
    hash: "0xa966ce8e11cc9af2172f195edcd654776971f76b4aba2c9a5b7aebe3e3e301b9",
    to_address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    value: "100000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667639579
  },
  {
    hash: "0x7f42d815961496c515c76a57a64096a20671800edbf18e5ed3d6119663a1d623",
    to_address: "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b",
    value: "100000000000000000000",
    gas_used: 21000,
    block_timestamp: 1667378123
  }
];

const initialColumns: Column[] = [
  { id: 'hash', label: 'Transaction ID', width: 200, minWidth: 200, fixed: true },
  { id: 'block_timestamp', label: 'Timestamp', width: 150, minWidth: 150 },
  { id: 'to_address', label: 'To', width: 150, minWidth: 150 },
  { id: 'value', label: 'Value', width: 120, minWidth: 100 },
  { id: 'gas_used', label: 'Gas Used', width: 100, minWidth: 80 },
  { id: 'actions', label: 'Actions', width: 50, minWidth: 50 }
];

const TransactionTable = ({ walletAddress }: TransactionTableProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [resizing, setResizing] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const tableRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleResizeStart = (e: React.MouseEvent, columnId: string, initialWidth: number) => {
    e.stopPropagation();
    setResizing(columnId);
    setStartX(e.clientX);
    setStartWidth(initialWidth);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing) {
        const diff = e.clientX - startX;
        const newWidth = Math.max(
          columns.find(col => col.id === resizing)?.minWidth || 0,
          startWidth + diff
        );
        
        setColumns(prevColumns =>
          prevColumns.map(col =>
            col.id === resizing ? { ...col, width: newWidth } : col
          )
        );
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
    };

    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, startX, startWidth, columns]);

  const fetchTransactionHistory = async (address?: string) => {
    setLoading(true);
    try {
      const response = await fetch(address ? `/wallets/${address}/history` : '/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory(walletAddress);
  }, [walletAddress]);

  const formatValue = (value: string) => {
    return parseFloat(value).toFixed(8);
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleViewDetails = (tx: Transaction) => {
    console.log('View details for transaction:', tx);
    setSelectedTransaction(tx);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  const renderCell = (tx: Transaction, columnId: string) => {
    switch (columnId) {
      case 'hash':
        return (
          <div className="font-mono truncate" title={tx.hash}>
            {tx.hash}
          </div>
        );
      case 'block_timestamp':
        return formatTimestamp(tx.block_timestamp);
      case 'to_address':
        return (
          <div className="font-mono truncate" title={tx.to_address}>
            {tx.to_address}
          </div>
        );
      case 'value':
        return formatValue(tx.value);
      case 'gas_used':
        return tx.gas_used;
      case 'actions':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleCopy(tx.hash)}>
                Copy Transaction Hash
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCopy(tx.to_address)}>
                Copy To Address
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(tx)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return null;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return tx.hash.toLowerCase().includes(searchLower) ||
           tx.to_address.toLowerCase().includes(searchLower);
  });

  const startIndex = (currentPage - 1) * parseInt(rowsPerPage);
  const endIndex = startIndex + parseInt(rowsPerPage);
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTransactions.length / parseInt(rowsPerPage));

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Input 
          placeholder="Search by hash or address..."
          className="w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select 
          value={rowsPerPage}
          onValueChange={setRowsPerPage}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
            <SelectItem value="100">100 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <div className="overflow-x-auto relative" ref={tableRef}>
          <div style={{ position: 'relative', minWidth: '100%' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={column.id}
                      style={{
                        width: `${column.width}px`,
                        minWidth: `${column.minWidth}px`,
                        position: column.fixed ? 'sticky' : 'relative',
                        left: column.fixed ? 0 : 'auto',
                        zIndex: column.fixed ? 20 : 10,
                        background: column.fixed ? 'white' : 'inherit',
                      }}
                    >
                      <div className="flex items-center h-full relative pr-2">
                        <span>{column.label}</span>
                        <div
                          className="absolute right-0 top-0 h-full w-2 cursor-col-resize hover:bg-gray-300 z-50"
                          onMouseDown={(e) => handleResizeStart(e, column.id, column.width)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ 
                            cursor: 'col-resize',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '4px',
                          }}
                        />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8">
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : paginatedTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((tx) => (
                    <TableRow key={tx.hash}>
                      {columns.map((column) => (
                        <TableCell
                          key={`${tx.hash}-${column.id}`}
                          style={{
                            width: `${column.width}px`,
                            minWidth: `${column.minWidth}px`,
                            position: column.fixed ? 'sticky' : 'relative',
                            left: column.fixed ? 0 : 'auto',
                            zIndex: column.fixed ? 20 : 10,
                            background: column.fixed ? 'white' : 'inherit',
                          }}
                        >
                          {renderCell(tx, column.id)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className='w-full p-4 space-y-4'>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay />
        <DialogPortal>
          <DialogContent>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" className="absolute top-2 right-2">
                Close
              </Button>
            </DialogClose>
            {selectedTransaction && (
              <div className="space-y-2">
                <p><strong>Transaction ID:</strong> {selectedTransaction.hash}</p>
                <p><strong>To Address:</strong> {selectedTransaction.to_address}</p>
                <p><strong>Value:</strong> {formatValue(selectedTransaction.value)}</p>
                <p><strong>Gas Used:</strong> {selectedTransaction.gas_used}</p>
                <p><strong>Timestamp:</strong> {formatTimestamp(selectedTransaction.block_timestamp)}</p>
              </div>
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
    </div>
  );
};

export default TransactionTable;