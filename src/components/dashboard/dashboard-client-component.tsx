import EnvironmentalMetricsCarousel from "@/components/modules/sensors/_elements/environmental-metrics-carousel";

function DashboardClientHomeComponent() {

  return (
    <>
      <article className="rounded-lg flex flex-col justify-between gap-[1%] items-center md:w-[77.5vw] overflow-x-auto h-full">
        
        {/* <section className={`bg-white dark:bg-[#121F31] my-[0.75%] p-[1.5%] rounded-lg w-full`}>
          <h4 className={`text-[1.3em] font-semibold`}>Jobs Scheduled for Today</h4>
          <div className="flex flex-wrap gap-4 p-4">
            {DUMMY_STOCKS?.length ? (
              DUMMY_STOCKS.map((stock) => <StockCard key={stock?._id} stock={stock} />)
            ) : (
              <p className="text-gray-500">No stock data available</p>
            )}
          </div>
        </section>
        <section className={`bg-white dark:bg-[#121F31] my-[0.75%] p-[1%] rounded-lg w-full`}>
          <h4 className={`text-[1.3em] font-semibold`}>Crop Details</h4>
          <div className={` w-full p-[1.5%] md:grid md:grid-cols-3 gap-[1%]`}>
            {DUMMY_CROP_DETAILS?.length ? (
              DUMMY_CROP_DETAILS.map((crop) => (
                <PlotCropCard key={crop.plot_name} data={crop} />
              ))
            ) : (
              <p className="text-gray-500">No crop data available</p>
            )}
          </div>
        </section> */}
        <EnvironmentalMetricsCarousel />
      </article>
    </>
  );
}

export default DashboardClientHomeComponent;