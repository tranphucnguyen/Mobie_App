import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Hàm kiểm tra định dạng email
const isValidEmail = (email) => {
    // Biểu thức chính quy kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default function EditUser({ route, navigation }) {
    const { userId } = route.params;  // Nhận userId từ route params
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(true);  // Thêm trạng thái loading

    // Fetch user data when component mounts
    useEffect(() => {
        fetch(`http://localhost/myBackend/getUserDetails.php?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);  // Kiểm tra cấu trúc dữ liệu
                if (data.status === 'success') {
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                    setLocation(data.user.location);
                } else {
                    console.error('Error fetching user data:', data.message);
                }
                setLoading(false);  // Đặt loading về false sau khi tải xong dữ liệu
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);  // Đặt loading về false nếu có lỗi xảy ra
            });
    }, [userId]);

    const handleEditUser = () => {
        // Kiểm tra định dạng email
        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Gửi dữ liệu chỉ khi các trường có giá trị mới
        const updateData = {
            userId,
            ...(username ? { username } : {}),
            ...(email ? { email } : {}),
            ...(location ? { location } : {})
        };

        fetch('http://localhost/myBackend/edituser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('User edited successfully:', data.message);
                    navigation.navigate('SuccessScreen');  // Điều hướng đến SuccessScreen
                } else {
                    console.error('Error editing user:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00A2F1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.header}>Edit Teacher</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                />

                <Text style={styles.label}>User Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>User Location</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
                />

                <TouchableOpacity style={styles.editButton} onPress={handleEditUser}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 20,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#00A2F1',
        paddingVertical: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '50%',
        margin: 'auto',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
