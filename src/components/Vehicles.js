import React, { useState, useEffect, useRef } from "react";
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
import CarDetailModal from "./PopupDetail/CarDetailModal";
import "../assets/styles/SearchForm.css";
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = ({isTechnicalDataVisible }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false); 
  const [cars, setCars] = useState([]); 
  const [brands, setBrands] = useState([]); 
  const [selectedBrands, setSelectedBrands] = useState([]); 
  const [filteredCars, setFilteredCars] = useState([]); 
  const [PriceRange, setPriceRange] = useState([0, 500000]); 
  const [currentPage, setCurrentPage] = useState(1); 
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
  const searchInputRef = useRef(null);
  const [currentImages, setCurrentImages] = useState({});

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
        const uniqueColors = [...new Set(carsData.map((car) => car.color))];
        setColors(uniqueColors);
      } else {
        setCars([]);
        setFilteredCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // api cua brands
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
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCar(null);
  };

  //api cua model
  const fetchModels = async () => {
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
      console.log("Raw response:", response); // Kiểm tra toàn bộ response từ API
      const locationsData = response.data.data || response.data; // Đảm bảo lấy đúng API data

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

  //api cua Search
  const fetchSearch = async (value) => {
    try {
      const response = await axios.get(
        `https://carriomotors.io.vn/api/get_search.php?name=${value}`
      );
      console.log("Raw response:", response);
      const searchData = response.data.data || response.data;

      if (Array.isArray(searchData)) {
        setFilteredCars(searchData);
      } else {
        console.error("Data is not an array:", searchData);
        setFilteredCars([]);
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
    background: "#fff", // Nền trắng
    padding: "10px 20px",
    height: "auto",
    lineHeight: "normal",
  };

  const colStyle = {
    display: "flex",
    alignItems: "center",
    height: "40px",
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

    const filtered = cars.filter((car) => selectedColors.includes(car.color));
    setFilteredCars(filtered);
  };

  const reset = () => {
    setSelectedModels([]);
    setSelectedBrands([]);
    setSelectedLocations([]);
    setPriceRange([0, 500000]);
    setFilteredCars(cars);

    if (searchInputRef.current) {
      searchInputRef.current.input.value = "";
    }
  };

  // Sidebar rendering
  const renderSidebar = () => (
    <div style={{ background: "#fff" }}>
      {" "}
      {/* Nền trắng cho sidebar */}
      {/* <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Button type="link" onClick={reset}>
          Reset
        </Button>
      </Row> */}
      {/* model */}
      <Title level={4}>Models</Title>
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
      <Title level={4}>Location</Title>
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
      <Title level={4}>Brand</Title>
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
      <Title level={4}>Price Range</Title>
      <Slider
  style={{ width: '200px' }}
  range
  defaultValue={PriceRange}
  min={0}
  max={500000}
  onChange={handlePriceChage}
  trackStyle={{ backgroundColor: 'black' }}   // Black color for the track

/>

      <Row justify="space-between" style={{width:'200px'}}>
        <Text>${PriceRange[0]}</Text>
        <Text>${PriceRange[1]}</Text>
      </Row>
      {/* color */}
      <Title level={4} style={{ marginTop: "15px" }}>
        Color
      </Title>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap",width:'200px' }}>
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
    </div>
  );
  const handleImageClick = (car) => {
    const currentImageIndex = currentImages[car.id]?.index || 0; // Lấy chỉ số hiện tại hoặc mặc định là 0
    const nextImageIndex = (currentImageIndex + 1) % (car.images.length + 1); // Tính chỉ số ảnh kế tiếp, quay lại ảnh chính sau khi duyệt hết ảnh phụ
    
    const newImage =
      nextImageIndex === 0 ? car.main_img : car.images[nextImageIndex - 1].image_url; // Nếu là chỉ số 0 thì là ảnh chính, ngược lại lấy ảnh phụ
  
    setCurrentImages((prevState) => ({
      ...prevState,
      [car.id]: { url: newImage, index: nextImageIndex }, // Cập nhật chỉ số và ảnh mới
    }));
  };
  
  // Card rendering
  const renderCarCard = (car) => (
    <Card
      key={car.id}
      className="custom-card"
      bodyStyle={{ padding: 0 }}
      style={{
        width: "100%",
        background: "#ffffff",
        boxShadow: "none",
        border: "none",
        borderRadius: 0,
        overflow: "hidden",
      }}
      cover={
        <div
          style={{
            height: "216px",
            background: "#ffffff",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => showModal(car)} // Khi nhấn vào ảnh, mở popup
        >
          <img
            src={car.main_img} // Hiển thị ảnh chính trong danh sách
            alt={car.car_model_name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      }
    >
      <div style={{ height: "24px", marginTop: "8px" }}>
        <Title level={5} style={{ margin: 0 }}>
          {car.car_model_name}
        </Title>
      </div>
      <Row justify="space-between" align="middle" style={{ height: "24px" }}>
        <Text strong>${car.price}</Text>
      </Row>
    </Card>
  );
  
  
  

  return (
    <div className={isModalVisible  ? "blur-background" : ""}> 
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Layout style={{ background: "#fff" }}>
        {/* Nền trắng cho Layout */}
        <Header style={headerStyle}>
          <Row
            justify="end"
            align="middle"
            style={{ marginTop: "10px", display: "flex", justifyContent: "left" }}
          >
            <h2 style={{ fontSize: "40px" }}>Model Overview</h2>
          </Row>
        </Header>
        <Layout style={{ background: "#fff" }}>
          {screens.md ? (
            <Sider
              width={300}
              theme="light"
              style={{
                padding: "20px",
                background: "#fff",
                borderRight: "1px solid #f0f0f0",
              }}
            >
              {renderSidebar()}
            </Sider>
          ) : null}
          <Content style={{ padding: "20px", background: "#fff", width: "calc(100% - 300px)" }}>
            {!screens.md && (
              <Button
                icon={<MenuOutlined />}
                style={{ marginBottom: 16 }}
              >
                Filters
              </Button>
            )}
            <Title level={4}>{filteredCars.length} Cars </Title>
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
        
      </Layout>
    </div>
    </div>
  );
};

export default CarListingLayout;
