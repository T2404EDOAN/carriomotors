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
  message,
  Pagination,
} from "antd";
import { FilterOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import { PriceChange } from "@mui/icons-material";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [cars, setCars] = useState([]); 
  const [brands, setBrands] = useState([]); 
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // For storing filtered cars
  const[PriceRange,setPriceRange] = useState([0,500000]);
  
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Gọi API để lấy dữ liệu về xe
        const response = await axios.get("https://carriomotors.online/api/get_products.php");
        setCars(response.data); 
        setFilteredCars(response.data); // Initialize with all cars
      } catch (error) {
        message.error("Failed to fetch car data");
        console.error(error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        // Gọi API để lấy dữ liệu về hãng xe
        const response = await axios.get("https://carriomotors.online/api/get_brand.php");
        setBrands(response.data);
      } catch (error) {
        message.error("Failed to fetch brand data");
        console.error(error);
      }
    };

    fetchBrand();
  }, []);

  const headerStyle = {
    background: "#fff",
    padding: "10px 20px",
    height: "auto",
    lineHeight: "normal",
  };

  const colStyle = {
    display: "flex",
    alignItems: "center",
    height: "40px",
  };

  const showFilter = () => {
    setIsFilterVisible(true);
  };

  const onCloseFilter = () => {
    setIsFilterVisible(false);
  };
const chongiathanhtruot = (value) =>{
  setPriceRange(value);

  const chongia = cars.filter((car) => car.price >= value[0] && car.price <= value[1]);
  setFilteredCars(chongia);
}

  const handleBrandSelection = (checkedValues) => {
    setSelectedBrands(checkedValues);
    if (checkedValues.length === 0) {
      // If no brands are selected, show all cars
      setFilteredCars(cars);
    } else {
      // Filter cars based on selected brands
      const filtered = cars.filter(car => checkedValues.includes(car.brandid));
      setFilteredCars(filtered);
    }
  };

  const handleSelectAllBrands = (e) => {
    if (e.target.checked) {
   
      const allBrandIds = brands.map(brand => brand.brandid);
      setSelectedBrands(allBrandIds);
      setFilteredCars(cars); 
    } else {
      
      setSelectedBrands([]);
      setFilteredCars(cars); 
    }
  };

  const renderSidebar = () => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={4}>Filter</Title>
        <Button type="link" onClick={() => handleBrandSelection([])}>
          Reset
        </Button>
      </Row>
      <Title level={5}>Models</Title>
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
      <Title level={5}>Brand</Title>
      {/* <Checkbox
      
        onChange={handleSelectAllBrands}
        checked={selectedBrands.length === brands.length}
      >
        All Brands
      </Checkbox> */}
      <Checkbox.Group
        value={selectedBrands}
        onChange={handleBrandSelection}
        style={{ marginBottom: 20 }}
      >
        {brands.map((brand) => (
          <Checkbox key={brand.brandid} value={brand.brandid}>
            {brand.name}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Title level={5}>Price Range</Title>
      <Slider 
        range 
        defaultValue={PriceRange} 
        min={0} 
        max={500000} 
        onChange={chongiathanhtruot}  
      />
      <Row justify="space-between">
        <Text>${PriceRange[0].toLocaleString()}</Text>
        <Text>${PriceRange[1].toLocaleString()}</Text>
      </Row>
    </>
  );

  const renderCarCard = (car) => (
    <Card
      key={car.id}
      cover={
        <div
          style={{
            height: 200,
            background: "#f0f0f0",
            position: "relative",
          }}
        >
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
                <Select.Option value="price-low-high">
                  Price: Low to High
                </Select.Option>
                <Select.Option value="price-high-low">
                  Price: High to Low
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

          <Title level={4}>{filteredCars.length} Cars Found</Title>
          <Row gutter={[16, 16]}>
            {filteredCars.map((car) => (
              <Col xs={24} sm={12} lg={8} key={car.id}>
                {renderCarCard(car)}
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
