import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import { ArrowBack, ArrowForward } from '../../assets/icons';


function ImageSlider({ images = [] }: { images: { url: string }[] }) {
    const [idx, setIdx] = React.useState(0);
    const hasMany = images.length > 1;

    const go = (next: number) => {
        const clamped = Math.max(0, Math.min(next, images.length - 1));
        setIdx(clamped);
    };

    const showLeft = hasMany && idx > 0;
    const showRight = hasMany && idx < images.length - 1;

    const src = images[idx]?.url ? { uri: images[idx].url } : require('../../assets/images/default.jpg');

    return (
        <View style={{ position: 'relative' }}>
            <Image source={src} style={styles.image} />
            {showLeft && (
                <TouchableOpacity onPress={() => go(idx - 1)} style={styles.leftArrow}>
                    <ArrowBack width={20} height={38} />
                </TouchableOpacity>
            )}
            {showRight && (
                <TouchableOpacity onPress={() => go(idx + 1)} style={styles.rightArrow}>
                    <ArrowForward width={20} height={38} />
                </TouchableOpacity>
            )}
        </View>
    );
}

export default ImageSlider


const styles = StyleSheet.create({
    // The image inside the slider
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        backgroundColor: '#EEE',
    },
    leftArrow: {
        position: 'absolute',
        left: 8,
        top: '45%',
        transform: [{ translateY: -19 }],
        padding: 8,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },

    rightArrow: {
        position: 'absolute',
        right: 8,
        top: '45%',
        transform: [{ translateY: -19 }],
        padding: 8,
        borderRadius: 24,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
});