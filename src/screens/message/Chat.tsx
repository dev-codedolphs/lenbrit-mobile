import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';


type Props = NativeStackScreenProps<MainStackParamList, 'Chat'>;

const Chat: React.FC<Props> = ({ route }) => {
    const { item } = route.params;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.White }}>
            <View style={styles.container}>
                <Header title={item.name} goBack={() => navigation.goBack()} />
                <Text style={styles.message}>{item.message}</Text>
                <Text style={[styles.message, { textAlign: 'right', marginTop: 16}]}>{item.message}</Text>

                <View style={styles.keyboardWrapper}>
                    {/* Emoji Icon */}
                    <TouchableOpacity>
                        <Icon name="smile" size={22} color="#999" />
                    </TouchableOpacity>

                    {/* Text Input */}
                    <TextInput
                        placeholder="Write a message..."
                        placeholderTextColor="#999"
                        style={styles.input}
                    />

                    {/* Attachment Icon */}
                    <TouchableOpacity>
                        <Icon name="paperclip" size={22} color="#999" />
                    </TouchableOpacity>

                    {/* Mic Button */}
                    <TouchableOpacity style={styles.micButton}>
                        <MaterialCommunityIcons name="microphone" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
        paddingTop: wp(4),
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    message: {
        marginTop: 10,
        fontSize: 16
    },
    keyboardWrapper: {
        position:'absolute',
        bottom: 0,
        left:0,
        right:0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.2%'),
        backgroundColor: '#E6E6E6',
        borderTopWidth: 1,
        borderColor: '#eee',
      },
      input: {
        flex: 1,
        marginHorizontal: wp('2.5%'),
        paddingVertical: hp('1.2sdfnsflk%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        fontSize: 14,
      },
      micButton: {
        backgroundColor: '#A200E6',
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('2%'),
      },
});

export default Chat;
