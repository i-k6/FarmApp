import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, LayoutAnimation } from 'react-native';
import Colors from '../../constants/Colors';

export default function CheckersList() {
    const [showOptions, setShowOptions] = useState(false);

    const options = [
        { name: 'NFT Copilot', link: 'https://nftcopilot.com/zksync-rank-check?' },
        { name: 'Wenser', link: 'https://wenser.vercel.app/' },
        { name: '10K Drop', link: 'https://www.10kdrop.com/' },
    ];

    const handleOptionPress = (link) => {
        Linking.openURL(link);
    };

    const toggleOptions = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowOptions(!showOptions);
    };

    return (
        <TouchableOpacity style={styles.card} onPress={toggleOptions}>
            <Text style={styles.title}>CheckersList</Text>
            <View style={{ overflow: 'hidden', height: showOptions ? null : 0 }}>
                {showOptions && (
                    <View style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleOptionPress(option.link)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.optionText}>{option.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: Colors.CIRCLE_COLOR,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.PRIMARY,
        
    },
    optionsContainer: {
        width: 300,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
        
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
});
