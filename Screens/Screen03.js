import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../AuthContext';

const Screen03 = ({ navigation }) => {
  const { users, updateUser } = useContext(AuthContext);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Nhập SĐT, 2: Nhập mã và mật khẩu mới
  const [isLoading, setIsLoading] = useState(false);

  // Mô phỏng gửi mã xác minh (trong thực tế cần kết nối API)
  const handleSendCode = () => {
    if (!phone) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }

    // Kiểm tra số điện thoại có tồn tại không
    const userExists = users.some(user => user.phone === phone);
    if (!userExists) {
      Alert.alert('Lỗi', 'Số điện thoại chưa được đăng ký');
      return;
    }

    setIsLoading(true);
    // Giả lập gửi mã (trong thực tế gọi API ở đây)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Thành công', 'Mã xác minh đã được gửi (Mã demo: 123456)');
      setStep(2);
    }, 1500);
  };

  const handleResetPassword = async () => {
    if (!verificationCode || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    // Kiểm tra mã xác minh (trong demo luôn đúng)
    if (verificationCode !== '123456') {
      Alert.alert('Lỗi', 'Mã xác minh không đúng');
      return;
    }

    try {
      setIsLoading(true);
      // Cập nhật mật khẩu mới
      await updateUser(
        { phone },
        { password: newPassword }
      );
      
      Alert.alert('Thành công', 'Đặt lại mật khẩu thành công!', [
        { text: 'OK', onPress: () => navigation.navigate('Screen01') }
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header với nút quay lại */}
      <TouchableOpacity 
        onPress={() => step === 1 ? navigation.goBack() : setStep(1)}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Quên mật khẩu</Text>

      {step === 1 ? (
        // Bước 1: Nhập số điện thoại
        <>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại đã đăng ký"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoFocus
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSendCode}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Đang gửi...' : 'Gửi mã xác minh'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        // Bước 2: Nhập mã và mật khẩu mới
        <>
          <TextInput
            style={styles.input}
            placeholder="Mã xác minh (Nhập 123456)"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  button: {
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

export default Screen03;