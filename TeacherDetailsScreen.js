import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TeacherDetailsScreen({ route, navigation }) {
    const { teacherId } = route.params; // Nhận teacherId từ navigation
    const [teacherDetails, setTeacherDetails] = useState(null);

    useEffect(() => {
        // Gọi API hoặc lấy thông tin giáo viên từ database dựa trên teacherId
        fetch(`http://localhost/myBackend/getUserDetails.php?id=${teacherId}`)
            .then(response => response.json())
            .then(data => setTeacherDetails(data))
            .catch(error => console.error('Error fetching teacher details:', error));
    }, [teacherId]);

    if (!teacherDetails) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>

            <Text style={styles.header}>Teacher Details</Text>

            <Icon name="account-circle" size={100} color="#00A2F1" style={styles.icon} />

            <Text style={styles.teacherName}>{teacherDetails.name}</Text>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Họ tên:</Text>
                    <Text style={styles.detailValue}>{teacherDetails.name}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{teacherDetails.email}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Địa chỉ:</Text>
                    <Text style={styles.detailValue}>{teacherDetails.location}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditUser', { userId: teacherId })} // Truyền teacherId làm userId
            >
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

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
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
    },
    icon: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    teacherName: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00A2F1',
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    detailLabel: {
        fontSize: 16,
        color: '#333',
    },
    detailValue: {
        fontSize: 16,
        color: '#333',
    },
    editButton: {
        backgroundColor: '#00A2F1',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
