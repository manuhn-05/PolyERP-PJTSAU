import MultiRangeSlider from '@/components/multi-range-slider';
import { FC, useState } from 'react';

type SensorViewCardProps = {
  absolute_minimum :number;
  absolute_maximum:number;
  actual:number;
  unit :string;
  sensor_name :string;
  thresholdMin: number;
  thresholdMax: number;
  sensor_type? :string;
  width?:string;
}
const SensorViewCard:FC<SensorViewCardProps> = ({absolute_maximum, absolute_minimum, actual, unit,sensor_name, thresholdMin, thresholdMax, sensor_type, width ="w-full"}) => {
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <div className={`p-4 rounded-lg shadow bg-white dark:bg-[#122031] ${width}`}>
      <h4 className="mb-2 font-semibold dark:text-white">{sensor_name}</h4>
      {/* Controlled range slider */}
     <MultiRangeSlider 
      thresholdMax={thresholdMax}
      thresholdMin={thresholdMin}
      absolute_minimum={absolute_minimum}
      absolute_maximum={absolute_maximum}
      actual={actual}
      onChange={({ min, max })  => {}}
    />
   <div>

   <p className={`w-full text-center`}>{`${actual} ${unit}`}</p>
   </div>
    </div>
  );
};

export default SensorViewCard;
