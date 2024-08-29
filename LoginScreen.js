import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TeacherListScreen from './TeacherListScreen'; // Đảm bảo đúng đường dẫn
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Gửi yêu cầu POST tới API PHP
        fetch('http://localhost/myBackend/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Nếu đăng nhập thành công, chuyển sang trang TeacherListScreen
                    navigation.navigate('TeacherListScreen');
                } else {
                    // Hiển thị thông báo lỗi nếu đăng nhập không thành công
                    Alert.alert('Error', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome back! Glad to see you, Again!</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter your email"
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Icon name="email-outline" size={24} color="gray" style={styles.icon} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Icon name="eye-off-outline" size={24} color="gray" style={styles.icon} />
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpText}>
                    Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or Login with</Text>

            <View style={styles.socialLoginContainer}>
                <FontAwesome name="facebook-square" size={40} color="#3b5998" />
                <Entypo name="google-" size={40} color="#db4437" />
                <Entypo name="twitter" size={40} color="#1DA1F2" />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    signInButton: {
        backgroundColor: '#00A2F1',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    signInText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signUpText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    signUpLink: {
        color: '#00A2F1',
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});