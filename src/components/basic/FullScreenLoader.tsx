// components/FullScreenLoader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { color } from '../../theme/colors';

const FullScreenLoader = () => {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={color.Default} />
        </View>
    );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});
