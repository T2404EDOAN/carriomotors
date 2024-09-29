import React, { useState } from "react";
import {
  Layout,
  Button,
  Input,
  Select,
  Card,
  Checkbox,
  Slider,
  Row,
  Col,
  Typography,
  Space,
  Grid,
  Drawer,
} from "antd";
import { FilterOutlined, BookOutlined, MenuOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const screens = useBreakpoint();

  const headerStyle = {
    background: "#fff",
    padding: "10px 20px",
    height: "auto",
    lineHeight: "normal",
  };

  const colStyle = {
    display: "flex",
    alignItems: "center",
    height: "40px", // Adjust this value to match the height of your Search component
  };

  const showFilter = () => {
    setIsFilterVisible(true);
  };

  const onCloseFilter = () => {
    setIsFilterVisible(false);
  };

  const renderSidebar = () => (
    <>
      <Row justify="space-between" align="middle">
      <Title level={4} style={{ margin: 0 }}>Filter</Title>
      <Button type="link">Reset</Button>
    </Row>
      <Title level={5}>Type of Car</Title>
      
      <Select
      showSearch
      style={{
      width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="label"
    
        />
     <Title level={5}>Brand</Title>
     <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Search to Select"
  />      <Title level={5}>Brand</Title>
      <Checkbox style={{ marginBottom: 16 }}>All Brand</Checkbox>
      <Title level={5}>Price Range</Title>
      <Slider range defaultValue={[80000, 300000]} min={0} max={500000} />
      <Row justify="space-between">
        <Text>$80,000</Text>
        <Text>$300,000</Text>
      </Row>
    </>
  );

  const renderCarCard = () => (
    <Card
      cover={
        <div
          style={{
            height: 200,
            background: "#f0f0f0",
            position: "relative",
          }}
        >
          <Button
            icon={<BookOutlined />}
            style={{ position: "absolute", top: 10, right: 10 }}
          />
        </div>
      }
    >
      <Card.Meta title="Car Model" description="Car Type" />
      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Text strong>$000,000</Text>
      </Row>
    </Card>
  );

  return (
    <Layout>
      <Header style={headerStyle}>
        <Row justify="end" align="middle" gutter={[16, 16]}>
          <Col style={colStyle}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{ width: "500px" }}
            />
          </Col>
          <Col style={colStyle}>
            <Space size="middle">
              <FilterOutlined style={{ fontSize: "18px" }} />
              <span>Filter</span>
              <Select
                defaultValue="recommended"
                style={{ width: 200 }}
                size="large"
              >
                <Select.Option value="recommended">
                  
                </Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        {screens.md ? (
          <Sider width={300} theme="light" style={{ padding: "20px" }}>
            {renderSidebar()}
          </Sider>
        ) : null}
        <Content style={{ padding: "20px" }}>
          {!screens.md && (
            <Button
              icon={<MenuOutlined />}
              style={{ marginBottom: 16 }}
              onClick={showFilter}
            >
              Filters
            </Button>
          )}
          <Title level={4}>64 Car Found</Title>
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Col xs={24} sm={12} lg={8} key={item}>
                {renderCarCard()}
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      <Drawer
        title="Filters"
        placement="left"
        onClose={onCloseFilter}
        visible={isFilterVisible}
        width={300}
      >
        {renderSidebar()}
      </Drawer>
    </Layout>
  );
};

export default CarListingLayout;
