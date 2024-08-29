import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DeletedScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Text style={styles.xText}>X</Text>
            </View>

            <Text style={styles.deletedText}>Deleted completed</Text>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
        backgroundColor: '#ff0000', // Red background for the circle
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    xText: {
        fontSize: 100,
        color: '#fff', // White color for the "X"
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deletedText: {
        color: '#ff0000', // Red color for the "Deleted completed" text
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    backButton: {
        marginTop: 30,
        backgroundColor: '#ff0000', // Red color for the button
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