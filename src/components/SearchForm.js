import React, { useState } from "react";
import "../assets/styles/SearchForm.css";

const SearchForm = () => {
  const [filters, setFilters] = useState({
    rentalType: "perDay",
    priceRange: 1500,
    yearRange: [2016, 2023],
    transmission: {
      manual: false,
      automatic: false,
    },
    fuelType: {
      gas: false,
      electric: false,
      hybrid: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: {
          ...prevFilters[name],
          [value]: checked,
        },
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleRangeChange = (e) => {
    setFilters({
      ...filters,
      priceRange: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call or logic to fetch results will go here
    console.log(filters);
  };

  return (
    <div className="Container">
      {" "}
      {/* Chỉ còn lại .Container */}
      <div className="container-search">
        <div className="search-top">
          <div className="search-top-left">
            <h2>Search</h2>
            <p>Here you can search for your desired cars</p>
          </div>
          <div className="search-top-right">
            <h2>Search</h2>
            <p>Here you can search for your desired cars</p>
          </div>
        </div>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Add form inputs here */}
      </form>
    </div>
  );
};

export default SearchForm;
