import { Button, Input, Text } from '@rneui/themed';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { commonStyles } from 'src/config/styles';

export default function Verification() {
    return (
        <View style={[commonStyles.FlexColCenterStart, { flex: 1 }]}>
            <ScrollView>
                <View style={[styles.HeaderTextSection]}>
                    <View style={styles.HeaderTextSectionContent}>
                        <Text type="header" style={commonStyles.mx20}>Let's get you verified so you can start cooking!</Text>
                        <Text style={commonStyles.mb20}>You can upload each section seperately and revisit the rest later.</Text>
                    </View>
                </View>

                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Upload a photo of your Driver License</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Button mode="miniOrange" title="Front"></Button>
                        <Button mode="miniOrange" title="Back"></Button>
                        <Button mode="miniRed" title="Submit"></Button>
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Take a Selfie</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Button mode="miniOrange" title="Take Pic"></Button>
                        <Button mode="miniRed" title="Submit"></Button>
                        <View style={styles.GapFiller} />
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Give us a short description of how you plan on offering a unique dining experience for your clients.</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Input inputContainerStyle={{ backgroundColor: '#f4f4f4' }} maxLength={400} containerStyle={styles.InputStyle} shake={() => null} />
                        <Button mode="miniRed" style={{ marginTop: 15 }} title="Submit"></Button>
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Whats your SSN</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Input inputContainerStyle={{ backgroundColor: '#f4f4f4' }} placeholder="xxx-xx-xxxx" maxLength={7} keyboardType="number-pad" secureTextEntry containerStyle={styles.InputStyle} shake={() => null} />
                        <Button mode="miniRed" style={{ marginTop: 15 }} title="Submit"></Button>
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Upload a photo of your food handlers certification.</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Button mode="miniOrange" title="Take Pic"></Button>
                        <Button mode="miniRed" title="Submit"></Button>
                        <Text style={{ width: 100, textDecorationLine: 'underline', marginTop: 7 }} onPress={() => Linking.openURL("https://www.statefoodsafety.com/food-handler")}>Learn More</Text>
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Give us a short description of your Professional Cooking Career.</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Input inputContainerStyle={{ backgroundColor: '#f4f4f4' }} maxLength={400} containerStyle={styles.InputStyle} shake={() => null} />
                        <Button mode="miniRed" style={{ marginTop: 15 }} title="Submit"></Button>
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Do you agree to a full background check?</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Button mode="miniRed" title="Yes"></Button>
                        <View style={styles.GapFiller} />
                        <View style={styles.GapFiller} />
                    </View>
                </View>
                <View style={[styles.ContainerStyle]}>
                    <Text type="label" style={[commonStyles.mt10, commonStyles.mb20, styles.LabelText]}>* Please upload a resume with any refrences.</Text>
                    <View style={[styles.ButtonView, commonStyles.mb20]}>
                        <Button mode="miniOrange" title="Take Pic"></Button>
                        <Button mode="miniRed" title="Submit"></Button>
                        <View style={styles.GapFiller} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    ContainerStyle: {
        ...commonStyles.mb20,
        backgroundColor: 'white',
        width: "100%",
        alignItems: 'center',
    },
    HeaderTextSection: {
        alignItems: 'center'
    },
    ButtonView: {
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    InputStyle: {
        width: "67%",
        height: 50,
    },
    LabelText: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        alignSelf: 'flex-start',
    },
    GapFiller: {
        width: 100 // width of button
    },
    HeaderTextSectionContent: {
        width: "90%",
        justifyContent: 'center'
    }
})