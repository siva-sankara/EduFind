import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SocialMedia from 'react-native-vector-icons/FontAwesome';
import allText from '../../utility/TextContent';
import { useSelector } from 'react-redux';
import { getUserDetails, UpdateBasicProfileDetails, UpdateSocialMediaDetails } from '../../api/apiCalls';
import { useFocusEffect } from '@react-navigation/native';


const ProfileSetup = ({ navigation, route }) => {
    const { userId } = route?.params;
    const [expandedSections, setExpandedSections] = useState({
        basicInfo: false,
        aboutMe: false,
        myExpertise: false,
        pricingDetails: false,
        socialMediaLinks: false,
    });
    const [expertise, setExpertise] = useState('');
    const [profileImage, setProfileImage] = useState(user?.media?.profilePicture?.imageUrl || null);
    const [user, setUser] = useState();
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    useFocusEffect(
        useCallback(() => {
            const fetchUserDetails = async () => {
                try {
                    // Getting user details
                    const response = await getUserDetails(userId);
                    if (response.status === 200) {
                        setUser(response?.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user details:', error);
                }
            };

            fetchUserDetails();
        }, [userId])
    );
     console.log('====================================');
      console.log(user?.user );
      console.log('====================================');
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{allText.screenNames.updateProfile}</Text>
                <TouchableOpacity>
                </TouchableOpacity>
            </View>
            {/* Profile Image */}
            <TouchableOpacity onPress={() => Alert.alert('Add Photo')} style={{ alignSelf: 'center', marginBottom: 20 }}>
                {(profileImage || user?.media?.profilePicture?.imageUrl )? (
                    <Image source={{ uri:  `/http://10.0.2.2:8080/${user?.media?.profilePicture?.imageUrl}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                ) : (
                    <Icon name="account-circle" size={100} color="#aaa" />
                )}
            </TouchableOpacity>

            {/* Profile Completion Score */}
            <View style={{ backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>{allText.normaltext.profileScore}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 8, backgroundColor: '#444', borderRadius: 5, marginRight: 10 }}>
                        <View style={{ width: `${50}%`, height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 }} />
                    </View>
                    <Text style={{ color: '#fff' }}>50%</Text>
                </View>
            </View>

            {/* Collapsible Sections */}
            {[
                { title: allText.headings.basicInfo, key: 'basicInfo', icon: 'person' },
                { title: allText.headings.about, key: 'aboutMe', icon: 'info' },
                { title: allText.headings.exp, key: 'myExpertise', icon: 'emoji-objects' },
                // { title: 'Pricing details', key: 'pricingDetails', icon: 'attach-money' },
                { title: allText.headings.socialMediaLinks, key: 'socialMediaLinks', icon: 'share' },
            ].map((section) => (
                <View key={section.key} style={{ marginBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => toggleSection(section.key)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#1E1E1E',
                            padding: 15,
                            borderRadius: 10,
                        }}>
                        <Icon name={section.icon} size={20} color="#fff" style={{ marginRight: 10 }} />
                        <Text style={{ flex: 1, fontSize: 16, color: '#fff' }}>{section.title}</Text>
                        <Icon name={expandedSections[section.key] ? 'expand-less' : 'expand-more'} size={20} color="#fff" />
                    </TouchableOpacity>
                    {
                        expandedSections[section.key] && section.key === 'basicInfo' && (
                            <BasicInfo user={user?.user} userId={userId} />
                        )
                    }
                    {expandedSections[section.key] && section.key === 'myExpertise' && (
                        <View style={{ backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginTop: 5 }}>
                            <Text style={{ color: '#bbb', marginBottom: 10 }}>In what areas can you help others?</Text>
                            <TextInput
                                placeholder="Entrepreneurship/Design/Coding/Marketing etc."
                                placeholderTextColor="#aaa"
                                value={expertise}
                                onChangeText={setExpertise}
                                style={{
                                    backgroundColor: '#2A2A2A',
                                    color: '#fff',
                                    padding: 10,
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    )}
                    {
                        expandedSections[section.key] && section.key === 'socialMediaLinks' && (
                            <SocialMediaLinks user={user?.user} userId={userId} />
                        )
                    }
                </View>
            ))}
        </ScrollView>
    );
};



// Import vector icons if needed
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SocialMediaLinks = ({ user }) => {
    // Get userId from Redux store
    const userId = useSelector((state) => state.auth.userId);
    console.log(user)
    // Social media links state
    const [links, setLinks] = useState({
        github:( user?.socialMedia?.github !== "" || null) ? user?.socialMedia?.github : "",
        linkedin: (user?.socialMedia?.linkedin !== "" || null) ? user?.socialMedia?.linkedin : "",
        instagram: (user?.socialMedia?.instagram !== "" || null )? user?.socialMedia?.instagram : "",
        youtube:( user?.socialMedia?.youtube !== "" || null )? user?.socialMedia?.youtube : "",
        twitter: (user?.socialMedia?.twitter !== "" || null) ? user?.socialMedia?.twitter : "",
        facebook:( user?.socialMedia?.facebook !== "" || null) ? user?.socialMedia?.facebook : "",
        otherLinks: ""

    })

    // Update API call
    const handleUpdate = async () => {
        console.log(links)
        if (links?.facebook !== null || links?.linkedin !== null || links?.instagram !== null || links?.youtube !== null) {

            const response = await UpdateSocialMediaDetails(userId, links);
            if (response?.status === 200) {
                console.log(" updated successfully ")
                setLinks(
                    {
                        facebook: response?.data?.user?.socialMedia?.facebook,
                        github: response?.data?.user?.socialMedia?.github,
                        linkedin: response?.data?.user?.socialMedia?.linkedin,
                        instagram: response?.data?.user?.socialMedia?.instagram,
                        youtube: response?.data?.user?.socialMedia?.youtube,
                        twitter: response?.data?.user?.socialMedia?.twitter,
                        otherLinks: response?.data?.user?.socialMedia?.otherLinks,

                    }
                )
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 }}>
                    Update your social media profiles
                </Text>
                <Text style={{ color: '#aaa', marginBottom: 20 }}>
                    Help your Konnections find you on other platforms
                </Text>

                {/* Custom Link */}
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ color: '#fff', fontSize: 16, marginBottom: 5 }}>🔗 Add Custom Link</Text>
                    <TextInput
                        placeholder="Add link"
                        placeholderTextColor="#888"
                        value={links.custom}
                        onChangeText={(text) => setLinks({ ...links, custom: text })}
                        style={{
                            backgroundColor: '#1E1E1E',
                            color: '#fff',
                            padding: 12,
                            borderRadius: 8
                        }}
                    />
                </View>

                {/* Social Media Platforms */}
                {[
                    { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
                    { key: 'instagram', label: 'Instagram', icon: 'instagram' },
                    { key: 'youtube', label: 'YouTube', icon: 'youtube-play' },
                    { key: 'twitter', label: 'Twitter', icon: 'twitter' },
                    { key: 'facebook', label: 'Facebook', icon: 'facebook' },
                ].map((item) => (
                    <View key={item.key} style={{ marginBottom: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 16, marginBottom: 5 }}>
                            {item.label}
                        </Text>
                        <TextInput
                            placeholder="Add link"
                            placeholderTextColor="#888"
                            value={links[item.key]}
                            onChangeText={(text) => setLinks({ ...links, [item.key]: text })}
                            style={{
                                backgroundColor: '#1E1E1E',
                                color: '#fff',
                                padding: 12,
                                borderRadius: 8
                            }}
                        />
                    </View>
                ))}

                {/* Update Button */}
                <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                        backgroundColor: '#4CAF50',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Update Social Media Links</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};





const BasicInfo = ({ userId, user }) => {
    const [firstName, setFirstName] = useState((user?.firstName !== null || undefined) ? user?.firstName : "");
    const [lastName, setLastName] = useState((user?.lastName !== null || undefined) ? user?.lastName : "");
    const [designation, setDesignation] = useState((user?.currentDesignation !== null || undefined) ? user?.currentDesignation : "");
    const [birthdate, setBirthdate] = useState(null);
    const [phone, setPhone] = useState((user?.phoneNumber !== null || undefined) ? user?.phoneNumber : "");
    const [email, setEmail] = useState((user?.email !== null || undefined) ? user?.email : "");
    const [countryCode, setCountryCode] = useState('IN');
    const [showDatePicker, setShowDatePicker] = useState(false);

    //retriving id from token value 
    // const token = useSelector(state => state.auth.token);
    // const userID = getUserIdFromToken(token);
    // const userId = useSelector((state) => state.auth?.userId);


    const handleUpdate = async () => {
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "currentDesignation": designation,
            "phoneNumber": phone,
            "email": email
        }
        // Alert.alert('Basic Info Updated', 'Your basic information has been successfully updated!');
        const response = await UpdateBasicProfileDetails(userId, data)
        if (response.status === 200) {
            console.log(response, "updated basic details response ");
            setFirstName(response?.data?.user?.firstName)
            setLastName(response?.data?.user?.lastName)
            setDesignation(response?.data?.user?.currentDesignation)
            setPhone(response?.data?.user?.phoneNumber)
            setEmail(response?.data?.user?.email)
        }

    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#121212', padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 }}>
                Basic Information
            </Text>

            {/* Name Fields */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={{
                        flex: 1,
                        backgroundColor: '#1E1E1E',
                        color: '#fff',
                        padding: 12,
                        borderRadius: 8,
                        marginRight: 10,
                    }}
                />
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={lastName}
                    onChangeText={setLastName}
                    style={{
                        flex: 1,
                        backgroundColor: '#1E1E1E',
                        color: '#fff',
                        padding: 12,
                        borderRadius: 8,
                    }}
                />
            </View>

            {/* Designation */}
            <TextInput
                placeholder="What is your current designation?"
                placeholderTextColor="#aaa"
                value={designation}
                onChangeText={setDesignation}
                style={{
                    backgroundColor: '#1E1E1E',
                    color: '#fff',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 15,
                }}
            />

            {/* Birthday Picker */}
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                    backgroundColor: '#1E1E1E',
                    padding: 12,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                }}>
                <Text style={{ color: birthdate ? '#fff' : '#aaa' }}>
                    {birthdate ? birthdate.toDateString() : 'Choose date'}
                </Text>
                <Icon name="calendar-today" size={20} color="#aaa" />
            </TouchableOpacity>
            {/* {showDatePicker && (
                <DateTimePicker
                    value={birthdate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setBirthdate(selectedDate);
                    }}
                />
            )} */}

            {/* Phone Number */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    style={{
                        flex: 1,
                        backgroundColor: '#1E1E1E',
                        color: '#fff',
                        padding: 12,
                        borderRadius: 8,
                    }}
                />
            </View>

            {/* Email */}
            <TextInput
                placeholder="Enter a valid email ID"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={{
                    backgroundColor: '#1E1E1E',
                    color: '#fff',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 15,
                }}
            />

            {/* Update Button */}
            <TouchableOpacity
                onPress={handleUpdate}
                style={{
                    backgroundColor: '#4CAF50',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>{allText.buttonText.updatebasic}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    logoutText: {
        color: "gray",
        bottom: 0
    }
})


export default ProfileSetup;
