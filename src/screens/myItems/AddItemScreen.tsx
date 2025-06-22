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
import DatePicker from 'react-native-date-picker'
import userApi from '../redux/Api'
import { color } from '../../theme/colors';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as space from '../../utils/spacer';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../redux/Slice';

type Props = NativeStackScreenProps<MainStackParamList, 'AddItem'>;

const AddItemScreen: React.FC<Props> = ({ navigation }) => {
  const { success } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState('My dress');
  const [size, setSize] = useState('medium');
  const [category, setCategory] = useState('ok');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('description');
  const [mediaList, setMediaList] = useState<Asset[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStarDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [images, setImages] = useState([]);


  const isFormValid = itemName && size && category && price && startDate && endDate && description;

  const renderField = (
    label: string,
    placeholder: string,
    value: any,
    setValue: (text: any) => void,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={{ marginBottom: hp('2%') }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999"
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      />
    </View>
  );

  const handleUpload = async () => {
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 5,
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedAssets = result.assets.slice(0, 5);
      setMediaList(selectedAssets);
      const res: any = await uploadAllImages(selectedAssets);
      setImages(res)
    }
  };

  const uploadAllImages = async (images: Asset[]) => {
    const uploadedUrls: string[] = [];

    for (const image of images) {
      const uploadedUrl = await userApi.uploadImageToServer(image);
      if (uploadedUrl) uploadedUrls.push(uploadedUrl);
    }

    console.log('All uploaded image URLs:', uploadedUrls);
    return uploadedUrls;
  };

  const handleSubmit = () => {
    const payload: any = {
      name: itemName,
      size: size,
      price: Number(price),
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      categoryId: 3,
      subCategoryId: 3,
      description: description,
      images: images,
    };
    dispatch(userSlice.actions.addProduct(payload))
    if (success) {
      navigation.navigate('UploadItemSuccess')
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header title="Add New Item" goBack={() => navigation.goBack()} />

        {/* Upload Box */}
        <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
          {mediaList[0] ? (
            mediaList[0].type?.startsWith('video') ? (
              <Text style={styles.uploadText}>Video Selected: {mediaList[0].fileName}</Text>
            ) : (
              <Image source={{ uri: mediaList[0].uri }} style={styles.previewImage} />
            )
          ) : (
            <>
              <Icon name="upload" size={24} color={color.Default} />
              <Text style={styles.uploadText}>Upload Item Image/Video</Text>
            </>
          )}
        </TouchableOpacity>

        {mediaList.length > 1 && (
          <View style={styles.imageGrid}>
            {mediaList.slice(1, 5).map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri }}
                style={styles.gridImage}
              />
            ))}
          </View>
        )}

        {/* Input Fields */}
        {renderField('Item Name', 'Enter Name', itemName, setItemName)}
        {renderField('Size', 'Enter Size', size, setSize)}
        {renderField('Category', 'Enter category', category, setCategory)}
        {renderField('Price', 'Enter Price', price, setPrice, 'numeric')}

        {/* Availability */}
        <Text style={styles.label}>Availability</Text>
        <View style={styles.availabilityRow}>
          <TouchableOpacity style={styles.halfInput} onPress={() => setShowStartDatePicker(true)} >
            <Text style={{ color: startDate ? '#000' : '#999' }}>
              {startDate ? startDate.toDateString() : 'From'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.halfInput} onPress={() => setShowEndDatePicker(true)} >
            <Text style={{ color: endDate ? '#000' : '#999' }}>
              {endDate ? endDate.toDateString() : 'To'}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          mode="date"
          open={showStarDatePicker}
          date={startDate || new Date()}
          onConfirm={(date) => {
            setShowStartDatePicker(false);
            setStartDate(date);
          }}
          onCancel={() => setShowStartDatePicker(false)}
        />

        <DatePicker
          modal
          open={showEndDatePicker}
          mode="date"
          date={endDate || new Date()}
          onConfirm={(date) => {
            setShowEndDatePicker(false);
            setEndDate(date);
          }}
          onCancel={() => setShowEndDatePicker(false)}
        />

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
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: hp('3%'),
  },
  gridImage: {
    width: wp('20%'),
    height: hp('10%'),
    borderRadius: 8,
    marginBottom: hp('1%'),
  },
});
