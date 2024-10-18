import React, { useState } from "react";
import { Tabs } from "antd";

import FinanceMec from "./Finance_Mec";
import FinanceBMW from "./Finace_Bmw";
import FinanceAudi from "./Finance_Audi";
import FinancePorsche from "./Finance_Porsche";

export default function Finance_Main() {
  const [activeKey, setActiveKey] = useState("1");

  const items = [
    {
      key: "1",
      label: (
        <img
          src="./logo/logomec.png"
          alt="MEC Logo"
          style={{
            width: activeKey === "1" ? "70px" : "50px", // Kích thước khi tab được chọn và không chọn
            transition: "transform 0.3s ease, width 0.3s ease", // Thêm transition cho mượt
          }}
        />
      ),
      children: (
        <div style={{ fontSize: "16px", fontFamily: "Roboto, sans-serif" }}>
          <FinanceMec/>
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
          <FinanceBMW />
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
          <FinanceAudi />
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
          <FinancePorsche />
        </div>
      ),
    },
  ];
<FinancePorsche />
  return (
    <div
      style={{
        backgroundColor: "white",
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
