import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from 'react-native';
import Swiper from 'react-native-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Onboarding1, Onboarding2, Onboarding3, Forward } from '../../assets/icons';
import { color } from '../../theme/colors';
import * as space from '../../utils/spacer'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SlideProps {
    title: string;
    description: string;
    icon: any;
}

const slides: SlideProps[] = [
    {
        title: 'Lend. Borrow. Save Smarter.',
        description: 'Make fashion and lifestyle affordable for everyone. List or rent high-quality items without breaking the bank',
        icon: Onboarding1,
    },
    {
        title: 'Verified Quality & Secure Transactions',
        description: 'We ensure every item is inspected and approved. Safe payments with JazzCash, EasyPaisa, Visa & more.',
        icon: Onboarding2,
    },
    {
        title: 'Community-Powered Sharing Culture',
        description: 'Support a circular economy. Reduce waste, help others, and earn money from unused items.',
        icon: Onboarding3,
    },
    // Add more slides here
];

const OnboardingScreen = ({ navigation }: any) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const swiperRef = React.useRef<any>(null);

    const handleNext = React.useCallback(async () => {
        if (swiperRef.current) {
            if (currentIndex < slides.length - 1) {
                swiperRef.current.scrollBy(1, true); // 'true' ensures animation
            } else {
                await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                navigation.replace('Login');
            }
        }
    }, [currentIndex, navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container} >
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />

                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={async () => {
                        await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                        navigation.replace('Login');
                    }}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                <Swiper
                    ref={swiperRef}
                    loop={false}
                    showsPagination={false}
                    index={currentIndex}
                    onIndexChanged={setCurrentIndex}
                    removeClippedSubviews={false}
                >
                    {slides.map((slide, index) => (
                        <View style={styles.slide} key={index}>
                            <View style={styles.iconWrapper}>
                                <slide.icon />
                            </View>
                            <View style={styles.bottomCard}>
                                <View style={styles.pagination}>
                                    {slides.map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.customDot,
                                                currentIndex === i && styles.customActiveDot,
                                            ]}
                                        />
                                    ))}
                                </View>
                                <space.s2 />
                                <Text style={styles.title}>{slide.title}</Text>
                                <Text style={styles.description}>{slide.description}</Text>
                                <TouchableOpacity
                                    style={[
                                        styles.nextButton,
                                        currentIndex === slides.length - 1 && styles.lastNextButton,
                                    ]}
                                    onPress={handleNext}
                                >
                                    <View style={styles.buttonWrapper}>
                                        {currentIndex === slides.length - 1 ? (
                                            <>
                                                <View style={styles.leftIconWrapper}>
                                                    <Forward />
                                                </View>
                                                <Text style={styles.centeredNextText}>Get Started</Text>
                                                <View style={{ width: wp(10) }} />
                                            </>
                                        ) : (
                                            <>
                                                <Text style={styles.nextText}>Next</Text>
                                                <View style={styles.forwardButton}>
                                                    <Forward />
                                                </View>
                                            </>
                                        )}
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))}
                </Swiper>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: wp(4),
        backgroundColor: color.White,
    },
    skipButton: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('5%'),
        zIndex: 1,
    },
    skipText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
    },
    bottomCard: {
        backgroundColor: color.Default3,
        width: wp('90%'),
        height: hp(35),
        borderRadius: 20,
        padding: wp('5%'),
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    description: {
        fontSize: 13,
        textAlign: 'center',
        color: '#666',
        fontWeight: '500',
        marginBottom: hp('5%'),
    },
    iconWrapper: {
        marginTop: hp('22%'),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: color.Default2,
        width: wp('78%'),
        padding: hp(0.6),
        borderRadius: wp('10%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp(2)
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between'
    },
    nextText: {
        color: color.Black,
        fontSize: 17,
        fontWeight: '500',
        marginLeft: wp('4%'),
    },
    forwardButton: {
        backgroundColor: color.Default,
        padding: wp(4),
        borderRadius: wp(10),
    },
    lastNextButton: {
        justifyContent: 'space-between',
    },
    leftIconWrapper: {
        backgroundColor: color.Default,
        padding: wp(3.2),
        borderRadius: wp(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredNextText: {
        color: color.Black,
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        flex: 1,
    },
    arrow: {
        color: '#fff',
        fontSize: wp('5%'),
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1.5),
    },
    customDot: {
        width: wp(1.5),
        height: wp(1.5),
        borderRadius: wp(1.25),
        backgroundColor: '#C4C4C4',
        marginHorizontal: wp(1),
    },
    customActiveDot: {
        width: wp(8),
        height: wp(1),
        borderRadius: wp(1.25),
        backgroundColor: '#A020F0',
    },
});

export default OnboardingScreen;
