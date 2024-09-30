import React, { useState, useEffect } from "react";
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
  message,Pagination,
} from "antd";
import { FilterOutlined, BookOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [cars, setCars] = useState([]); // State để lưu dữ liệu từ API
  const [brands, setBrands] = useState([]); 

  const screens = useBreakpoint();

  // useEffect để gọi API và lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Gọi API để lấy dữ liệu về xe
        const response = await axios.get("https://carriomotors.online/api/get_products.php"); 
        setCars(response.data); 
      } catch (error) {
        message.error("Failed to fetch car data"); 
        console.error(error);
      }
    };

    fetchCars(); // Gọi hàm fetchCars khi component được render
  }, []); // Mảng rỗng [] để hàm useEffect chỉ chạy một lần khi component mount


  useEffect(() => {
    const fetchBrand = async () => {
      try {
        // Gọi API để lấy dữ liệu về xe
        const response = await axios.get("https://carriomotors.online/api/get_brand.php"); 
        setBrands(response.data); 
      } catch (error) {
        message.error("Failed to fetch car data"); 
        console.error(error);
      }
    };

    fetchBrand(); // Gọi hàm fetchCars khi component được render
  }, []); // Mảng rỗng [] để hàm useEffect chỉ chạy một lần khi component mount
  const headerStyle = {
    background: "#fff",
    padding: "10px 20px",
    height: "auto",
    lineHeight: "normal",
  };

  const colStyle = {
    display: "flex",
    alignItems: "center",
    height: "40px", // Điều chỉnh chiều cao để phù hợp với Search component
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
        <Title level={4} style={{ margin: 0 }}>
          Filter
        </Title>
        <Button type="link">Reset</Button>
      </Row>
      <Title level={5}>Brand</Title>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="label">
       {brands.map((brand) => (
        <Select.Option key = {brand.brandid} value = {brand.brandid}>
          {brand.name}
          </Select.Option>
       ))}
       </Select>
      <Title level={5}>Model</Title>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
      />
      <Title level={5}>Brand</Title>
      <Checkbox style={{ marginBottom: 16 }}>All Brand</Checkbox>
      <Title level={5}>Price Range</Title>
      <Slider range defaultValue={[80000, 300000]} min={0} max={500000} />
      <Row justify="space-between">
        <Text>$80,000</Text>
        <Text>$300,000</Text>
      </Row>
    </>
  );

  // Hàm render card cho mỗi xe (sử dụng dữ liệu từ API)
  const renderCarCard = (car) => (
    <Card
      key={car.id} // Sử dụng ID của xe từ API làm key
      cover={
        <div
          style={{
            height: 200,
            background: "#f0f0f0",
            position: "relative",
          }}
        >
          {/* Hiển thị hình ảnh của xe */}
          <img
            src={car.img}
            alt={car.model}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          
        </div>
      }
    >
      <Card.Meta title={car.name} description={car.type} />
      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Text strong>${car.price.toLocaleString()}</Text>
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
                <Select.Option value="recommended">Recommended</Select.Option>
                <Select.Option value="latest">Latest</Select.Option>
                <Select.Option value="price-low-high">Price: Low to High</Select.Option>
                <Select.Option value="price-high-low">Price: High to Low</Select.Option>
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
          {/* Hiển thị số lượng xe lấy được từ API */}
          <Title level={4}>{cars.length} Cars Found</Title>
          <Row gutter={[16, 16]}>
            {/* Render danh sách xe từ API */}
            {cars.map((car) => (
              <Col xs={24} sm={12} lg={8} key={car.id}>
                {renderCarCard(car)} {/* Render từng card của xe */}
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      {/* <Pagination defaultCurrent={1} total={50} style={{float: right}} /> */}
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
