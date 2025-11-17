import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";

import "./multi-range-slider.css";

type MultiRangeSliderProps = {
  absolute_minimum :number;
  absolute_maximum:number;
  thresholdMin: number;
  thresholdMax: number;
  actual: number;
  onChange: (values: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  
  absolute_minimum,
  absolute_maximum,
  thresholdMin,
  thresholdMax,
  actual,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(thresholdMin);
  const [maxVal, setMaxVal] = useState(thresholdMax);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);

  const getPercent = useCallback(
    (value: number) => ((value - absolute_minimum) / (absolute_maximum - absolute_minimum)) * 100,
    [absolute_minimum, absolute_maximum]
  );

  const actualPercent = getPercent(actual);
  const thresholdMinPercent = getPercent(minVal);
  const thresholdMaxPercent = getPercent(maxVal);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="flex justify-center items-center h-[15vh]">
      {/* Range Inputs */}
      <input
        type="range"
        min={absolute_minimum}
        max={absolute_maximum}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > absolute_minimum - 100,
        })}
      />
      <input
        type="range"
        min={absolute_minimum}
        max={absolute_maximum}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      {/* Slider Visualization */}
      <div className="relative w-[80%]">
        {/* Track Background */}
        <div className="slider__track" />

        {/* Warning Zone Left */}
        <div
          className="slider__range-warning"
          style={{
            left: `0%`,
            width: `${thresholdMinPercent}%`,
          }}
        />

        {/* Safe Zone */}
        <div
          className="slider__range-safe"
          style={{
            left: `${thresholdMinPercent}%`,
            width: `${thresholdMaxPercent - thresholdMinPercent}%`,
          }}
        />

        {/* Warning Zone Right */}
        <div
          className="slider__range-warning"
          style={{
            left: `${thresholdMaxPercent}%`,
            width: `${100 - thresholdMaxPercent}%`,
          }}
        />

        {/* Actual Value Marker */}
        <div
          className="slider__actual-wrapper"
          style={{ left: `${actualPercent}%` }}
        >
          <div className="slider__actual-marker" />
          <div className="slider__actual-value">{actual}</div>
        </div>

        {/* Threshold Min Marker */}
<div
  className="slider__threshold-wrapper"
  style={{ left: `${thresholdMinPercent}%` }}
>
  <div className="slider__threshold-marker" />
  <div className="slider__threshold-value">{minVal}</div>
</div>

{/* Threshold Max Marker */}
<div
  className="slider__threshold-wrapper"
  style={{ left: `${thresholdMaxPercent}%` }}
>
  <div className="slider__threshold-marker" />
  <div className="slider__threshold-value">{maxVal}</div>
</div>


        {/* Absolute Min / Max Labels */}
        <div className="slider__absolute-left">{absolute_minimum}</div>
        <div className="slider__absolute-right">{absolute_maximum}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
