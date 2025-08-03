import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MessageItem } from '../../types/types';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { MainStackParamList } from '../../navigation/MainStack';


const messagesData: MessageItem[] = [
  {
    id: '1',
    name: 'Darlene Steward',
    message: 'Pls take a look at the images.',
    time: '18.31',
    unreadCount: 5,
    highlight: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '2',
    name: 'Lee Williamson',
    message: "Yes, that's gonna work, hopefully.",
    time: '06.12',
    unreadCount: 2,
    online: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '3',
    name: 'Lee Williamson',
    message: "Yes, that's gonna work, hopefully.",
    time: '06.12',
    online: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '4',
    name: 'Lee Williamson',
    message: "Yes, that's gonna work, hopefully.",
    time: '06.12',
    online: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '5',
    name: 'Ronald Mccoy',
    message: 'Thanks dude 😌',
    time: 'Yesterday',
    online: true,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: '6',
    name: 'Albert Bell',
    message: "I'm happy this anime has such grea...",
    time: 'Yesterday',
    image: 'https://i.pravatar.cc/150?img=12',
  },
];

const MessagesScreen = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handlePress = (item: MessageItem) => {
    setSelectedId(item.id);
    navigation.navigate('Chat', { item });
  };

  const renderItem = ({ item }: { item: MessageItem }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
        <View style={[styles.messageContainer, (item.highlight || isSelected) && styles.highlighted]}>
          <View style={styles.left}>
            <View>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              {item.online && <View style={styles.onlineDot} />}
            </View>
          </View>
          <View style={styles.middle}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.time}>{item.time}</Text>
            {item.unreadCount ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unreadCount}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Messages</Text>
        <FlatList
          data={messagesData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: wp('4%'),
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  messageContainer: {
    flexDirection: 'row',
    padding: wp(3.5),
    alignItems: 'center',
  },
  highlighted: {
    backgroundColor: '#F3E5F5',
    borderRadius: wp(2),
    marginBottom: hp(0.8),
  },
  left: {
    marginRight: wp(3),
  },
  middle: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  name: {
    fontWeight: '500',
    fontSize: 13,
  },
  messageText: {
    color: '#757575',
    marginTop: wp(3),
    fontSize: 12,
    fontWeight: '400',
  },
  time: {
    color: '#B0BEC5',
    fontSize: 12,
    marginBottom: 6,
  },
  unreadBadge: {
    backgroundColor: '#8E24AA',
    width: 24,
    height: 24,
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(0.5)
  },
  unreadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'limegreen',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default MessagesScreen;
