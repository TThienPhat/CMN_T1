import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../AuthContext.js';

const Screen02 = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!form.name.trim()) return 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) return 'Vui lòng nhập số điện thoại';
    if (form.phone.length < 10) return 'Số điện thoại không hợp lệ';
    if (form.password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    if (form.password !== form.confirmPassword) return 'Mật khẩu không khớp';
    return null;
  };

  const handleRegister = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert('Lỗi', errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: form.name.trim(),
        phone: form.phone.trim(),
        password: form.password,
        avatar: null
      });
      
      Alert.alert('Thành công', 'Đăng ký thành công!', [
        { text: 'OK', onPress: () => navigation.replace('Screen01') }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Đăng ký tài khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={form.name}
        onChangeText={(text) => setForm({...form, name: text})}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={form.phone}
        onChangeText={(text) => setForm({...form, phone: text})}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu (ít nhất 6 ký tự)"
        value={form.password}
        onChangeText={(text) => setForm({...form, password: text})}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        value={form.confirmPassword}
        onChangeText={(text) => setForm({...form, confirmPassword: text})}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.registerButton, isLoading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#99c2ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Screen02;