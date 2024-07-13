import React, { useState, useEffect } from "react";
import { Select } from "antd";

function CategorySelect({ category, setSelectedCategory }) {
  return (
    <div>
      <label htmlFor="categories">
        <Select placeholder="Categories" onSelect={e => setSelectedCategory(e)}>
          <Select.Option value="all">All</Select.Option>
          {category.map((item, ind) => {
            return (
              <Select.Option key={ind} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </label>
    </div>
  );
}

export default CategorySelect;
