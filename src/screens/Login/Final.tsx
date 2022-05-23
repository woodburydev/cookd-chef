import { Button, Text } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { commonStyles } from 'src/config/styles';

import ChefImage from '@assets/chefIcon1.png';
import { Image } from '@rneui/themed/dist/Image';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LoginNavigationRoutes, LoginRoutesNames } from 'src/navigation/NavigationTypes';

export default function Final() {
    const route =
        useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['FINAL']>>();
    const navigation = useNavigation();
    const { address, foundOut } = route.params;
    const submit = () => {
        navigation.navigate('CREATE_PROFILE', { address, foundOut })
    }
    return (
        <View style={commonStyles.FlexColCenterCenter}>
            <View style={[styles.SectionStyle]}>
                <Image
                    source={ChefImage}
                    style={styles.logoContainer}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text type="header" centerText>Welcome To Cookd, Chef!</Text>
                <Text type="description">Your account has been set up! You can now create your public profile and menu. However you have a just few more steps before you can start getting clients. </Text>
                <Button
                    onPress={submit}
                    style={styles.Button}
                    title='Get Started'
                />
            </View>
        </View>

    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    SectionStyle: {
        width: '80%',
        marginTop: "15%",
        top: windowHeight < 750 ? 30 : 0,
        justifyContent: 'space-between',
        height: windowHeight < 750 ? "75%" : '65%',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        height: windowHeight < 750 ? 150 : 200,
        alignSelf: 'center',
        width: windowHeight < 750 ? 150 : 200,
    },
    Button: {
        alignSelf: 'center',
    },
});

