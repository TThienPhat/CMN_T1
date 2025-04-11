import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load dữ liệu khi khởi động app
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [savedUsers, savedUser] = await Promise.all([
          AsyncStorage.getItem('@users'),
          AsyncStorage.getItem('@currentUser')
        ]);
        
        if (savedUsers) setUsers(JSON.parse(savedUsers));
        if (savedUser) setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Load data error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Đăng ký tài khoản mới
  const register = async (userData) => {
    try {
      if (users.some(user => user.phone === userData.phone)) {
        throw new Error('Số điện thoại đã được đăng ký');
      }

      const newUser = { 
        ...userData, 
        avatar: null,
        createdAt: new Date().toISOString() 
      };
      const newUsers = [...users, newUser];
      
      await AsyncStorage.setItem('@users', JSON.stringify(newUsers));
      setUsers(newUsers);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // Đăng nhập
  const login = async (phone, password) => {
    try {
      const user = users.find(u => u.phone === phone && u.password === password);
      if (!user) throw new Error('Thông tin đăng nhập không chính xác');
      
      await AsyncStorage.setItem('@currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@currentUser');
      setCurrentUser(null);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Cập nhật thông tin user
  const updateUser = async (updatedData) => {
    try {
      if (!currentUser) throw new Error('Không tìm thấy người dùng');
      
      const updatedUser = { ...currentUser, ...updatedData };
      const updatedUsers = users.map(user => 
        user.phone === currentUser.phone ? updatedUser : user
      );
      
      await Promise.all([
        AsyncStorage.setItem('@users', JSON.stringify(updatedUsers)),
        AsyncStorage.setItem('@currentUser', JSON.stringify(updatedUser))
      ]);
      
      setUsers(updatedUsers);
      setCurrentUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  // Upload ảnh đại diện
  const uploadAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const avatarUri = result.assets[0].uri;
        await updateUser({ avatar: avatarUri });
        return avatarUri;
      }
      return null;
    } catch (error) {
      console.error('Upload avatar error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isLoading,
        register,
        login,
        logout,
        updateUser,
        uploadAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};