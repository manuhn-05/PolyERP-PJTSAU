import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SensorCharts from "../_components/sensor-charts";
import { FC } from "react";
import SensorStatistics, { Statistics } from "../_components/sensor-statistics";


type SensorChartsProps ={
    dataLabel: string
    xAxisTitle: string
    yAxisTitle: string
    xKey: string
    yKey: string
    dataList: any
    min?: number
    max?: number
    crossLines?: any
}

type SensorStatistics = {

    unit: string;
    title : string;
    description:string;
}
type SensorCardComponentProps = {
    className?: string;
    containerClasses: string;
    chartDataList: any;
    statisticsData: any;
    sensorChartData :SensorChartsProps,
    sensorStatistics :SensorStatistics;
}

const SensorCardComponent: FC<SensorCardComponentProps> = ({ className, containerClasses, chartDataList, statisticsData, sensorChartData, sensorStatistics }) => {

    return (
        <Card className={`${containerClasses}`}>
            <CardContent className={`${className}`}>
                <SensorCharts
                    dataLabel={`${sensorChartData?.dataLabel || ""}`}
                    xAxisTitle={`${sensorChartData?.xAxisTitle || ""}`}
                    yAxisTitle={`${sensorChartData?.yAxisTitle || ""}`}
                    xKey={`${sensorChartData?.xKey || ""}`}
                    yKey={`${sensorChartData?.yKey || ""}`}
                    dataList={chartDataList!}
                    min={sensorChartData?.min}
                    max={sensorChartData?.max}
                    crossLines={sensorChartData?.crossLines || []}
                />
                <SensorStatistics
                    title={`${sensorStatistics?.title}`}
                    description={`${sensorStatistics?.description}`}
                    statistics={statisticsData!}
                    unit={`${sensorStatistics?.unit}`}
                />
            </CardContent>
        </Card>
    )
}

export default SensorCardComponent;