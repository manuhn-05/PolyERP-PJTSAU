import { DUMMY_INVENTORY_DATA } from "@/constants/titles";
import React from "react";


interface Item {
  _id: string;
  name: string;
  type?: string;
  description?: string;
  availability_status?: string;
  count?: number;
  maintenance_interval?: string;
}

const InventoryDashboard: React.FC = () => {
  const categories = Object.keys(DUMMY_INVENTORY_DATA);

  // Function to style availability badge
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700 border-green-400";
      case "in use":
        return "bg-blue-100 text-blue-700 border-blue-400";
      case "maintenance due":
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
      case "unavailable":
        return "bg-red-100 text-red-700 border-red-400";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        🧰 
      </h2> */}

      {categories.map((category) => {
        const items = DUMMY_INVENTORY_DATA[category as keyof typeof DUMMY_INVENTORY_DATA] || [];

        return (
          <div
            key={category}
            className="bg-white dark:bg-gray-900 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize">
              {category.replace(/_/g, " ")}
            </h3>

            {items.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item: any) => {
                  // console.log(item)
                  return (
                    <div
                      key={item._id}
                      className="border border-gray-300 dark:border-gray-700 rounded-xl p-3 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">
                          {item.name || "Unnamed Item"}
                        </h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(
                            item.availability_status
                          )}`}
                        >
                          {item.availability_status || "N/A"}
                        </span>
                      </div>
  
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {item.type || "—"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {item.description || "No description available"}
                      </p>
  
                      <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        <p>
                          🔢 <strong>Count:</strong> {item.count ?? "N/A"}
                        </p>
                        <p>
                          🧾 <strong>Maintenance:</strong>{" "}
                          {item.maintenance_interval || "Not specified"}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No items found in this category.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InventoryDashboard;
