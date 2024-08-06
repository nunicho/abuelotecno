import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBoxCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (category.trim()) {
      navigate(`/search/category/${category}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="q"
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Search Category..."
        className="mr-sm-2 ml-sm-5"
      ></input>
      <button type="submit" className="p-2">
        Search
      </button>
    </form>
  );
};

export default SearchBoxCategory;
