import { useLayoutEffect, useState, useEffect } from "react";

const Option1 = ({ minPrice, maxPrice, minGap, setFromPrice, setToPrice,setPriceChange }) => {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const [inputMin, setInputMin] = useState(minPrice);
  const [inputMax, setInputMax] = useState(maxPrice);

  const [progressLeft, setProgressLeft] = useState("0px");
  const [progressRight, setProgressRight] = useState("0px");

  useEffect(() => {
    setFromPrice(Number(minValue));
    setToPrice(Number(maxValue));
  },[minValue,maxValue])

  useLayoutEffect(() => {
    let gap = maxValue - minValue;

    if (gap <= minGap) {
      let min = Math.max(minPrice, Number(maxValue) - minGap);
      let max = Math.min(maxPrice, Number(minValue) + minGap);
      setMinValue(min);
      setMaxValue(max);
      setInputMin(min);
      setInputMax(max);
    }

    let left = Math.max(0, Number(minValue) / maxPrice) * 300 + "px";
    setProgressLeft(left);
    let right = (1 - Number(maxValue) / maxPrice) * 300 + "px";
    setProgressRight(right);

  }, [minValue, maxValue]);

  const handleMinBlur = (e) => {
    if (inputMin === "") {
      setInputMin(0);
    }

    setMinValue(inputMin);
    setPriceChange(true)
  };

  const handleMinKeyDown = (e) => {
    if (e.key === "+" || e.key === "-") {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      if (Number(inputMin) < 0 || inputMin === "") {
        setInputMin(0);
      }

      setMinValue(inputMin);
      setPriceChange(true)

    }
  };

  const handleMaxBlur = (e) => {
    if (inputMax === "" || Number(inputMax) > maxPrice) {
      setInputMax(maxPrice);
    }

    setMaxValue(Math.min(maxPrice, Number(inputMax)));
    setPriceChange(true)

  };

  const handleMaxKeyDown = (e) => {
    if (e.key === "+" || e.key === "-") {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      if (inputMax === "" || Number(inputMax) > maxPrice) {
        setInputMax(maxPrice);
      }

      setMaxValue(Math.min(maxPrice, Number(inputMax)));
      setPriceChange(true)
    }
  };

  return (
    <>
      <div className="mt-[50px]">
        <div className="bg-white w-full h-[5px] relative rounded-[5px] overflow-hidden">
          <div
            className="absolute bg-black h-full"
            style={{
              left: progressLeft,
              right: progressRight || "100%",
            }}
          />
        </div>
        <div className="relative h-[5px] text-white">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            className="w-full h-full pointer-events-none bg-transparent appearance-none absolute top-[-5.5px]"
            onChange={(e) => {
              setMinValue(e.target.value), setInputMin(e.target.value),setPriceChange(true)
            }}
            value={minValue || minPrice}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            className="w-full h-full pointer-events-none bg-transparent appearance-none absolute top-[-5.5px]"
            onChange={(e) => {
              setMaxValue(e.target.value), setInputMax(e.target.value),setPriceChange(true);
            }}
            value={maxValue || maxPrice}
          />
          <div
            className="bg-black w-[45px] text-center block rounded-[5px] text-[16px] absolute bottom-[100%] translate-x-[-30%] translate-y-[-80%]"
            style={{
              left: progressLeft,
            }}
          >
            {Number(minValue) || minPrice}
          </div>
          <div
            className="bg-black w-[45px] text-center block rounded-[5px] text-[16px] absolute bottom-[100%] translate-x-[30%]  translate-y-[-80%]"
            style={{
              right: progressRight,
            }}
          >
            {maxValue}
          </div>
        </div>
      </div>
      <div className="relative mx-[5px] mt-[10px] h-[2px] bg-[#888888] text-[#111827] text-[14px]">
        <div className="absolute bg-[#888888] left-0 top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[-1%] top-[8.5px]">0</div>
        <div className="absolute bg-[#888888] left-[20%] top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[17%] top-[8.5px]">200</div>
        <div className="absolute bg-[#888888] left-[40%] top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[37%] top-[8.5px]">400</div>
        <div className="absolute bg-[#888888] left-[60%] top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[57%] top-[8.5px]">600</div>
        <div className="absolute bg-[#888888] left-[80%] top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[77%] top-[8.5px]">800</div>
        <div className="absolute bg-[#888888] left-[100%] top-0 w-[1.5px] h-[10px]" />
        <div className="absolute left-[97%] top-[8.5px]">1000</div>
      </div>
      <div className="flex gap-[10px] mx-[5px] mt-[50px] h-[40px]">
        <div className="flex-1 flex border-[3px]">
          <div className="w-[35%] flex items-center justify-center border-r-[3px]">$</div>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={inputMin}
            className="bg-transparent w-[65%] m-[5px]"
            onChange={(e) => {
              setInputMin(e.target.value)
            }}
            onBlur={handleMinBlur}
            onKeyDown={handleMinKeyDown}
          />
        </div>
        <div className="flex-1  flex border-[3px]">
          <div className="w-[35%] flex items-center justify-center  border-r-[3px]">$</div>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={inputMax}
            className="bg-transparent w-[65%] m-[5px]"
            onChange={(e) => {
              setInputMax(e.target.value);
            }}
            onBlur={handleMaxBlur}
            onKeyDown={handleMaxKeyDown}
          />
        </div>
      </div>
    </>
  );
};
export default Option1;
