import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Button,
  Select,
  Card,
  Checkbox,
  Slider,
  Row,
  Col,
  Typography,
  Grid,
  Pagination,
  Avatar,
} from "antd";
import { useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import CarDetailModal from "./PopupDetail/CarDetailModal";
import "../assets/styles/SearchForm.css";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CarListingLayout = ({ isTechnicalDataVisible }) => {
  const location = useLocation();
  const { brandId } = location.state || {}; // Nhận brandId từ location.state (trang category)
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(
    brandId ? [String(brandId)] : []
  ); // Áp dụng brandId vào selectedBrands khi có brandId
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
  const [mainImage, setMainImage] = useState(null);
  const [selectedSpeedRange, setSelectedSpeedRange] = useState(null);
  const [colors, setColors] = useState([
    "red",
    "blue",
    "green",
    "black",
    "white",
    "silver",
    "gray",
  ]);
  const [selectedColors, setSelectedColors] = useState([]);
  const screens = useBreakpoint();

  // Hàm lấy danh sách xe từ API
  const fetchCars = async () => {
    try {
      const response = await axios.get(
        `https://carriomotors.io.vn/api/get_vehicle.php`
      );
      const carsData = response.data;
  
      if (Array.isArray(carsData)) {
        // Dữ liệu trả về đã có sẵn tên thương hiệu (brand_name), không cần ánh xạ thêm
        const validCars = carsData.map((car) => ({
          ...car,
          price: Math.floor(car.price), // Xử lý giá nếu cần
        }));
  
        setCars(validCars);
        setFilteredCars(validCars);
  
        const uniqueColors = [...new Set(validCars.map((car) => car.color))];
        setColors(uniqueColors);
      } else {
        setCars([]);
        setFilteredCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Gọi API để lấy dữ liệu xe và các thông tin ban đầu
  useEffect(() => {
    fetchCars();
    fetchLocations();
  }, []);

  // Gọi API để lấy danh sách hãng xe
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://carriomotors.io.vn/api/get_brands.php"
        );

        const brandsData = response.data;

        if (Array.isArray(brandsData)) {
          setBrands(brandsData);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Hàm lọc xe dựa trên các tiêu chí đã chọn (bao gồm brandId)
  const applyFilters = () => {
    let filtered = cars;

    // Lọc theo thương hiệu
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((car) =>
        selectedBrands.includes(String(car.brand_id))
      );
    }

    // Lọc theo mô hình
    if (selectedModels.length > 0) {
      filtered = filtered.filter((car) =>
        selectedModels.includes(car.car_modelid)
      );
    }

    // Lọc theo địa điểm
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((car) =>
        selectedLocations.includes(car.locationid)
      );
    }

    // Lọc theo màu sắc
    if (selectedColors.length > 0) {
      filtered = filtered.filter((car) => selectedColors.includes(car.color));
    }

    // Lọc theo tốc độ
    if (selectedSpeedRange && selectedSpeedRange.length > 0) {
      filtered = filtered.filter((car) => {
        return selectedSpeedRange.some((value) => {
          const [minSpeed, maxSpeed] = value.split("-").map(Number);
          return car.top_speed >= minSpeed && car.top_speed <= maxSpeed;
        });
      });
    }

    // Lọc theo giá
    filtered = filtered.filter(
      (car) => car.price >= PriceRange[0] && car.price <= PriceRange[1]
    );

    setFilteredCars(filtered);
  };

  // Cập nhật danh sách xe mỗi khi có thay đổi ở các tiêu chí lọc
  useEffect(() => {
    applyFilters();
  }, [
    selectedBrands,
    selectedModels,
    selectedLocations,
    selectedColors,
    selectedSpeedRange,
    PriceRange,
    cars,
  ]);

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý khi chọn tốc độ
  const handleSpeedRangeChange = (selectedValues) => {
    setSelectedSpeedRange(selectedValues);
    applyFilters();
  };

  // Xử lý khi chọn giá
  const handlePriceChange = (value) => {
    setPriceRange(value);
    applyFilters();
  };

  // Xử lý khi chọn thương hiệu
  const handleBrandSelection = (checkedValues) => {
    setSelectedBrands(checkedValues);
    applyFilters();
  };

  // Xử lý khi chọn mô hình
  const handleModelSelection = (checkedValues) => {
    setSelectedModels(checkedValues);
    applyFilters();
  };

  // Xử lý khi chọn địa điểm
  const handleLocationSelection = (checkedValues) => {
    setSelectedLocations(checkedValues);
    applyFilters();
  };

  // Xử lý khi chọn màu sắc
  const handleColorSelection = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
    applyFilters();
  };

  useEffect(() => {
    // Fetch models từ API
    const fetchModels = async () => {
      try {
        const response = await axios.get(
          "https://carriomotors.io.vn/api/get_model.php"
        );
        const modelsData = response.data.data || response.data;
        if (Array.isArray(modelsData)) {
          setModels(modelsData);
        } else {
          setModels([]);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);
  // Hàm chuyển đổi phân loại từ 1, 2, 3 sang tên dòng xe
  // Cập nhật hàm phân loại dựa trên car_model_status
  const getCategoryName = (status) => {
    switch (
      String(status) // Chuyển đổi status thành chuỗi
    ) {
      case "1":
        return "Sport Utility Vehicle";
      case "2":
        return "Sedan";
      case "3":
        return "Sport Coupe";
      default:
        return "Other";
    }
  };

  // Nhóm các models theo phân loại dòng xe
  const groupedModels = models.reduce((acc, model) => {
    console.log(model); // Kiểm tra giá trị car_model_status
    const category = getCategoryName(model.status); // Sử dụng car_model_status
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {});

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://carriomotors.io.vn/api/get_location.php"
      );

      const locationsData = response.data.data || response.data;

      if (Array.isArray(locationsData)) {
        setLocations(locationsData);
      } else {
        setLocations([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const reset = () => {
    setSelectedModels([]);
    setSelectedBrands(brandId ? [String(brandId)] : []); // Đặt lại brandId khi reset
    setSelectedLocations([]);
    setSelectedColors([]);
    setPriceRange([0, 500000]);
    setSelectedSpeedRange([]);
    setFilteredCars(cars);
  };
  const showModal = (car) => {
    setSelectedCar(car); // Cập nhật thông tin xe được chọn
    setIsModalVisible(true); // Hiển thị modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Ẩn modal
    setSelectedCar(null); // Xóa thông tin xe đã chọn
  };

  const renderSidebar = () => (
    <div style={{ background: "#fff" }}>
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
            <Checkbox
              key={brand.id}
              value={String(brand.id)}
              style={{ fontSize: "16px" }}
            >
              {brand.name}
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
      <Title level={4}>Models</Title>
      <Select
        mode="multiple"
        showSearch
        style={{ width: "100%", marginBottom: 20 }}
        placeholder="Search to Select"
        optionFilterProp="label"
        value={selectedModels}
        onChange={setSelectedModels}
        allowClear
      >
        {Object.keys(groupedModels).map((category) => (
          <Select.OptGroup key={category} label={category}>
            {groupedModels[category].map((model) => (
              <Select.Option key={model.id} value={model.id}>
                {model.name}
              </Select.Option>
            ))}
          </Select.OptGroup>
        ))}
      </Select>

      <Title level={4}>Select Top Speed</Title>
      <Select
        mode="multiple"
        showSearch
        placeholder="Select a speed range"
        style={{
          width: "100%",
          marginBottom: 20,
        }}
        value={selectedSpeedRange}
        onChange={handleSpeedRangeChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: "0-100", label: "0-100 km/h" },
          { value: "100-200", label: "100-200 km/h" },
          { value: "200-300", label: "200-300 km/h" },
          { value: "300-400", label: "300-400 km/h" },
        ]}
        allowClear
      />

      <Title level={4} style={{ fontSize: "16px" }}>
        Price Range
      </Title>
      <Slider
        style={{ width: "95%" }}
        range
        defaultValue={PriceRange}
        min={0}
        max={500000}
        onChange={handlePriceChange}
        trackStyle={{ backgroundColor: "black" }}
      />

      <Row justify="space-between" style={{ width: "100%" }}>
        <Text style={{ fontSize: "16px" }}>${PriceRange[0]}</Text>
        <Text style={{ fontSize: "16px" }}>${PriceRange[1]}</Text>
      </Row>
    </div>
  );

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
          onClick={() => showModal(car)}
        >
          <img
            src={car.main_img}
            alt={car.car_model_name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      }
    >
      <div style={{ height: "24px", marginTop: "8px" }}>
        <Title
          level={5}
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "normal",
            fontSize:"14px",
          }}
        >
          {`${car.brand_name} ${car.car_model_name} ${car.series_name}`}
        </Title>
      </div>
      <Row justify="space-between" align="middle" style={{ height: "24px" }}>
      <Text style={{ fontWeight: "normal" }}>${car.price}</Text>
      </Row>
    </Card>
  );

  const headerStyle = {
    background: "#fff",
    padding: "10px 20px",
    height: "auto",
    lineHeight: "normal",
  };

  return (
    <div className={isModalVisible ? "blur-background" : ""}>
      <div className="all-products">
        <div className="all-sanpham">All {filteredCars.length} Cars</div>
      </div>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Layout style={{ background: "#fff" }}>
          <Header style={headerStyle}>
            <Row
              justify="end"
              align="middle"
              style={{
                marginTop: "10px",
                display: "flex",
                marginBottom: "20px",
                justifyContent: "left",
              }}
            >
              <h2 style={{ fontSize: "48px" }}>Model Overview</h2>
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
            <Content
              style={{
                padding: "20px",
                background: "#fff",
                width: screens.md ? "calc(100% - 300px)" : "100%",
                marginLeft: "70px",
                height: "1100px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!screens.md && (
                <Button icon={<MenuOutlined />} style={{ marginBottom: 16 }}>
                  Filters
                </Button>
              )}

              <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
                <Row gutter={[16, 16]} style={{ margin: 0 }}>
                  {currentCars.map((car) => (
                    <Col
                      xs={24}
                      sm={12}
                      lg={8}
                      key={car.id}
                      style={{ padding: 12 }}
                    >
                      {renderCarCard(car)}
                    </Col>
                  ))}
                </Row>
              </div>
              <Row justify="center" style={{ marginTop: 20, flexShrink: 0 }}>
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
              setMainImage={setMainImage}
            />
          )}
        </Layout>
      </div>
    </div>
  );
};

export default CarListingLayout;
