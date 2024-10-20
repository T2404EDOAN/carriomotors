import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleAnalytics = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async () => {
    try {
      // Tải GAPI client
      await new Promise((resolve) => gapi.load('client:auth2', resolve));

      // Khởi tạo GAPI client với API key, client ID và scope
      await gapi.client.init({
        apiKey: 'AIzaSyDoyQRzvlJeHr9HxR04Sc4mK6dxloW8los',
        clientId: '768610557157-ifr0lpfg0krjug7theln01tckhn408u7.apps.googleusercontent.com',
        discoveryDocs: ['https://analytics.googleapis.com/$discovery/rest?version=v3'],
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
      });

      const authInstance = gapi.auth2.getAuthInstance();

      // Kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa, yêu cầu đăng nhập
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();  // Yêu cầu đăng nhập từ sự kiện người dùng
      }

      setIsSignedIn(authInstance.isSignedIn.get());

      // Nếu người dùng đã đăng nhập, gọi API
      if (authInstance.isSignedIn.get()) {
        fetchRealTimeUsers();
      }
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  };

  // Hàm gọi API để lấy số lượng người dùng đang hoạt động
  const fetchRealTimeUsers = async () => {
    try {
      const response = await gapi.client.analytics.data.realtime.get({
        'ids': 'ga:462685637', // Sử dụng đúng View ID
        'metrics': 'rt:activeUsers',
      });

      const activeUsersCount = response.result.totalsForAllResults['rt:activeUsers'];
      setActiveUsers(activeUsersCount);
    } catch (error) {
      console.error('Error fetching real-time users:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isSignedIn) {
      // Nếu đã đăng nhập, cập nhật số người dùng mỗi 30 giây
      interval = setInterval(fetchRealTimeUsers, 30000);
    }

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, [isSignedIn]); // Chỉ chạy khi người dùng đã đăng nhập

  return (
    <div>
      <h1>Active Users: {activeUsers}</h1>
      {!isSignedIn && (
        <button onClick={handleSignIn}>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAnalytics;
