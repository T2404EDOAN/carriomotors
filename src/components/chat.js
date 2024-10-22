import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText, IconButton, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AdminIcon from '@mui/icons-material/SupervisorAccount';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SendIcon from '@mui/icons-material/Send';
const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng form chat
  const messagesEndRef = useRef(null);  // Tạo ref để cuộn đến cuối danh sách tin nhắn
  const [userId] = useState(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = generateUserId();
      localStorage.setItem('userId', storedUserId);
    }
    return storedUserId;
  });

  const fetchMessages = async () => {
    try {
      const response = await fetch(`https://carriomotors.io.vn/api/chat/get_messages.php?user_id=${userId}`);
      const data = await response.json();
      
      // Kiểm tra nếu data là một mảng, nếu không, gán nó là một mảng rỗng
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error('API did not return an array:', data);
        setMessages([]);  // Gán mảng rỗng nếu dữ liệu không đúng định dạng
      }
    } catch (error) {
      console.error('Lỗi khi lấy tin nhắn:', error);
      setMessages([]);  // Gán mảng rỗng nếu có lỗi
    }
  };
  

  const sendMessage = async () => {
    if (message.trim() === '') return;
  
    try {
      const response = await fetch('https://carriomotors.io.vn/api/chat/save_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message, sent_by: 'user' }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
    
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), user_id: userId, message, sent_by: 'user', created_at: new Date().toISOString() },
        ]);
        setMessage('');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error during message sending:', error);
    }
  };

  // Hàm cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cuộn xuống cuối khi tin nhắn mới được thêm
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cuộn xuống cuối khi form chat được mở
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Nút mở form chat ở góc phải */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 65,
            right: 16,
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': { backgroundColor: '#1565c0' },
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Form chat hiện khi nhấn vào nút */}
      {isOpen && (
        <Paper
          elevation={5}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
            width: 350,
            maxHeight: 500,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 1000,
          }}
        >
          {/* Header của chat với tên và icon admin, nút thu nhỏ */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 2,
              backgroundColor: '#1976d2',
              color: '#fff',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: 2 }}>
                <AdminIcon />
              </Avatar>
              <Typography variant="h7">Mai Ngoc Support</Typography>
            </Box>

            {/* Nút thu nhỏ form chat, sẽ đóng form khi bấm */}
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)} 
              sx={{ color: '#fff' }}
            >
              <MinimizeIcon />
            </IconButton>
          </Box>

          {/* Phần nội dung tin nhắn */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
          <List>
  {messages.length > 0 ? (
    messages.map((msg) => (
      <ListItem
        key={msg.id}
        sx={{
          display: 'flex',
          justifyContent: msg.sent_by === 'user' ? 'flex-end' : 'flex-start',
        }}
      >
        <ListItemText
          primary={msg.message}
          secondary={msg.sent_by === 'user' ? 'You' : 'Admin'}
          sx={{
            backgroundColor: msg.sent_by === 'user' ? '#d4edda' : '#f8d7da',
            padding: 1,
            borderRadius: 2,
            maxWidth: '70%',
          }}
        />
      </ListItem>
    ))
  ) : (
    <Typography variant="body2">How can we help you?</Typography>
  )}
  {/* Phần tử ẩn để cuộn đến */}
  <div ref={messagesEndRef} />
</List>

          </Box>

          {/* Phần nhập tin nhắn */}
          <Box sx={{ display: 'flex', gap: 1, padding: 2, backgroundColor: '#f5f5f5' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
  variant="contained"
  color="primary"
  onClick={sendMessage}
  endIcon={<SendIcon />}  // Add the Send icon to the right of the text
>
  Send
</Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Chat;
