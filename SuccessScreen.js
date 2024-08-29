import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SuccessScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Text style={styles.checkmark}>✔</Text>
            </View>

            <Text style={styles.successText}>Add/Edit completed</Text>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TeacherListScreen')}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#006400', // Dark green background for the circle
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkmark: {
        fontSize: 100,
        color: '#fff', // White color for the checkmark
        fontWeight: 'bold',
        textAlign: 'center',
    },
    successText: {
        color: '#006400', // Dark green color for the "add.edit completed" text
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    backButton: {
        marginTop: 30,
        backgroundColor: '#006400', // Dark green color for the button
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});