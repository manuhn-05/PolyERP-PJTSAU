import React from "react";
import Plot from "react-plotly.js";


function ScatteredChart({chartData, title} : {chartData: any, title : string}) {

  const layout: Partial<any> = {
    title: `Device ${title} Distribution`,
    width: 1300,
    height: 500,
    showlegend: true,
    boxmode: "group",
    xaxis: { title: "Devices" },
    yaxis: { title: `${title} Value`, zeroline: false },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  return (
    <section className="w-full border-b">
      <h3 className={`text-[1.05rem] font-bold`}>{title}</h3>
      <div className="w-full">
        <Plot data={chartData} layout={layout} />
      </div>
    </section>
  );
}

export default ScatteredChart;  
