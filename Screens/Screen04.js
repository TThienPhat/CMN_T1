import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../AuthContext.js';

const Screen04 = ({ navigation }) => {
  const { currentUser, logout, updateUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [avatar, setAvatar] = useState(null);

  
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || null);
    }
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    try {
      await updateUser({ name });
      Alert.alert('Thành công', 'Đã cập nhật thông tin');
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    }
  };

  const handleChangeAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        await updateUser({ avatar: uri });
        setAvatar(uri);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thay đổi ảnh');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Screen01');
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng xuất thất bại');
    }
  };

  if (!currentUser) return null;

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tên hoặc số điện thoại"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Ảnh đại diện */}
      <TouchableOpacity onPress={handleChangeAvatar} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.placeholderText}>+</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Thông tin người dùng */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tên người dùng</Text>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity onPress={handleUpdateProfile} style={styles.saveButton}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Số điện thoại</Text>
        <Text style={styles.phoneText}>{currentUser.phone}</Text>
      </View>

      {/* Nút đăng xuất */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
    color: '#999',
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
  },
  phoneText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Screen04;