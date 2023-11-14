import React, { useState } from "react";
import SearchIcon from "../../../public/search.svg";
import ReactDatePicker from "react-datepicker";

interface SearchBoxProps {
  onChange?: React.ReactEventHandler<HTMLInputElement>;
  query: string;
  placeholder: string;
  label?: string;
  startDate: string;
  changeStartDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endDate: string;
  changeEndDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  query,
  placeholder,
  label,
  startDate,
  changeStartDate,
  endDate,
  changeEndDate,
}) => {
  const inputClassName = "bg-gray-700 text-white rounded px-4 py-2";

  console.log(startDate);
  return (
    <div className="flex-col space-y-4">
      <div className="flex space-x-4 w-min">
        <input
          id="start-date"
          type="date"
          className={`${inputClassName} `}
          onChange={changeStartDate}
        />
        <input
          id="end-date"
          type="date"
          className={`${inputClassName}`}
          onChange={changeEndDate}
        />
      </div>
      <div className="flex space-x-4 bg-gray-700 border-2 text-sm rounded-lg w-full p-2 text-white">
        {label && <label htmlFor="search-box">{label}</label>}

        <div className="flex items-center ps-4 pointer-events-none">
          <SearchIcon viewBox="0 0 24 24" height={24} />
        </div>
        <input
          id="search-box"
          type="text"
          placeholder={placeholder}
          className="bg-gray-700 w-full focus:outline-0"
          onChange={onChange}
          value={query}
        />
      </div>
    </div>
  );
};

export default SearchBox;
