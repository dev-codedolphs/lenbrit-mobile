import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBlobUtil from 'react-native-blob-util';
import axios from 'axios';

const API_BASE_URL = 'https://starfish-app-ajafk.ondigitalocean.app/api/v1'

export default class Api {

  static async addProduct(data) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Using token:', token);

      const response =await axios.post(`${API_BASE_URL}/listings`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
      });
      console.log('response in Api', response)
      return response;
    } catch (error) {
      console.log('err', error)
      console.log('err', error.response?.data?.message)
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  static async getAllProducts() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/listings`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Get products error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }

  static async updateProduct(productId, updatedData) {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const response = await axios.patch(
        `${API_BASE_URL}/listings/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log('Update product error:', error);
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  }

  static async deleteProduct(productId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${API_BASE_URL}/listings/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Delete product error:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  }  
  

  // order Apis
  static async createOrder(data) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(`${API_BASE_URL}/orders`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Create order error:', error);
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  static async getAllOrders() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Get all orders error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  }

  static async getOrderById(orderId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Get order by ID error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }

  // cart Apis
  static async addToCart(data) {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${API_BASE_URL}/cart`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getAllCartItems() {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async removeItemFromCart(itemId) {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return itemId;
  }

  static async updateItemInCart(itemId, updatedData) {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${API_BASE_URL}/cart/${itemId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async uploadImageToServer(image) {
    try {
      const fileName = image.fileName || 'upload.jpg';
      const fileType = image.type || 'image/jpeg';

      // Step 1: Get presigned URL
      const presignResponse = await axios.get(
        `${API_BASE_URL}/presigned/images/${fileName}?type=${fileType}&mediaType=profile`
      );

      const { url, path } = presignResponse.data;

      // Step 2: Upload the file using RNBlobUtil with required headers
      const res = await RNBlobUtil.fetch('PUT', url, {
        'Content-Type': fileType,
        'x-amz-acl': 'public-read',
      }, RNBlobUtil.wrap(image.uri));

      if (res.respInfo.status !== 200) throw new Error('Upload failed');

      return path;
    } catch (error) {
      console.log('Upload error:', error);
    }
  }

}
