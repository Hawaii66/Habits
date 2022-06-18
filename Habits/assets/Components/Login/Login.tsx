import React, { useContext } from 'react'
import { View } from 'react-native'
import Button from '../Utils/Button'
import * as AppleAuthentication from 'expo-apple-authentication';
import { UserContext } from '../../Contexts/UserContext';
import { getData, uploadData } from '../../Contexts/StaticContext';
import { IUser } from '../../Interfaces/User';

interface Props{
    cancell: ()=>void
}

function Login({cancell}:Props) {
    const {setUser,expoToken} = useContext(UserContext);

    const appleSignIn = async (id:string) => {
        const data = await getData(`/users/get/appleid/${id}`);
        var newUser:IUser = data.data.user;
        if(expoToken !== "")
        {
            newUser.expoPushToken = expoToken;
        }
        setUser(newUser);
        await uploadData(`/notification/save/${newUser.email}`,"POST",{
            token:expoToken
        });
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