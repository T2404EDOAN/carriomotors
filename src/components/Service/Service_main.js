import React from "react";
import { Tabs } from "antd";
import Audi_main from "./Audi/Audi_main";
import Porsche_main from "../Porsche/Porsche";
import Mec_main from "./Mec/Mec_main";
import Bmv_main from "./BMV/Bmv_main";

export default function TabsBasic() {
  const items = [
    {
      key: "1",
      label: (
        <img
          src="./logo/logomec.png"
          alt="MEC Logo"
          style={{ width: "80px", transition: "transform 0.3s ease" }}
        />
      ),
      children: <Mec_main />,
    },
    {
      key: "2",
      label: (
        <img
          src="./logo/logobmw.png"
          alt="BMW Logo"
          style={{ width: "80px", transition: "transform 0.3s ease" }}
        />
      ),
      children: <Bmv_main />,
    },
    {
      key: "3",
      label: (
        <img
          src="./logo/logoaudi.png"
          alt="Audi Logo"
          style={{ width: "80px", transition: "transform 0.3s ease" }}
        />
      ),
      children: <Audi_main />,
    },
    {
      key: "4",
      label: (
        <img
          src="./logo/logoporsche.png"
          alt="Porsche Logo"
          style={{ width: "80px", transition: "transform 0.3s ease" }}
        />
      ),
      children: <Porsche_main />,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <Tabs
        defaultActiveKey="1"
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
