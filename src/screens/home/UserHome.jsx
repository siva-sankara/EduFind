import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const UserHome = ({ navigation, userId , userRole}) => {
    const categories = [
        {
            id: '1',
            title: 'Post your Requirement',
            subtitle: `Add your Subject to post. Science | Telugu  | English  Maths`,
            bgColor: '#ebab34',
            pageRoute: 'Subject-requirement',
        },
        {
            id: '2',
            title: 'Subject Teacher ',
            subtitle: 'Maths | Telugu | English | Hindi ',
            bgColor: '#8E44AD',
            pageRoute: 'Subject-teachers',
        },
        {
            id: '3',
            title: 'Post Your Queries (Doughts)',
            subtitle: 'Validate ideas with Founders/Investors | GTM | MVP | PMF',
            bgColor: '#E74C3C',
            pageRoute: 'User-queries',
        },
        {
            id: '4',
            title: 'Career Guaidance',
            subtitle: 'Founders connect | VCs/Angel Investors | Founding team',
            bgColor: '#C0392B',
            pageRoute: 'Career-Guidance',
        },
        // {
        //     id: '5',
        //     title: 'Interview Preparation',
        //     subtitle: 'Mock Interviews | CV Review | Body Language',
        //     bgColor: '#7F8C8D',
        //     pageRoute : 'Interview-preparation',
        // },
        // {
        //     id: '6',
        //     title: 'Connect With Working Professionals',
        //     subtitle: 'Marketing | Senior Management | Tech Experts | E-commerce',
        //     bgColor: '#2980B9',
        //     pageRoute : '',
        // },
        {
            id: '7',
            title: 'Mental well being',
            subtitle: 'Anxiety/Depression | Stress | Therapy | ADHD',
            bgColor: '#8E44AD',
            pageRoute: 'Mental-well-being',
        },

        // {
        //     id: '8',
        //     title: 'Mental well being',
        //     subtitle: 'Anxiety/Depression | Stress | Therapy | ADHD',
        //     bgColor: '#8E44AD',
        //     pageRoute : '',
        // },
    ];
    return (
        <ScrollView>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={24} color="#ccc" />
                <TextInput
                    placeholder="Need help with Tax"
                    placeholderTextColor="#ccc"
                    style={styles.searchInput}
                />
                <Ionicons name="notifications-outline" size={24} color="#ccc" />
            </View>

            {/* Profile Completion Section */}


            {userRole === "teacher" ? (
                <View style={styles.profileCompletion}>
                    <View style={[styles.progressCircle, { backgroundColor: '#ffff' }]}>
                        <FontAwesome5 name="chalkboard-teacher" size={22} />
                    </View>
                    <View style={styles.progressInfo}>
                        <Text style={styles.progressTextBold}>
                            Set up your profile as Techer (tutour) ➢➢➢
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register-as-Teacher", {
                            userId: userId,
                            navigation: navigation
                        })}>
                            <Text style={styles.finishText}>Register as Teacher →</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                //   {/* register as teacher */}
                <View style={styles.profileCompletion}>
                    <View style={styles.progressCircle}>
                        <Text style={styles.progressText}>20%</Text>
                    </View>
                    <View style={styles.progressInfo}>
                        <Text style={styles.progressTextBold}>
                            Complete your profile to get discovered and build your brand!
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ProfileSetUp", {
                            userId: userId,
                            navigation: navigation
                        })}>
                            <Text style={styles.finishText}>Finish setting up →</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Title */}
            <Text style={styles.title}>
                Find the best person to help you with your query
            </Text>

            {/* Search Bar for Categories */}
            <View style={styles.categorySearchContainer}>
                <TextInput
                    placeholder="Search by name, company, skills, and more..."
                    placeholderTextColor="#999"
                    style={styles.categorySearchInput}
                />
                <Feather name="search" size={20} color="#666" style={styles.categorySearchIcon} />
            </View>

            {/* Categories */}
            <View style={styles.heading}>
                <Text style={styles.subTitle}>Connect with</Text>
                <Text style={styles.subTitleSeeAll}>See All</Text></View>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false} // Disable FlatList scroll if inside ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.categoryCard, { backgroundColor: item.bgColor }]} onPress={() => navigation.navigate(item?.pageRoute)}>
                        <Text style={styles.categoryTitle}>{item.title}</Text>
                        <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Experts Section */}
            <Text style={styles.subTitle}>Top experts for you</Text>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    profileCompletion: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    progressCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#008080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    progressInfo: {
        marginLeft: 10,
        flex: 1,
    },
    progressTextBold: {
        color: '#fff',
        fontWeight: 'bold',
    },
    finishText: {
        color: '#1abc9c',
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    categorySearchContainer: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    categorySearchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
    },
    categorySearchIcon: {
        marginLeft: 10,
    },
    subTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
    },
    listContainer: {
        marginTop: 10,
        flex: 1
    },
    categoryCard: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categorySubtitle: {
        fontSize: 12,
        color: '#ddd',
        marginTop: 5,
        textAlign: 'center',
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    subTitleSeeAll: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 10,
        marginRight: 10
    },
});

export default UserHome;