"use client";

import React from 'react'
import {  TransactionTypes } from './transaction-utils';
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { dateToExactReadbleTime } from '@/lib/utils';


interface TransactionTableProps {
  transactions: TransactionTypes[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <Card className='bg-white dark:bg-[#253040]'>
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                <TableHead className="whitespace-nowrap">Date</TableHead>
                <TableHead className="whitespace-nowrap">Type</TableHead>
                <TableHead className="whitespace-nowrap">Stock Item</TableHead>
                <TableHead className="whitespace-nowrap text-right">Quantity</TableHead>
                <TableHead className="whitespace-nowrap">Unit</TableHead>
                <TableHead className="whitespace-nowrap">Linked Entity</TableHead>
                <TableHead className="whitespace-nowrap">Initiated By</TableHead>
                <TableHead className="whitespace-nowrap">Notes</TableHead>
                <TableHead className="whitespace-nowrap">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, idx) => (
                <TableRow key={tx.transaction_id} className={idx % 2 === 0 ? "bg-muted/40" : ""}>
                  <TableCell className="whitespace-nowrap font-mono text-xs">{tx.transaction_id}</TableCell>
                  <TableCell className="whitespace-nowrap">{dateToExactReadbleTime(tx.date)}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium ${
                              tx.transaction_type === "IN"
                                ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                            }`}
                          >
                            {tx.transaction_type === "IN" ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5" />
                            )}
                            {tx.transaction_type}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{tx.transaction_type === "IN" ? "Stock Coming In" : "Stock Going Out"}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">{tx.item_name}</TableCell>
                  <TableCell className="whitespace-nowrap text-right font-semibold">{tx.quantity}</TableCell>
                  <TableCell className="whitespace-nowrap">{tx.unit}</TableCell>
                  <TableCell className="whitespace-nowrap text-sm">{tx.supplier?.supplier_name || tx.job_details?.title ||"-"}</TableCell>
                  <TableCell className="whitespace-nowrap text-sm">{tx.authorized_by.user_name}</TableCell>
                  <TableCell className="max-w-xs truncate text-xs text-muted-foreground">{tx.remarks || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{tx.last_updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
