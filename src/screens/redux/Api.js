import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBlobUtil from 'react-native-blob-util';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// const API_BASE_URL = 'https://starfish-app-ajafk.ondigitalocean.app/api/v1'
const API_BASE_URL = 'https://lenbrit-api-vb3nh.ondigitalocean.app/api/v1'

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

  static async cancelOrder(orderId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/cancel`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('cancel order error:', error);
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

  static async acceptOffer(offerId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.put(`${API_BASE_URL}/orders/custom-offers/${offerId}/accept`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Accept offer error:', error);
      throw new Error(error.response?.data?.message || 'Failed to accept offer');
    }
  }

  static async rejectOffer(offerId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.put(`${API_BASE_URL}/orders/custom-offers/${offerId}/reject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Accept offer error:', error);
      throw new Error(error.response?.data?.message || 'Failed to accept offer');
    }
  }

  // cart Apis
  static async addToCart(data) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(`${API_BASE_URL}/cart`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: message,
        topOffset: 20,
        visibilityTime: 3000,
        position: 'bottom',
      });
      console.log('Error in add to cart', error?.response?.data || error.message)
    }
  }

  static async getAllCartItems() {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async removeItemFromCart(itemId) {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.log('❌ ERROR:', error?.response?.data || error.message);
      throw error;
    }
  }

  static async updateItemInCart(itemId, updatedData) {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.put(`${API_BASE_URL}/cart/${itemId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // get categories
  static async getAllCategories() {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Get all categories error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
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
