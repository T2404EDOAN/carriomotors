import React, { useState } from "react";
import { Tabs } from "antd";
import Audi_main from "./Audi/Audi_main";
import Porsche_main from "../Porsche/Porsche";
import Mec_main from "./Mec/Mec_main";
import Bmv_main from "./BMV/Bmv_main";


export default function Service_main() {
  const [activeKey, setActiveKey] = useState("1");

  const items = [
    {
      key: "1",
      label: (
        <img
          src="./logo/logomec.png"
          alt="MEC Logo"
          style={{
            width: activeKey === "1" ? "70px" : "50px",
            transition: "transform 0.3s ease, width 0.3s ease",
          }}
        />
      ),
      children: (
        <div style={{ fontSize: "16px", fontFamily: "Roboto, sans-serif" }}>
          <Mec_main />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <img
          src="./logo/logobmw.png"
          alt="BMW Logo"
          style={{
            width: activeKey === "2" ? "70px" : "50px",
            transition: "transform 0.3s ease, width 0.3s ease",
          }}
        />
      ),
      children: (
        <div style={{ fontSize: "16px", fontFamily: "Roboto, sans-serif" }}>
          <Bmv_main />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <img
          src="./logo/logoaudi.png"
          alt="Audi Logo"
          style={{
            width: activeKey === "3" ? "70px" : "50px",
            transition: "transform 0.3s ease, width 0.3s ease",
          }}
        />
      ),
      children: (
        <div style={{ fontSize: "16px", fontFamily: "Roboto, sans-serif" }}>
          <Audi_main />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <img
          src="./logo/logoporsche.png"
          alt="Porsche Logo"
          style={{
            width: activeKey === "4" ? "65px" : "45px",
            transition: "transform 0.3s ease, width 0.3s ease",
          }}
        />
      ),
      children: (
        <div style={{ fontSize: "16px", fontFamily: "Roboto, sans-serif" }}>
          <Porsche_main />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        fontFamily: "Roboto, sans-serif", // Áp dụng cho toàn bộ container
      }}
    >
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        centered
        items={items}
        tabBarStyle={{
          backgroundColor: "white",
          border: "none",
        }}
      />
    </div>
  );
}
