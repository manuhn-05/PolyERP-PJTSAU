import React from "react";

interface Quantity {
  numberOfUnits: number;
  total: number;
  unit: string;
}

interface StockItem {
  received_product: string;
  received_product_stock: string;
  selectedQuantityType: string;
  selectedQuantity: Quantity;
  stock_ordered_date: string;
  received_date: string | null;
  supplier_name: string;
  supplier_contact_person: string;
  supplier_mobile_number: string;
  reorder_level: number;
}

const StockCard: React.FC<{ stock: StockItem }> = ({ stock }) => {
  const {
    received_product,
    received_product_stock,
    selectedQuantityType,
    selectedQuantity,
    stock_ordered_date,
    received_date,
    supplier_name,
    supplier_contact_person,
    supplier_mobile_number,
    reorder_level
  } = stock;

  // Compute Status
  const status =
    !received_date
      ? "Awaiting Delivery"
      : selectedQuantity.total <= reorder_level
      ? "Low Stock"
      : "In Stock";

  const statusColor =
    status === "In Stock"
      ? "text-green-600"
      : status === "Low Stock"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="bg-white dark:bg-[#27466B] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-4 w-full md:w-[350px] hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
        {received_product_stock || "Unnamed Product"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
        Category: <span className="font-medium">{received_product || "N/A"}</span>
      </p>

      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 ">
        <p>
          📦 <strong>Quantity:</strong>{" "}
          {selectedQuantity?.total ?? 0} {selectedQuantityType || ""}
        </p>
        <p>
          ⏳ <strong>Ordered:</strong>{" "}
          {stock_ordered_date ? new Date(stock_ordered_date).toLocaleDateString() : "N/A"}
        </p>
        <p>
          📥 <strong>Received:</strong>{" "}
          {received_date ? new Date(received_date).toLocaleDateString() : "Pending"}
        </p>
        <p>
          🧾 <strong>Status:</strong>{" "}
          <span className={`font-semibold ${statusColor}`}>{status}</span>
        </p>
      </div>

      <hr className="my-3 border-gray-300 dark:border-gray-200" />

      <div className="text-sm">
        <p className="font-semibold mb-1">🏭 Supplier:</p>
        <ul className="ml-3 list-disc space-y-1 text-gray-600 dark:text-gray-300 capitalize">
          <li>{supplier_name || "N/A"}</li>
          <li>Contact: {supplier_contact_person || "N/A"}</li>
          <li>Phone: {supplier_mobile_number || "N/A"}</li>
        </ul>
      </div>
    </div>
  );
};

export default StockCard;
