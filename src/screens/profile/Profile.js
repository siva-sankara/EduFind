import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { getUserDetails, uploadProfilePicture } from '../../api/apiCalls';
import allText from '../../utility/TextContent';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


const ProfileScreen = ({ navigation }) => {
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [user, setUserDetails] = useState()
  const [imageUri, setImageUri] = useState(null);
  const [imgSource, SetImageSource] = useState({})
  const dispatch = useDispatch();
  const userId = useSelector(state => state?.auth?.userId)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Getting user details
        const response = await getUserDetails(userId);
        if (response.status === 200) {
          setUserDetails(response?.data);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);


  const handleLogout = () => {
    dispatch(logout());
  };
  // Open Image Library
  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Required to get base64 data

    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log(response)
        const uri = response?.assets && response.assets[0]?.uri;
        setImageUri(uri);
        const formData = new FormData();
        formData.append('image', {
          path: response?.assets && response.assets[0]?.uri,
          type: response?.assets && response?.assets[0]?.type,
          name: response?.assets && response?.assets[0]?.fileName,
        });
        const response = await uploadProfilePicture(userId, formData);
        console.log(response, "ooooooo");
      }
    });
  };
  // Open Camera
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity >
          {/* <Icon name="arrow-back" size={24} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{allText.headings.myprofile}</Text>
        <TouchableOpacity>
          <Icon name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={openImageLibrary}  >
          <View style={styles.profilePic}>
            <Image
              source={imageUri ? { uri: imageUri } : ""}
              style={styles.profileImage}
            />
            {/* <Text style={styles.profileInitials}>{user?.name?.split(" ")?.length > 1 ? (`${user?.firstName[0]?.toUpperCase()} ${(user?.lastName[0] === null || undefined) ? user?.firstName[1]?.toUpperCase() : user?.lastName[0]?.toUpperCase()}`)  : (`${user?.name[0]?.toUpperCase()}${user?.name[1]?.toUpperCase()}`) } </Text> */}
            <TouchableOpacity style={styles.editIcon} onPress={openCamera}>
              <Icon name="add" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{user?.user?.name}</Text>
        <TouchableOpacity style={styles.verifyButton} onPress={() => navigation.navigate("ProfileSetUp", {
          userId: userId
        })}>
          <Text style={styles.verifyText}>{allText.buttonText?.updateprofile}</Text>
        </TouchableOpacity>
      </View>
      {
        user?.user?.role === 'teacher' && (

          <View style={styles.pricingContainer}>
            <TouchableOpacity style={styles.pricingCard}>
              <SimpleIcon name="user-follow" size={24} color="#4CAF50" />
              <Text style={styles.price}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pricingCard}>
              <SimpleIcon name="user-following" size={24} color="#2196F3" />
              <Text style={styles.price}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pricingCard}>
              <AntIcon name="like1" size={24} color="#FF9800" />
              <Text style={styles.price}>Profile Likes</Text>
            </TouchableOpacity>
          </View>
        )
      }
      {/* Expertise Section */}
      <View style={styles.expertiseContainer}>
        <Text style={styles.sectionTitle}>{allText.normaltext?.help}</Text>
        <TouchableOpacity>
          <Text style={styles.addExpertiseText}>{allText.normaltext.expertise}</Text>
        </TouchableOpacity>
      </View>

      {/* Pricing Section */}
      {user?.user?.role === "user" ? (
        <View style={styles.pricingContainer}>
          <TouchableOpacity style={styles.pricingCard}>
            <SimpleIcon name="user-follow" size={24} color="#4CAF50" />
            <Text style={styles.price}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pricingCard}>
            <SimpleIcon name="user-following" size={24} color="#2196F3" />
            <Text style={styles.price}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pricingCard}>
            <AntIcon name="like1" size={24} color="#FF9800" />
            <Text style={styles.price}>Profile Likes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.pricingContainer}>
          <TouchableOpacity style={styles.pricingCard}>
            <Icon name="call" size={24} color="#4CAF50" />
            <Text style={styles.price}>₹500/hr</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pricingCard}>
            <Icon name="videocam" size={24} color="#2196F3" />
            <Text style={styles.price}>₹750/hr</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pricingCard}>
            <Icon name="chat" size={24} color="#FF9800" />
            <Text style={styles.price}>₹50</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Availability Section */}
      <View style={styles.availabilityContainer}>
        <View style={styles.availabilityHeader}>
          <Text style={styles.availabilityText}>{allText.normaltext.available}</Text>
          <Switch
            value={isAvailable}
            onValueChange={(val) => setIsAvailable(val)}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={isAvailable ? '#fff' : '#f4f3f4'}
          />
        </View>
        <Text style={styles.scheduleText}>Or set schedule ➜</Text>
        {!isAvailable && (
          <Text style={styles.availabilityHint}>
            Switch on your availability to maximize earnings!
          </Text>
        )}
      </View>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        {[
          { name: 'Dashboard', icon: 'bar-chart' },
          { name: 'UniWallet', icon: 'account-balance-wallet' },
          { name: 'Services', icon: 'build' },
          { name: 'Sessions', icon: 'event' },
          { name: 'Inspirations', icon: 'emoji-emotions' },
          { name: 'Profile visits', icon: 'visibility' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.featureCard}>
            <Icon name={item.icon} size={24} color="#4c669f" />
            <Text style={styles.featureText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout  */}
      <View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  verifyButton: {
    backgroundColor: '#3949AB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },
  verifyText: {
    color: '#fff',
    fontSize: 12,
  },
  expertiseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addExpertiseText: {
    color: '#4CAF50',
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  pricingCard: {
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  availabilityContainer: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityText: {
    color: '#fff',
    fontSize: 16,
  },
  scheduleText: {
    color: '#4CAF50',
    marginTop: 4,
  },
  availabilityHint: {
    color: '#FF5252',
    marginTop: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    width: '30%',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },

  logoutText: {
    fontSize: 18,
    color: "lightgray",
    marginTop: 50,
    textAlign: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  }
});

export default ProfileScreen;
