import React, { useState, useEffect,useRef  } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, Input, Row, Col, Table, Button, Modal, Form, Input as AntInput, Space, Select, Upload,message, message as antdMessage,Tabs } from 'antd';
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
  UploadOutlined,
  MenuUnfoldOutlined,
  EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import '../assets/styles/Admin.css';
import axios from 'axios';
import { Badge } from 'antd';
const { TabPane } = Tabs; 
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const contactColumns = [
  {
    title: 'No.',
    key: 'stt',
    render: (text, record, index) => index + 1, // Generate sequential number
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Preferred Contact Method',
    dataIndex: 'preferred_contact_method',
    key: 'preferred_contact_method',
  },
  {
    title: 'Special Requests',
    dataIndex: 'special_requests',
    key: 'special_requests',
  },
  {
    title: 'Submission Date',
    dataIndex: 'submission_date',
    key: 'submission_date',
  },
];

const columns = [
  {
    title: 'No',
    dataIndex: 'index',
    key: 'index',
    width: 70,
    render: (text, record, index) => index + 1, // Số thứ tự tăng dần
  },
  {
    title: 'Actions',
    key: 'action',
    width: 150,
    render: (text, record) => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}></Button>
        <Button type="link"  icon={<DeleteOutlined />}></Button>
      </Space>
    ),
  },
  { title: 'Vehicle ID', dataIndex: 'id', key: 'id', width: 120 },
  { title: 'Brand', dataIndex: 'brand_name', key: 'brand_name', width: 150 }, // Hiển thị tên thương hiệu
  { title: 'Model', dataIndex: 'car_model_name', key: 'car_model_name', width: 150 }, // Hiển thị tên mẫu xe
  { title: 'Series', dataIndex: 'series_name', key: 'series_name', width: 150 }, // Hiển thị tên series
  { title: 'Engine Power', dataIndex: 'engine_power', key: 'engine_power', width: 150 },
  { title: 'Fuel Type', dataIndex: 'fuel_type', key: 'fuel_type', width: 120 },
  { title: 'Transmission', dataIndex: 'transmission', key: 'transmission', width: 150 },
  { title: 'Seating Capacity', dataIndex: 'seating_capacity', key: 'seating_capacity', width: 150 },
  { title: 'Drivetrain', dataIndex: 'drivetrain', key: 'drivetrain', width: 150 },
  { title: 'Origin', dataIndex: 'origin', key: 'origin', width: 150 },
  { title: 'Mileage', dataIndex: 'mileage', key: 'mileage', width: 120 },
  { title: 'Year', dataIndex: 'year', key: 'year', width: 120 },
  { title: 'Price', dataIndex: 'price', key: 'price', width: 150 },
  { title: 'Fuel Tank Capacity', dataIndex: 'fuel_tank_capacity', key: 'fuel_tank_capacity', width: 150 },
  { title: 'Curb Weight', dataIndex: 'curb_weight', key: 'curb_weight', width: 120 },
  { title: 'Torque', dataIndex: 'torque', key: 'torque', width: 120 },
  { title: 'Top Speed', dataIndex: 'top_speed', key: 'top_speed', width: 120 },
  { title: 'Acceleration (0-100)', dataIndex: 'acceleration_0_100', key: 'acceleration_0_100', width: 150 },
  { title: 'Engine Type', dataIndex: 'engine_type', key: 'engine_type', width: 150 },
  { title: 'Horsepower', dataIndex: 'horsepower', key: 'horsepower', width: 120 },
  { title: 'Braking Distance', dataIndex: 'braking_distance', key: 'braking_distance', width: 150 },
  { title: 'Fuel Efficiency', dataIndex: 'fuel_efficiency', key: 'fuel_efficiency', width: 150 },
  { title: 'CO2 Emission', dataIndex: 'co2_emission', key: 'co2_emission', width: 150 },
  { title: 'Status', dataIndex: 'status', key: 'status', width: 120 },
  { title: 'Car Model Status', dataIndex: 'car_model_status', key: 'car_model_status', width: 150 }, // Trạng thái của mẫu xe
];
const inboxColumns = [
  {
    title: 'No.',
    key: 'stt',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'User ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Sent By',
    dataIndex: 'sent_by',
    key: 'sent_by',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
];



const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('vehicles'); // Track selected menu
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]); // Lưu trữ file ảnh
  const [mainImage, setMainImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [vehiclesData, setvehiclesData] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [adminMessage, setAdminMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedChats, setSelectedChats] = useState({}); // Quản lý các cuộc trò chuyện theo userId
  const [activeTab, setActiveTab] = useState(null); // Track the active tab\
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  const pollingInterval = useRef(null); 
  const [unreadCounts, setUnreadCounts] = useState({});
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
  useEffect(() => {
    if (selectedMenu === 'contact') {
      fetchContactData();
    }
  }, [selectedMenu]);
  useEffect(() => {
    if (selectedMenu === 'vehicles') {
      fetchvehiclesData();
    }
  }, [selectedMenu]);
  const fetchInboxMessages = async () => {
    try {
      const response = await axios.get('https://carriomotors.io.vn/api/chat/get_admin_messages.php');
      if (response.status === 200) {
        setInboxMessages(response.data); // Lưu danh sách tin nhắn
      } else {
        antdMessage.error('Không thể lấy danh sách người dùng.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
    }
  };
  const startPollingMessages = () => {
    if (pollingInterval.current) clearInterval(pollingInterval.current);
  
    pollingInterval.current = setInterval(() => {
      fetchInboxMessages();
      if (selectedUserId) {
        fetchMessagesForUser(selectedUserId);
      }
    }, 5000);
  };
  useEffect(() => {
    fetchInboxMessages();
    startPollingMessages(); 
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current); // Clear interval khi component bị unmount
    };
  }, []);


  useEffect(() => {
    console.log('Selected User ID updated:', selectedUserId);
  }, [selectedUserId]);
  const handleRowClick = (record) => {
    setSelectedUserId(record.user_id);
    console.log('User selected for chat:', record.user_id);
  };
  
  useEffect(() => {
    if (selectedMenu === 'inbox') {
      fetchInboxMessages();
      startPollingMessages();
    }
  
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [selectedMenu]);
  useEffect(() => {
    if (selectedUserId && selectedChats[selectedUserId]) {
      scrollToBottom();
    }
  }, [selectedChats, selectedUserId]);
  useEffect(() => {
    if (inboxMessages.length > 0 && !selectedUserId) {
      const firstUser = uniqueUsers()[0];
      if (firstUser) {
        setSelectedUserId(firstUser.user_id);
      }
    }
  }, [inboxMessages]);
  const uniqueUsers = () => {
    const userMap = new Map();
    inboxMessages.forEach((msg) => {
      if (!userMap.has(msg.user_id)) {
        userMap.set(msg.user_id, {
          ...msg,
          unread: true, // Mark as unread when the user has a new message
        });
      }
    });
    return Array.from(userMap.values());
  };
  
  const calculateUnreadCount = (userId, messages) => {
    if (!messages) return 0;
    return messages.filter(msg => 
      msg.sent_by === 'user' && !msg.read_status
    ).length;
  };
  const sendAdminMessage = async (userId) => {
    const messageToSend = selectedChats[userId]?.adminMessage || '';
    if (messageToSend.trim() === '') return;

    try {
      const response = await axios.post('https://carriomotors.io.vn/api/chat/save_admin_message.php', {
        user_id: userId,
        admin_id: 1,
        message: messageToSend,
        sent_by: 'admin',
      });

      if (response.status === 200) {
        message.success('Tin nhắn đã được gửi thành công!');
        setSelectedChats(prevChats => ({
          ...prevChats,
          [userId]: { ...prevChats[userId], adminMessage: '' },
        }));
      } else {
        message.error('Không thể gửi tin nhắn.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      message.error('Lỗi khi gửi tin nhắn.');
    }
  };
  
  const fetchMessagesForUser = async (userId) => {
    try {
      const response = await axios.get(`https://carriomotors.io.vn/api/chat/get_messages.php?user_id=${userId}`);
      if (response.status === 200) {
        const messages = response.data;
        
        // Cập nhật số lượng tin nhắn chưa đọc
        const unreadCount = messages.filter(msg => 
          msg.sent_by === 'user' && !msg.read_status
        ).length;
        
        setUnreadCounts(prev => ({
          ...prev,
          [userId]: unreadCount
        }));
  
        setSelectedChats(prev => ({
          ...prev,
          [userId]: messages
        }));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  

  const fetchContactData = async () => {
    try {
      const response = await axios.get('https://carriomotors.io.vn/api/get_contactus.php'); // Replace with your API URL
      if (response.status === 200) {
        setContactData(response.data); // Assuming the API returns a list of contacts
      } else {
        message.error('Failed to fetch contact submissions.');
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    }
  };

  const fetchvehiclesData = async () => {
    try {
      const response = await axios.get('https://carriomotors.io.vn/api/get_vehicle.php');
      if (response.status === 200) {
        setvehiclesData(response.data); // Assuming the API returns a list of contacts
      } else {
        message.error('Failed to fetch contact submissions.');
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    }
  };
  const uploadImageToImgbb = (file) => {
    const apiKey = '5baca5ecaa39640800e17862d37b4a71'; 
    
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob || file instanceof File)) {
        reject(new Error("File is not of type Blob or File"));
        return;
      }
  
      const formData = new FormData();
      formData.append('image', file);
      
      fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          resolve(data.data.url); 
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

      if (uploadedImages.includes(null)) {
        message.error('Some images failed to upload.');
      } else {
        const mainImg = uploadedImages[0];
        const additionalImgs = uploadedImages.slice(1);

        setMainImage(mainImg);
        setGallery(additionalImgs);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      message.error('Error uploading images: ' + error.message);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (!mainImage) {
        message.error('Please upload at least one main image.');
        return;
      }

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
        main_image: mainImage,
        gallery: gallery,
      };

      console.log('Payload before sending:', payload);

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
        setMainImage('');
        setGallery([]);
      }
    } catch (error) {
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey); 
  };
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    // Đánh dấu tất cả tin nhắn của user này là đã đọc
    setUnreadCounts(prev => ({
      ...prev,
      [userId]: 0
    }));
  };


   useEffect(() => {
    if (selectedUserId) {
      fetchMessagesForUser(selectedUserId); // Fetch tin nhắn cho user mới chọn
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedChats[selectedUserId]) {
      scrollToBottom();
    }
  }, [selectedChats, selectedUserId]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const response = await axios.post('https://carriomotors.io.vn/api/chat/save_admin_message.php', {
        user_id: selectedUserId,
        admin_id: 1,
        message: messageInput,
        sent_by: 'admin',
      });

      if (response.status === 200) {
        // Thêm tin nhắn mới vào danh sách tin nhắn của user
        setSelectedChats((prevChats) => ({
          ...prevChats,
          [selectedUserId]: [
            ...prevChats[selectedUserId],
            {
              id: Date.now(),
              user_id: selectedUserId,
              message: messageInput,
              sent_by: 'admin',
              created_at: new Date().toISOString(),
            },
          ],
        }));
        setMessageInput(''); // Xóa input sau khi gửi tin nhắn
      } else {
        antdMessage.error('Không thể gửi tin nhắn');
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      antdMessage.error('Lỗi khi gửi tin nhắn.');
    }
  };


  const handleMessageChange = (userId, e) => {
    const messageValue = e.target.value;
    setSelectedChats(prevChats => ({
      ...prevChats,
      [userId]: { ...prevChats[userId], adminMessage: messageValue },
    }));
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
        <Menu mode="inline" defaultSelectedKeys={['1']} onClick={(e) => handleMenuClick(e.key)}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="vehicles" icon={<CarOutlined />}>
            Vehicles
          </Menu.Item>
          <Menu.Item key="inbox" icon={<InboxOutlined />}>
            Inbox
          </Menu.Item>
          <Menu.Item key="contact" icon={<UserOutlined />}>
            Contact
          </Menu.Item>
          <Menu.Item key="products" icon={<ShoppingOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="signin" icon={<LoginOutlined />}>
            Sign In
          </Menu.Item>
          <Menu.Item key="signup" icon={<UserAddOutlined />}>
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
          {/* Conditionally render based on selected menu */}
          {selectedMenu === 'vehicles' && (
            <div>
              <Row style={{ height: '100%' }}>
                <Col span={24}>
                  <div style={{ textAlign: "right", marginBottom: "20px" }}>
                    <Button type="primary" onClick={showModal}>Add vehicle</Button>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={vehiclesData} 
                    pagination={false}
                    rowKey="id"
                    scroll={{ x: 1500 }}
                    className="custom-scrollbar"
                    locale={{ emptyText: 'No Data' }} // Show "No Data" when empty
                  />
                </Col>
              </Row>
            </div>
          )}
          {selectedMenu === 'contact' && (
            <div>
            <h2>Inbox</h2>
            <Table
  columns={contactColumns} 
  dataSource={contactData} 
  rowKey="id"
  pagination={false}
  onRow={(record) => ({
    onClick: () => handleRowClick(record),
  })}
/>
          </div>
          )}
          {selectedMenu === 'dashboard' && (
            <div>
              <h2>Dashboard</h2>
              <p>Your dashboard overview will appear here.</p>
            </div>
          )}
          {selectedMenu === 'inbox' && (
  <div>
  <h2>Admin Chat Inbox</h2>
  <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ width: '30%' }}>
  <h2 style={{fontSize:"22px"}}>Users</h2>
  <Row gutter={[16, 16]}>
    {uniqueUsers().map((msg, index) => (
      <Col span={12} key={msg.user_id}>
        <div
          style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleUserSelect(msg.user_id)} 
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <p>User ID: {msg.user_id}</p>
        </div>
      </Col>
    ))}
  </Row>
</div>

    <div style={{ width: '70%' }}>
    {selectedUserId ? (
                <div>
                  <h3 style={{marginBottom:"20px"}}>Chat with User: {selectedUserId}</h3>
                  <div style={{ height: '600px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
      {selectedChats[selectedUserId] ? (
        selectedChats[selectedUserId].length > 0 ? (
          selectedChats[selectedUserId].map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sent_by === 'admin' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  backgroundColor: msg.sent_by === 'admin' ? '#d4edda' : '#f8d7da',
                  padding: '8px',
                  borderRadius: '8px',
                  maxWidth: '60%',
                  marginBottom: '10px',
                }}
              >
                <p>{msg.message}</p>
                <small>{msg.sent_by === 'admin' ? 'Admin' : 'User'}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )
      ) : (
        <p>Loading messages...</p>
      )}
      <div ref={messagesEndRef} />
    </div>
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <Input.TextArea
        rows={2}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Enter your message..."
      />
      <Button type="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </div>
                </div>
              ) : (
                <p>Please select a user to start chatting.</p>
              )}
            </div>
          </div>
</div>
)}
          {selectedMenu === 'products' && (
            <div>
              <h2>Products</h2>
              <p>Your product management will appear here.</p>
            </div>
          )}
        </Content>
      </Layout>
      <Modal
        title="Add vehicles"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        width={1100}
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
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
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
