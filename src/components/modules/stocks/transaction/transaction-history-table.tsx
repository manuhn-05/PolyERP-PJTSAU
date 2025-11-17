"use client"

import type React from "react"

import { useMemo, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Download,
  Filter,
  Search,
  TrendingDown,
  TrendingUp,
  Zap,
  Clock,
  Grid3x3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TransactionTable from "./transaction-table"
import TransactionTimeline from "./transaction-timeline"
import { summarizeTransactions, generateMockTransactions } from "./transaction-utils"
import { DUMMY_TRANSACTION_HISTORY } from "../_components/stock-constants"

export default function StocksTransactionHistoryTab() {
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table")
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "2025-11-01",
    end: "2025-11-04",
  })
  const [filters, setFilters] = useState({
    type: "all", // 'all', 'IN', 'OUT'
    searchTerm: "",
    supplier: "all",
    job: "all",
  })

  const transactions = generateMockTransactions()
  const summary = summarizeTransactions(DUMMY_TRANSACTION_HISTORY)
  const dropdownItemsList = useMemo(() => {
    const suppliers = Array.from(new Set(DUMMY_TRANSACTION_HISTORY.map((tx) => tx.supplier?.supplier_name)))
    const jobs = Array.from(new Set(DUMMY_TRANSACTION_HISTORY.map((tx) => tx.job_details?.title)))
    const filteredSuppliers = suppliers.filter((name) => name !== undefined) as string[]
    const filteredJobs = jobs.filter((name) => name !== undefined) as string[]
    const finalList = [...filteredSuppliers, ...filteredJobs]
    return finalList;
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    if (filters.type !== "all" && tx.transaction_type !== filters.type) return false
    if (filters.searchTerm && !tx.item_name.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false
    if (filters.supplier !== "all" && (tx.supplier?.supplier_name !== filters.supplier && tx.job_details?.title !== filters.supplier)) return false
    return true
  })

  const handleReset = () => {
    setFilters({ type: "all", searchTerm: "", supplier: "all", job: "all" })
    setDateRange({ start: "2025-11-01", end: "2025-11-04" })
  }

  const handleExport = () => {
    const csv = [
      ["Transaction ID", "Date", "Type", "Stock Item", "Quantity", "Unit", "Linked Entity", "Initiated By", "Notes"],
      ...filteredTransactions.map((tx) => [
        tx.transaction_id,
        tx.date,
        tx.transaction_type,
        tx.item_name,
        tx.quantity,
        tx.unit,
        tx.supplier?.supplier_name || "N/A",
        tx.authorized_by.user_name,
        tx.remarks,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transaction-history.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 md:w-[78.75vw] xl:w-[75.5vw] 3xl:w-[55vw] overflow-auto h-full">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Total IN"
          value={summary.totalInTransactions}
          icon={<ArrowUp className="h-5 w-5" />}
          bgColor="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard
          title="Total OUT"
          value={summary.totalOutTransactions}
          icon={<ArrowDown className="h-5 w-5" />}
          bgColor="bg-red-50 dark:bg-red-950"
          iconColor="text-red-600 dark:text-red-400"
        />
        <SummaryCard
          title="Qty IN"
          value={`${summary.totalQtyIn} units`}
          icon={<TrendingUp className="h-5 w-5" />}
          bgColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <SummaryCard
          title="Qty OUT"
          value={`${summary.totalQtyOut} units`}
          icon={<TrendingDown className="h-5 w-5" />}
          bgColor="bg-orange-50 dark:bg-orange-950"
          iconColor="text-orange-600 dark:text-orange-400"
        />
        <SummaryCard
          title="Net Available"
          value={`${summary.netAvailable} units`}
          icon={<Zap className="h-5 w-5" />}
          bgColor="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Filters and Controls */}
      <Card className="bg-white dark:bg-[#253040]">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-lg">Filters & Controls</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="gap-2"
              >
                <Grid3x3 className="h-4 w-4" />
                Table
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="gap-2"
              >
                <Clock className="h-4 w-4" />
                Timeline
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Date Range and Type Filter */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground">Date Range</label>
                <div className="mt-2 flex gap-2">
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Type Filter Dropdown */}
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Type: {filters.type === "all" ? "All" : filters.type}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuLabel>Transaction Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.type === "all"}
                    onCheckedChange={() => setFilters({ ...filters, type: "all" })}
                  >
                    All Transactions
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.type === "IN"}
                    onCheckedChange={() => setFilters({ ...filters, type: "IN" })}
                  >
                    Incoming (IN)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.type === "OUT"}
                    onCheckedChange={() => setFilters({ ...filters, type: "OUT" })}
                  >
                    Outgoing (OUT)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search and Additional Filters */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground">Search Stock Item</label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by stock item name..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Supplier Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Supplier/Job: {filters.supplier === "all" ? "All" : filters.supplier}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuLabel>Linked Entity</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.supplier === "all"}
                    onCheckedChange={() => setFilters({ ...filters, supplier: "all" })}
                  >
                    All Entities
                  </DropdownMenuCheckboxItem>
                  {
                    dropdownItemsList?.map((item, index) => (
                      <DropdownMenuCheckboxItem key={index}
                        checked={filters.supplier.toLowerCase() === item.toLowerCase()}
                        onCheckedChange={() => setFilters({ ...filters, supplier: item })}
                      >
                        {item}
                      </DropdownMenuCheckboxItem>
                    ))
                  }

                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" size="sm">
                Reset Filters
              </Button>
              <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction View */}
      {viewMode === "table" ? (
        <TransactionTable transactions={filteredTransactions} />
      ) : (
        <TransactionTimeline transactions={filteredTransactions} />
      )}
    </div>
  )
}

function SummaryCard({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  bgColor: string
  iconColor: string
}) {
  return (
    <Card className={`${bgColor}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`rounded-lg p-3 ${bgColor}`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
