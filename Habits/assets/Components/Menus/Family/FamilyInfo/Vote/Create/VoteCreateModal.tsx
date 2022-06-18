import React from 'react'
import { Modal, StyleSheet, View, Text } from 'react-native'

interface Props
{
    show:boolean
}

function VoteCreateModal({show}:Props)
{
    return(
        <Modal
            animationType='fade'
            transparent={true}
            visible={show}>
            <View style={styles.center}>
                <View style={styles.shadow}>
                    <View style={styles.container}>
                        <View style={styles.center}>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    center:{
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    marginBottom:{
        height:"70%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    shadow:{
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:2,
        shadowOffset:{
            height:0,
            width:0
        }
    },
    container:{
        width:303,
        height:297,
        backgroundColor: '#353B48',
        overflow:"hidden",
        borderRadius:36,
    },
});

export default VoteCreateModal