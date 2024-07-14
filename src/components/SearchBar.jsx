import { AutoComplete } from "antd";
import { Input } from "antd";
import React, { useState } from "react";
const { Search } = Input;

function SearchBar({ setSearchKeyword }) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="search">
      <AutoComplete autoComplete="true" allowClear={true}>
        <Search
          placeholder="Search available products"
          onChange={e => {
            setSearchKeyword(e.target.value);
            setSearchValue(e.target.value);
          }}
          onSearch={() => setSearchKeyword(searchValue)}
          value={searchValue}
        />
      </AutoComplete>
    </div>
  );
}

export default SearchBar;
