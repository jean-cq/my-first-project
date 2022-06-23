import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { Alert, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, FlatList, Modal, ListItem } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Flatbutton from '../components/Flatbutton.js';
import MaterialIcons from '../node_modules/@expo/vector-icons/MaterialIcons.js';
import Feather from '../node_modules/@expo/vector-icons/Feather.js';
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome.js';
import AntDesign from '../node_modules/@expo/vector-icons/AntDesign.js';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Progress } from '../node_modules/react-native-progress/Bar';
import Svg, { Circle, Rect } from 'react-native-svg';



export default B_week = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [rem, setRem] = useState('');
    const [items, setItems] = useState([
        { id: '0', category: 'Recreation', amount: '50' },
        { id: '1', category: 'Diet', amount: '260' },
        { id: '2', category: 'Education', amount: '260' },
        { id: '3', category: 'Medical', amount: '40' },
        { id: '4', category: 'Traffic', amount: '30' },
        { id: '5', category: 'Beautify', amount: null },
        { id: '6', category: 'Others', amount: null },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [ExpenditureData, setExpenditureData] = useState([]);

    const updateFieldChanged = index => e => {
        console.log('index: ' + index);
        console.log('property name: ' + e.target.name);
        let newArr = [...items]; // copying the old datas array
        newArr[index] = e.amount; // replace e.target.value with whatever you want to change it to

        setItems(newArr);
    }
    const deleteItem = id => {
        setItems(previousItems => {
            return previousItems.filter(item => item.id !== id);
        });
    };
    const status_change = () => {
        setItems(item => item.status = !item.status)
    }

    const loadAllExpenditure = async () => {

        const { Expenditure, error } = await supabase.getAllExpenditure();
        setExpenditureData(Expenditure)
    }
    useEffect(() => {
        loadAllExpenditure();

    }, [])

    return (
        <View>
            <View style={styles.container}>

                <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: 'bold' }}>Budget used : $150</Text>


                <Svg width='500' height='40'>
                    <Rect
                        x="40"
                        y="20"
                        width="300"
                        height="15"
                        fill='#3C3056'
                        strokeWidth="3"

                    />
                    <Rect
                        x="40"
                        y="20"
                        width={0.75 * 300}
                        height="15"
                        fill='yellow'
                        strokeWidth="3"

                    />

                </Svg>


                <Text style={{ textAlign: 'right', marginRight: 20, fontSize: 10 }}>75%</Text>
            </View>

            <View style={{ backgroundColor: '#C4C4C4', padding: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, marginLeft: 7 }}>Category Budget</Text>
            </View>
            {/*Flatlist*/}


            <FlatList
                showsVerticalScrollIndicator={true}
                data={items}
                //ExpenditureData
                renderItem={({ item }) => (
                    <View >

                        <View style={{ flexDirection: 'row', padding: 20 }}>


                            <Text style={{ flex: 2 }}>{item.category}</Text>

                            <TouchableOpacity onPress={() => {
                                setRem(item.id)
                                setModalVisible(true);
                            }} style={{ flex: 1, flexDirection: 'row' }}>
                                {item.amount === null
                                    ? <Text style={{ flex: 2, textAlign: 'right' }}>not set</Text>


                                    : <Text style={{ flex: 1, textAlign: 'right' }}>{item.amount}</Text>}
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    color={'black'}
                                    size={20}
                                    flex={1} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'grey' }}>
                        </View>

                    </View>
                )}
                keyExtractor={
                    (item) => item.id
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Budget for {items[rem].category}</Text>
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="grey"
                            marginHorizontal={10}
                            style={styles.textInput}
                            keyboardType='numeric'
                            value={items.amount}
                            onChangeText={(text) => setItems(items.map(item =>
                                item.id === rem
                                    ? { ...item, amount: text }
                                    : item
                            ))} />
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttontext1}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.buttonposition}>
            </View>
        </View>




    );


}



const styles = StyleSheet.create({

    container: {
        backgroundColor: '#EDE9FB',
        flexDirection: 'column',
        padding: 20
    },
    button1: {
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        marginTop: 35
    },

    buttontext1: {

        color: 'black',
        fontSize: 13,
        textAlign: 'center'
    },
    buttonposition: {
        position: 'absolute',
        justifyContent: 'flex-end',
        marginLeft: 320,
        marginTop: 500

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 50,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, modalText: {
        marginBottom: 15,
        textAlign: "center"



    },
    textInput: {
        height: 40,
        margin: 12,
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 2,
        padding: 10
    }




})