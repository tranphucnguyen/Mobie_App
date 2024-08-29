import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Hàm kiểm tra định dạng email
const isValidEmail = (email) => {
    // Biểu thức chính quy kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default function AddUser({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    const handleAddUser = () => {
        // Kiểm tra định dạng email
        if (!isValidEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        fetch('http://localhost/myBackend/adduser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, location }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('User added successfully:', data.message);
                    navigation.navigate('SuccessScreen');  // Điều hướng đến SuccessScreen
                } else {
                    console.error('Error adding user:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.header}>Add Teacher</Text>

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

                <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                    <Text style={styles.addButtonText}>Add</Text>
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
        zIndex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        bottom: 51,
        left: 35,
    },
    form: {
        flex: 1,
        justifyContent: 'center', // Căn giữa các phần tử trong form
        bottom: 140,
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
    addButton: {
        backgroundColor: '#00A2F1',
        paddingVertical: 15,
        borderRadius: 5,
        alignSelf: 'center', // Căn giữa nút Add
        width: '50%', // Đặt chiều rộng của nút Add là 50% của màn hình
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center', // Căn giữa văn bản trong nút
    },
});
