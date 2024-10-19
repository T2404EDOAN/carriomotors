import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, Input, Row, Col, Table, Button, Modal, Form, Input as AntInput, Space, Select, Upload, message } from 'antd';
import {
  DashboardOutlined,
  CarOutlined,
  InboxOutlined,
  UserOutlined,
  ShoppingOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import '../assets/styles/Admin.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: 'No',
    dataIndex: 'index',
    key: 'index',
    width: 70,
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Actions',
    key: 'action',
    width: 150,
    render: (text, record) => (
      <Space size="middle">
        <Button type="link">Edit</Button>
        <Button type="link">Delete</Button>
      </Space>
    ),
  },
  { title: 'Vehicle ID', dataIndex: 'VehicleID', key: 'VehicleID', width: 120 },
  { title: 'Model', dataIndex: 'Car_modelID', key: 'Car_modelID', width: 150 },
  { title: 'Brand', dataIndex: 'BrandID', key: 'BrandID', width: 150 },
  { title: 'Engine Power', dataIndex: 'Engine_power', key: 'Engine_power', width: 150 },
  { title: 'Fuel Type', dataIndex: 'Fuel_type', key: 'Fuel_type', width: 120 },
  { title: 'Transmission', dataIndex: 'Transmission', key: 'Transmission', width: 150 },
  { title: 'Seating Capacity', dataIndex: 'Seating_capacity', key: 'Seating_capacity', width: 150 },
  { title: 'Drivetrain', dataIndex: 'Drivetrain', key: 'Drivetrain', width: 150 },
  { title: 'Origin', dataIndex: 'Origin', key: 'Origin', width: 150 },
  { title: 'Mileage', dataIndex: 'Mileage', key: 'Mileage', width: 120 },
  { title: 'Year', dataIndex: 'Year', key: 'Year', width: 120 },
  { title: 'Price', dataIndex: 'Price', key: 'Price', width: 150 },
  { title: 'Fuel Tank Capacity', dataIndex: 'Fuel_tank_capacity', key: 'Fuel_tank_capacity', width: 150 },
  { title: 'Curb Weight', dataIndex: 'Curb_weight', key: 'Curb_weight', width: 120 },
  { title: 'Torque', dataIndex: 'Torque', key: 'Torque', width: 120 },
  { title: 'Top Speed', dataIndex: 'Top_speed', key: 'Top_speed', width: 120 },
  { title: 'Acceleration (0-100)', dataIndex: 'Acceleration_0_100', key: 'Acceleration_0_100', width: 150 },
  { title: 'Engine Type', dataIndex: 'engine_type', key: 'engine_type', width: 150 },
  { title: 'Horsepower', dataIndex: 'horsepower', key: 'horsepower', width: 120 },
  { title: 'Braking Distance', dataIndex: 'braking_distance', key: 'braking_distance', width: 150 },
  { title: 'Fuel Efficiency', dataIndex: 'fuel_efficiency', key: 'fuel_efficiency', width: 150 },
  { title: 'CO2 Emission', dataIndex: 'co2_emission', key: 'co2_emission', width: 150 },
  { title: 'Status', dataIndex: 'status', key: 'status', width: 120 }
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tableHeight, setTableHeight] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]); // Lưu trữ file ảnh
  const [mainImage, setMainImage] = useState('');
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch('https://carriomotors.io.vn/api/get_location.php')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error("Error calling API:", error));
  }, []);

  useEffect(() => {
    fetch('https://carriomotors.io.vn/api/get_brands.php')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error("Error calling API to get brand list:", error));
  }, []);

  useEffect(() => {
    fetch('https://carriomotors.io.vn/api/get_model.php')
      .then(response => response.json())
      .then(data => setModels(data))
      .catch(error => console.error("Error calling API to get model list:", error));
  }, []);

  useEffect(() => {
    fetch('https://carriomotors.io.vn/api/get_color.php')
      .then(response => response.json())
      .then(data => setColors(data))
      .catch(error => console.error("Error calling API to get color list:", error));
  }, []);
  
  const uploadImageToImgbb = (file) => {
    const apiKey = '5baca5ecaa39640800e17862d37b4a71'; // Replace with your API key
    
    return new Promise((resolve, reject) => {
      // Check if the file is a Blob or File
      if (!(file instanceof Blob || file instanceof File)) {
        reject(new Error("File is not of type Blob or File"));
        return;
      }
  
      const formData = new FormData();
      formData.append('image', file); // Send file directly to imgbb
      
      fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          resolve(data.data.url); // Return the uploaded image URL
        } else {
          message.error(`Upload failed: ${data.error.message}`);
          reject(data.error.message);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        message.error(`Error uploading image to imgbb: ${error.message}`);
        reject(error);
      });
    });
  };

  const handleEdit = (record) => {
    console.log('Edit vehicle', record);
  };

  const handleDelete = (record) => {
    console.log('Delete vehicle', record);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleImageUpload = async ({ fileList }) => {
    try {
      if (!fileList || fileList.length === 0) {
        message.error('Please select at least one image.');
        return;
      }

      // Upload images to imgbb and save the URL of each image
      const uploadedImages = await Promise.all(
        fileList.map(async (file) => {
          const fileToUpload = file.originFileObj || file;

          if (!(fileToUpload instanceof Blob || fileToUpload instanceof File)) {
            throw new Error("File is not the correct format.");
          }

          const uploadedUrl = await uploadImageToImgbb(fileToUpload);
          return uploadedUrl;
        })
      );

      // Check if any images failed to upload
      if (uploadedImages.includes(null)) {
        message.error('Some images failed to upload.');
      } else {
        // Separate the main image and the additional images
        const mainImg = uploadedImages[0]; // First image is the main image
        const additionalImgs = uploadedImages.slice(1); // Remaining images are additional

        // Store the main image and additional images in separate state variables
        setMainImage(mainImg); // Save the main image in state
        setGallery(additionalImgs); // Save the additional images in state
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      message.error('Error uploading images: ' + error.message);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Check if there is a main image
      if (!mainImage) {
        message.error('Please upload at least one main image.');
        return;
      }

      // Build the payload
      const payload = {
        brand_id: values.BrandID,
        car_modelid: values.Car_modelID,
        series_name: values.SeriesName,
        engine_power: values.Engine_power,
        fuel_type: values.Fuel_type,
        transmission: values.Transmission,
        seating_capacity: values.Seating_capacity,
        drivetrain: values.Drivetrain,
        origin: values.Origin,
        mileage: values.Mileage,
        year: values.Year,
        price: values.Price,
        fuel_tank_capacity: values.Fuel_tank_capacity,
        curb_weight: values.Curb_weight,
        torque: values.Torque,
        status: '1',
        top_speed: values.Top_speed,
        acceleration_0_100: values.Acceleration_0_100,
        engine_type: values.Engine_type,
        horsepower: values.Horsepower,
        braking_distance: values.Braking_distance,
        fuel_efficiency: values.Fuel_efficiency,
        co2_emission: values.CO2_emission,
        colors: values.colors,
        locations: values.locations,
        main_image: mainImage, // Main image
        gallery: gallery, // Additional images
      };

      // Log the payload before sending
      console.log('Payload before sending:', payload);

      // Send payload to server
      const response = await fetch('https://carriomotors.io.vn/api/post_vehicles.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.error) {
        message.error(`Error: ${result.error}`);
      } else {
        message.success('New vehicle added successfully!');
        setIsModalVisible(false);
        form.resetFields();
        setMainImage(''); // Reset main image
        setGallery([]); // Reset additional images
      }
    } catch (error) {
      message.error('Error submitting form: ' + error.message);
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <UserOutlined /> Profile
      </Menu.Item>
      <Menu.Item key="1">
        <SettingOutlined /> Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <LogoutOutlined /> Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo" style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            {collapsed ? 'AD' : 'Admin Dashboard'}
          </Title>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<CarOutlined />}>
            Vehicles
          </Menu.Item>
          <Menu.Item key="3" icon={<InboxOutlined />}>
            Inbox
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="5" icon={<ShoppingOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="6" icon={<LoginOutlined />}>
            Sign In
          </Menu.Item>
          <Menu.Item key="7" icon={<UserAddOutlined />}>
            Sign Up
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#ffffff', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style: { fontSize: '18px' }
            })}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Search
                placeholder="Search..."
                onSearch={value => console.log(value)}
                style={{ width: 200, marginRight: 24 }}
              />
              <Dropdown overlay={userMenu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar icon={<UserOutlined />} />
                  <span style={{ marginLeft: 8 }}>Admin</span>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content style={{ padding: '24px', minHeight: "100%", backgroundColor: "#ffffff" }}>
          <Row style={{ height: '100%' }}>
            <Col span={24}>
              <div style={{ textAlign: "right", marginBottom: "20px" }}>
                <Button type="primary" onClick={showModal}>Add vehicle</Button>
              </div>
              <Table
  columns={columns}
  dataSource={[]} // Đảm bảo dataSource là một mảng trống khi không có dữ liệu
  pagination={false}
  scroll={{ x: 1500, y: tableHeight }} // Đặt x với giá trị lớn hơn để có thanh cuộn ngang
  className="custom-scrollbar"
  locale={{ emptyText: 'No Data' }} // Hiển thị thông báo "No Data" khi không có dữ liệu
/>

            </Col>
          </Row>
        </Content>
      </Layout>
      <Modal
        title="Add vehicles"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        width={1100} // Increase modal width for 4-column layout
      >
        <Form form={form} layout="vertical">
          {/* First row: General Information */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="BrandID"
                label="Brand"
                rules={[{ required: true, message: 'Please select a Brand!' }]}
              >
                <Select placeholder="Select brand">
                  {brands.map(brand => (
                    <Option key={brand.id} value={brand.id}>
                      {brand.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Car_modelID"
                label="Model"
                rules={[{ required: true, message: 'Please select a Model!' }]}
              >
                <Select placeholder="Select model">
                  {models.map(model => (
                    <Option key={model.id} value={model.id}>
                      {model.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="SeriesName"
                label="Series"
                rules={[{ required: true, message: 'Please enter a Series!' }]}
              >
                <AntInput placeholder="Enter series" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Engine_power"
                label="Engine Power"
              >
                <AntInput placeholder="Enter engine power" />
              </Form.Item>
            </Col>
          </Row>

          {/* Second row: Engine performance */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="Torque"
                label="Torque"
              >
                <AntInput placeholder="Enter torque" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Horsepower"
                label="Horsepower"
              >
                <AntInput placeholder="Enter horsepower" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Top_speed"
                label="Top Speed"
              >
                <AntInput placeholder="Enter top speed" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Acceleration_0_100"
                label="Acceleration (0-100 km/h)"
              >
                <AntInput placeholder="Enter acceleration time (0-100 km/h)" />
              </Form.Item>
            </Col>
          </Row>

          {/* Third row: Fuel and transmission information */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="Fuel_type"
                label="Fuel Type"
              >
                <Select placeholder="Select fuel type">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                  <Option value="Electric">Electric</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Fuel_tank_capacity"
                label="Fuel Tank Capacity"
              >
                <AntInput placeholder="Enter fuel tank capacity" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Fuel_efficiency"
                label="Fuel Efficiency (L/100km)"
              >
                <AntInput placeholder="Enter fuel efficiency (L/100km)" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Transmission"
                label="Transmission"
              >
                <AntInput placeholder="Enter transmission" />
              </Form.Item>
            </Col>
          </Row>

          {/* Fourth row: Other specifications */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="Seating_capacity"
                label="Seating Capacity"
              >
                <AntInput placeholder="Enter seating capacity" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Curb_weight"
                label="Curb Weight"
              >
                <AntInput placeholder="Enter curb weight" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Drivetrain"
                label="Drivetrain"
              >
                <AntInput placeholder="Enter drivetrain" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Origin"
                label="Origin"
              >
                <AntInput placeholder="Enter origin" />
              </Form.Item>
            </Col>
          </Row>

          {/* Fifth row: Year of manufacture and price */}
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item
                name="Year"
                label="Year of Manufacture"
                rules={[{ required: true, message: 'Please enter the year of manufacture!' }]}
              >
                <AntInput placeholder="Enter year of manufacture" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the price!' }]}
              >
                <AntInput placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="CO2_emission"
                label="CO2 Emission"
              >
                <AntInput placeholder="Enter CO2 emission" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Mileage"
                label="Mileage"
              >
                <AntInput placeholder="Enter mileage" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="colors"
                label="Colors"
                rules={[{ required: true, message: 'Please select colors!' }]}
              >
                <Select mode="multiple" placeholder="Select vehicle colors">
                  {colors.map(color => (
                    <Option key={color.color_id} value={color.color_id}>
                      {color.color_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="locations"
                label="Locations"
                rules={[{ required: true, message: 'Please select locations!' }]}
              >
                <Select mode="multiple" placeholder="Select vehicle sales locations">
                  {locations.map(location => (
                    <Option key={location.id} value={location.id}>
                      {location.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* Upload main and additional images */}
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="main_img"
                label="Main Image"
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false} // Do not upload directly, handle after selection
                  onChange={handleImageUpload} // Call function when images are selected
                  multiple
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
              </Form.Item>
            </Col>

          </Row>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Admin;
