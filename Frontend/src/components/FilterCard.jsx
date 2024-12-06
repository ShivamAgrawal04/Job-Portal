import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41k-60k", "61k-80k"],
  },
];
const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((data, filterIndex) => (
          <div key={filterIndex}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, itemIndex) => {
              const uniqueId = `${data.filterType}-${item}`;
              return (
                <div
                  key={itemIndex}
                  className="flex items-center space-x-2 my-2 gap-1"
                >
                  <RadioGroupItem
                    className="cursor-pointer"
                    value={item}
                    id={uniqueId}
                  />
                  <Label htmlFor={uniqueId} className="cursor-pointer">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
