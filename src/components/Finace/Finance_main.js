import React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import FinanceMec from "./Finance_Mec";
const Finance_main = () => {
  return (
    <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList
        sx={{
          height: "70px",
          justifyContent: "center",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Tab sx={{ width: "120px" }}>Mercedes -Benz</Tab>
        <Tab sx={{ width: "120px" }}>BMV</Tab>
        <Tab sx={{ width: "120px" }}>Audi</Tab>
        <Tab sx={{ width: "120px" }}>PORSCHE</Tab>
      </TabList>
      <TabPanel value={0} sx={{ fontFamily: "Roboto, sans-serif" }}>
        <FinanceMec />
      </TabPanel>
      <TabPanel value={1}></TabPanel>
      <TabPanel value={2}></TabPanel>
      <TabPanel value={3}></TabPanel>
    </Tabs>
  );
};
export default Finance_main;
