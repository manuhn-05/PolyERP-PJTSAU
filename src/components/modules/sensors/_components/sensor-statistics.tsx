import { Card, CardContent, CardHeader, CardTitle ,CardDescription} from "@/components/ui/card";
import { FC, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

export type Statistics = {
    meanValue: number;
    maxValue: number;
    minValue: number;
}
type SensorStatisticsProps = {
title : string;
description : string;
statistics : Statistics;
unit : string;
}
const SensorStatistics: FC<SensorStatisticsProps> = ({title, description, statistics, unit}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
      <Card className={`w-full mx-auto m-[1.5%]`}>
          <CardHeader >
              <CardTitle className={`flex w-full justify-between items-center cursor-pointer`} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
              <FaAngleDown className={` cursor-pointer ${isOpen ? "rotate-180 " : ""} transition-all duration-75`} />
              </CardTitle>
              <CardDescription>{description}</CardDescription>
          </CardHeader>
          {isOpen && (
              <CardContent className={`flex w-full justify-evenly items-center`}>
                  <div>Mean: {statistics?.meanValue} {unit}</div>
                  <div>Max: {statistics?.maxValue} {unit}</div>
                  <div>Min: {statistics?.minValue} {unit}</div>
              </CardContent>)}
      </Card>
  )
}

export default SensorStatistics;