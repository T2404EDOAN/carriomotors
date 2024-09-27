import React, { useState } from "react";
import { extendTheme, CssVarsProvider } from "@mui/joy/styles";
import Select, { selectClasses } from '@mui/joy/Select';

import "../assets/styles/SearchForm.css";
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

// Extend MUI Joy theme

const SearchForm = () => {
  return (
    <div className="Container">
      <div className="container-search">
        <div className="search-top">
          <div className="search-top-left">
            <div className="search-top-left1">
            <p>CAR BRAND </p>
            <Select
            placeholder="Select a pet…"
            indicator={<KeyboardArrowDown />}
            sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
            },
            },
            } }
            >
            </Select>
            </div>
            <div className="search-top-left2">
            <p>CAR BRAND </p>
            <Select
            placeholder="Select a pet…"
            indicator={<KeyboardArrowDown />}
            sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
            },
            },
            } }
            >
            </Select>
            </div>
          </div>
          <div className="search-top-right">
            <h2>Search</h2>
            <p>Here you can search for your desired cars</p>
          </div>
        </div>
      </div>

      <form className="search-form">
        {/* Add form inputs here */}
      </form>
    </div>
  );
};

export default SearchForm;
