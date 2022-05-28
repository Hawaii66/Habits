import React, { useContext } from 'react'
import { View } from 'react-native'
import Button from '../Utils/Button'
import * as AppleAuthentication from 'expo-apple-authentication';
import { UserContext } from '../../Contexts/UserContext';

interface Props{
    cancell: ()=>void
}

function Login({cancell}:Props) {
    const {setUser} = useContext(UserContext);

    const appleSignIn = async (id:string) => {
        const result = await (fetch(`http://176.10.157.225:5000/users/get/appleid/${id}`, {
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })).then(res=>res.json());

        setUser(result.user);
    }

    return (
        <View>
            <Button text="Cancel login" onClick={cancell}/>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 44 }}
                onPress={async () => {
                    try {
                        const credential = await AppleAuthentication.signInAsync();
                        appleSignIn(credential.user);
                    } catch (e:any) {
                        cancell();
                }}}
            />
        </View>
    )
}

export default Login