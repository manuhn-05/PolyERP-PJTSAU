type DataItem = Record<string, any>;

interface ChartDataOptions {
  primaryKey: string;   // e.g. "skill_type"
  secondaryKey?: string; // e.g. "status"
  expectedMap?: Record<string, number>; // optional: expected values per group
}

/**
 * Builds ApexCharts series data dynamically
 */
export function buildChartSeries(
  data: DataItem[],
  { primaryKey, secondaryKey, expectedMap }: ChartDataOptions
) {
  // Count occurrences
  const counts: Record<string, number> = {};

  data?.forEach((item) => {
    const primaryVal = item[primaryKey]?.split('_')?.join(' ');
    const secondaryVal = secondaryKey ? item[secondaryKey]?.split('_')?.join(' ') : null;

    const key = secondaryVal ? `${primaryVal} - ${secondaryVal}`?.toUpperCase() : primaryVal;

    counts[key] = (counts[key] || 0) + 1;
  });

  // Convert to Apex format
  const seriesData = Object.entries(counts).map(([key, count]) => {
    const expectedVal = expectedMap?.[key];

    return {
      x: key,
      y: count,
      ...(expectedVal
        ? {
            goals: [
              {
                name: "Expected",
                value: expectedVal,
                strokeHeight: 5,
                strokeColor: "#775DD0",
              },
            ],
          }
        : {}),
    };
  });

  return [
    {
      name: "Actual",
      data: seriesData,
    },
  ];
}
