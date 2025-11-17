"use client";
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import type {  TransactionTypes } from "./transaction-utils";

interface TransactionTimelineProps {
  transactions: TransactionTypes[]
}

export default function TransactionTimeline({ transactions }: TransactionTimelineProps) {
  // Sort transactions by date, most recent first
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Transaction Timeline</h3>
      <div className="relative space-y-4 pl-8 md:pl-12">
        {/* Timeline line */}
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-border md:left-4 bg-gray-4" />

        {sortedTransactions.map((tx, idx) => (
          <div key={tx.transaction_id} className="relative">
            {/* Timeline dot */}
            <div
              className={`absolute -left-5 top-2 h-4 w-4 rounded-full border-2 md:-left-7 ${
                tx.transaction_type === "IN"
                  ? "border-green-500 bg-green-100 dark:bg-green-900"
                  : "border-red-500 bg-red-100 dark:bg-red-900"
              }`}
            />

            {/* Event Card */}
            <Card className={`overflow-hidden ${idx % 2 === 0 ? "bg-muted/30" : ""} bg-white dark:bg-gray-800`}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                          tx.transaction_type === "IN"
                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {tx.transaction_type === "IN" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {tx.transaction_type === "IN" ? "Stock Received" : "Stock Distributed"}
                      </div>
                      <span className="text-xs text-muted-foreground">{tx.date}</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{tx.item_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.quantity} {tx.unit}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                          <p className="font-medium">From/To:</p>
                          <p>{tx.supplier?.supplier_name || tx.job_details?.title ||"-"}</p>
                        </div>
                        <div>
                          <p className="font-medium">Initiated By:</p>
                          <p>{tx.authorized_by.user_name}</p>
                        </div>
                      </div>

                      {tx.remarks && (
                        <div className="pt-2">
                          <p className="text-xs font-medium text-foreground">Remarks:</p>
                          <p className="text-xs text-muted-foreground italic">{tx.remarks}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs text-muted-foreground">
                    <p className="font-mono">{tx.transaction_id}</p>
                    <p className="mt-1">Updated: {tx.last_updated}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
