import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainStack';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as space from '../../utils/spacer';

type Props = NativeStackScreenProps<MainStackParamList, 'AddItem'>;

const AddItemScreen: React.FC<Props> = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [availabilityFrom, setAvailabilityFrom] = useState('');
  const [availabilityTo, setAvailabilityTo] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<Asset | null>(null);


  const isFormValid = itemName && size && category && price && availabilityFrom && availabilityTo && description;

  const renderField = (
    label: string,
    placeholder: string,
    value: string,
    setValue: (text: string) => void
  ) => (
    <View style={{ marginBottom: hp('2%') }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );

  const handleUpload = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 1,
      quality: 0.8,
    });

    if (result.didCancel) {
      console.log('User cancelled upload');
    } else if (result.errorCode) {
      console.error('ImagePicker error:', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      setMedia(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    const newItem = {
      itemName,
      size,
      category,
      price,
      availability: {
        from: availabilityFrom,
        to: availabilityTo,
      },
      description,
    };
    navigation.navigate('UploadItemSuccess')
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title="Add New Item" goBack={() => navigation.goBack()} />

      {/* Upload Box */}
      <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
        {media ? (
          <Image source={{ uri: media.uri }} style={styles.previewImage} />
        ) : (
          <>
            <Icon name="upload" size={24} color={color.Default} />
            <Text style={styles.uploadText}>Upload Item Image/Video</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Input Fields */}
      {renderField('Item Name', 'Enter Name', itemName, setItemName)}
      {renderField('Size', 'Enter Size', size, setSize)}
      {renderField('Category', 'Enter category', category, setCategory)}
      {renderField('Price', 'Enter Price', price, setPrice)}

      {/* Availability */}
      <Text style={styles.label}>Availability</Text>
      <View style={styles.availabilityRow}>
        <TextInput
          placeholder="From"
          value={availabilityFrom}
          onChangeText={setAvailabilityFrom}
          style={styles.halfInput}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="To"
          value={availabilityTo}
          onChangeText={setAvailabilityTo}
          style={styles.halfInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Write"
        style={styles.textarea}
        placeholderTextColor="#999"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <space.s3 />

      {/* Submit Button */}
      <Button
        title="Upload Item"
        backgroundColor={color.Default}
        onPress={handleSubmit}
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
    paddingBottom: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  headerTitle: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: color.Black,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 10,
    height: hp('22%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  uploadText: {
    color: color.Default,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'DM Sans',
    marginTop: hp('1%'),
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'DM Sans',
    marginBottom: hp('0.8%'),
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('3%'),
    fontFamily: 'DM Sans',
    fontWeight: '400',
    fontSize: 10,
    color: '#8E8E8EEE',
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  halfInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    fontSize: hp('1.7%'),
    width: '48%',
  },
  textarea: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    minHeight: hp('12%'),
    textAlignVertical: 'top',
    fontSize: hp('1.7%'),
  },
  submitButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
    marginTop: hp('2.5%'),
  },
  submitButtonText: {
    color: '#999',
    fontSize: hp('2%'),
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
