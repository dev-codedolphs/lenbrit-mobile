import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { color } from '../../theme/colors';

const OptionCard = ({
    CardIcon,
    label,
}: {
    CardIcon: any;
    label: string;
}) => {
    return (
        <TouchableOpacity style={styles.optionCard}>
            <View style={styles.iconBox}>
                {CardIcon}
            </View>
            <Text style={styles.optionLabel}>{label}</Text>
            <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
    );
};


export default OptionCard

const styles = StyleSheet.create({
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('2%'),
        backgroundColor: color.White,
        borderRadius: 10,
        marginBottom: hp('2%'),
    },
    iconBox: {
        padding: wp(3),
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('4%'),
        backgroundColor: '#F2F2F2',
    },
    optionLabel: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
});