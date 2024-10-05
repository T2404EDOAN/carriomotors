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
  Avatar,
} from "antd";
import { FilterOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import { PriceChange } from "@mui/icons-material";
import CarDetailModal from "./PopupDetail/CarDetailModal";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Trạng thái hiển thị bộ lọc
  const [cars, setCars] = useState([]); // Danh sách các xe
  const [brands, setBrands] = useState([]); // Danh sách các thương hiệu xe
  const [selectedBrands, setSelectedBrands] = useState([]); // Các thương hiệu được chọn
  const [filteredCars, setFilteredCars] = useState([]); // Các xe sau khi lọc
  const [PriceRange, setPriceRange] = useState([0, 500000]); // Khoảng giá được chọn
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(9);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [mainImage, setMainImage] = useState(null); // anh chinh
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [colors, setColors] = useState([
    "red",
    "blue",
    "green",
    "black",
    "white",
    "silver",
    "gray",
  ]); // List of colors
  const [selectedColors, setSelectedColors] = useState([]);
  const screens = useBreakpoint();

  //api cua vehicle
  const fetchCars = async (value = "recommended") => {
    try {
      const response = await axios.get(
        `https://carriomotors.io.vn/api/get_vehicle.php?sort=${value}`
      );

      console.log("Raw response:", response);
      const carsData = response.data.data || response.data;

      if (Array.isArray(carsData)) {
        setCars(carsData);
        setFilteredCars(carsData);
      } else {
        console.error("Data is not an array:", carsData);
        setCars([]);
        setFilteredCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://carriomotors.io.vn/api/get_brands.php"
        );

        console.log("Raw response:", response);
        const brandsData = response.data.data || response.data;

        if (Array.isArray(brandsData)) {
          setBrands(brandsData);
          setSelectedBrands(brandsData);
        } else {
          setBrands([]);
          setSelectedBrands([]);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchBrands();
  }, []);
  const showModal = (car) => {
    setSelectedCar(car);
    setMainImage(car.img); // dat tam anh chinh
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCar(null);
  };
  //api cua model
  const fetchModels = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(
        "https://carriomotors.io.vn/api/get_model.php"
      );

      console.log("Raw response:", response);
      const modelsData = response.data.data || response.data;

      if (Array.isArray(modelsData)) {
        setModels(modelsData);
      } else {
        console.error("Data is not an array:", modelsData);
        setModels([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  //api cua location
  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://carriomotors.io.vn/api/get_location.php"
      );

      console.log("Raw response:", response); // Kiểm tra toàn bộ response từ AP
      const locationsData = response.data.data || response.data; // Đảm bảo lấy đúng a

      if (Array.isArray(locationsData)) {
        setLocations(locationsData);
      } else {
        console.error("Data is not an array:", locationsData);
        setLocations([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchModels();
    fetchLocations();
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
  const handlePriceChage = (value) => {
    setPriceRange(value);

    const filterPrice = cars.filter(
      (car) => car.price >= value[0] && car.price <= value[1]
    );
    setFilteredCars(filterPrice);
  };

  const handleBrandSelection = (checkedValues) => {
    setSelectedBrands(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        checkedValues.includes(car.brandid)
      );
      setFilteredCars(filtered);
    }
  };

  const handleModelSelection = (checkedValues) => {
    setSelectedModels(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        checkedValues.includes(car.car_modelid)
      );
      setFilteredCars(filtered);
    }
  };

  const handleLocationSelection = (checkedValues) => {
    setSelectedLocations(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) =>
        checkedValues.includes(car.locationid)
      );
      setFilteredCars(filtered);
    }
  };

  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }

    if (selectedColors.length === 0) {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter((car) => selectedColors.includes(car.color));
      setFilteredCars(filtered);
    }
  };

  const reset = () => {
    setSelectedModels([]);
    setSelectedBrands([]);
    setSelectedLocations([]);
    setPriceRange([0, 500000]);
    setFilteredCars(cars);
  };
  // aaa
  const renderSidebar = () => (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3}>Filter</Title>
        <Button type="link" onClick={reset}>
          Reset
        </Button>
      </Row>

      {/* model */}

      <Title level={5}>Models</Title>
      <Select
        showSearch
        style={{
          width: 200,
          marginBottom: 20,
        }}
        placeholder="Search to Select"
        optionFilterProp="label"
        value={selectedModels}
        onChange={handleModelSelection}
      >
        {models.map((model) => (
          <Select.Option key={model.id} value={model.id}>
            {model.name}
          </Select.Option>
        ))}
      </Select>

      {/* Location */}
      <Title level={5}>Location</Title>
      <Select
        showSearch
        style={{
          width: 200,
          marginBottom: 20,
        }}
        placeholder="Search to Select"
        optionFilterProp="label"
        value={selectedLocations}
        onChange={handleLocationSelection}
      >
        {locations.map((location) => (
          <Select.Option key={location.id} value={location.id}>
            {location.name}
          </Select.Option>
        ))}
      </Select>
      {/* brand */}
      <Title level={5}>Brand</Title>
      <Checkbox.Group
        value={selectedBrands}
        onChange={handleBrandSelection}
        style={{ marginBottom: 20 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {brands.map((brand) => (
            <Checkbox key={brand.id} value={brand.id}>
              {brand.name}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>

      {/* price */}
      <Title level={5}>Price Range</Title>
      <Slider
        range
        defaultValue={PriceRange}
        min={0}
        max={500000}
        onChange={handlePriceChage}
      />
      <Row justify="space-between">
        <Text>${PriceRange[0]}</Text>
        <Text>${PriceRange[1]}</Text>
      </Row>

      {/* color */}
      <Title level={5}>Color</Title>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {colors.map((color) => (
          <Avatar
            key={color}
            onClick={() => handleColorSelection(color)}
            style={{
              backgroundColor: color,
              cursor: "pointer",
              border: selectedColors.includes(color)
                ? "1px solid #488ded"
                : "none",
              transition: "transform 0.3s",
              transform: selectedColors.includes(color)
                ? "scale(1.1)"
                : "scale(1)",
            }}
            size={30}
          />
        ))}
      </div>
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
            cursor: "pointer",
          }}
          onClick={() => showModal(car)}
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
        <Text strong>${car.price}</Text>
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
              style={{
                width: "500px",
                "::placeholder": { fontWeight: "normal" },
              }}
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
                onChange={(value) => fetchCars(value)}
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
        <Row justify="center" style={{ marginTop: 20 }}>
          <Pagination
            current={currentPage}
            total={filteredCars.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </Row>
      </Content>
    </Layout>
      {selectedCar && (
        <CarDetailModal
          isVisible={isModalVisible}
          onClose={closeModal}
          car={selectedCar}
          mainImage={mainImage}
          setMainImage={setMainImage} // gui mainimage xuong CarInfoTab
        />
      )}

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
