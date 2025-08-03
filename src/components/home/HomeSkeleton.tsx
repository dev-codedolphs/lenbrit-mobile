import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeSkeleton = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <ContentLoader
                width={wp('100%')}
                height={hp('10%')}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <Circle cx="25" cy="25" r="25" />
                <Rect x="60" y="10" rx="4" ry="4" width="120" height="12" />
                <Rect x="60" y="30" rx="4" ry="4" width="100" height="16" />
                <Rect x={wp('100%') - wp('22%')} y="10" rx="8" ry="8" width={wp('10%')} height={wp('10%')} />
            </ContentLoader>

            {/* Banner */}
            <ContentLoader
                width={wp('90%')}
                height={hp('20%')}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ marginTop: hp('2%') }}
            >
                <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
            </ContentLoader>

            {/* Categories */}
            <ContentLoader
                width={wp('100%')}
                height={hp('6%')}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ marginTop: hp('3%') }}
            >
                <Rect x="0" y="10" rx="8" ry="8" width="70" height="70" />
                <Rect x="80" y="10" rx="8" ry="8" width="70" height="70" />
                <Rect x="160" y="10" rx="8" ry="8" width="70" height="70" />
                <Rect x="240" y="10" rx="8" ry="8" width="70" height="70" />
            </ContentLoader>

            {/* Product Cards */}
            {[1, 2].map((_, index) => (
                <ContentLoader
                    key={index}
                    width={wp('90%')}
                    height={hp('16%')}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ marginTop: hp('2%') }}
                >
                    <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
                </ContentLoader>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(4),
        paddingHorizontal: wp('4%'),
        backgroundColor: '#fff',
    },
});

export default HomeSkeleton;
