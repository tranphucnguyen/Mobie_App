import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function TeacherListScreen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const navigation = useNavigation();

    // Định nghĩa hàm fetchData
    const fetchData = useCallback(() => {
        setLoading(true);
        fetch('http://localhost/myBackend/getUsers.php')
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData(); // Gọi hàm fetchData trong useEffect
    }, [fetchData]);

    useFocusEffect(
        useCallback(() => {
            fetchData(); // Gọi hàm fetchData mỗi khi màn hình được focus
        }, [fetchData])
    );
    const handleDelete = (id) => {
        setSelectedUserId(id);
        setModalVisible(true);
    };

    const confirmDelete = () => {
        fetch('http://localhost/myBackend/deleteUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: selectedUserId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setData(prevData => prevData.filter(item => item.id !== selectedUserId));
                    setModalVisible(false);
                    navigation.navigate('DeletedScreen'); // Chuyển đến trang DeletedScreen
                } else {
                    console.error('Error deleting user:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const renderItem = ({ item }) => (
        <Pressable
            style={styles.item}
            onPress={() => navigation.navigate('TeacherDetailsScreen', { teacherId: item.id })} // Điều hướng tới trang TeacherDetailsScreen
        >
            <Icon name="account-circle" size={50} color="#00A2F1" />
            <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <Pressable
                style={styles.iconButton}
                onPress={() => navigation.navigate('EditUser', { userId: item.id })} // Điều hướng đến trang EditUser
            >
                <Icon name="pencil" size={24} color="#00A2F1" />
            </Pressable>
            <Pressable
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}  // Hiển thị modal khi nhấn nút delete
                accessibilityLabel="Delete"
            >
                <Icon name="trash-can" size={24} color="#fff" />
            </Pressable>
        </Pressable>
    );


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00A2F1" />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error loading data</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hi Admin!</Text>
            <Text style={styles.subHeader}>Welcome back to your panel.</Text>
            <Text style={styles.title}>Teacher List</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <Pressable
                style={styles.fab}
                onPress={() => navigation.navigate('AddUser')} // Điều hướng đến trang AddUser
            >
                <Icon name="plus" size={30} color="#fff" />
            </Pressable>

            {/* Modal xác nhận xóa */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you sure you want to delete this user?</Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.modalButton, styles.buttonCancel]}
                                onPress={() => setModalVisible(false)}  // Đóng modal khi nhấn Back
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton, styles.buttonConfirm]}
                                onPress={confirmDelete}  // Xác nhận xóa
                            >
                                <Text style={styles.buttonText}>Yes</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    itemContent: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A2F1',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    iconButton: {
        marginLeft: 15,
    },
    deleteButton: {
        marginLeft: 15,
        backgroundColor: '#d9534f',  // Đặt màu nền cho nút delete
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00A2F1',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        margin: 5,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonConfirm: {
        backgroundColor: '#00A2F1',

    },
    buttonCancel: {
        backgroundColor: '#d9534f',

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
