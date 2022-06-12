import * as Device from 'expo-device';
import { Subscription } from 'expo-modules-core';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { INoteCode, INotification } from '../Interfaces/Notification';
import * as Notifications from "expo-notifications";
import { NotiContext } from '../Contexts/NotificationContext';

interface Props{
    children:React.ReactNode
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
	  shouldShowAlert: true,
	  shouldPlaySound: true,
	  shouldSetBadge: false,
	}),
  });

function NotificationWrapper({children}:Props) {
	const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<INotification>({body:"",code:"None",data:"",title:""});
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => {
			if(token === undefined){return;}
			setExpoPushToken(token);
			console.log("EPXO PUSH TOKE: ", token);
		});

		notificationListener.current = Notifications.addNotificationReceivedListener(newNoti => {
            if(newNoti.request.content.body === null){return;}
            if(newNoti.request.content.title === null){return;}
            var code:INoteCode = "None";
            if(newNoti.request.content.data.code === "Pomodoro"){code = "Pomodoro";}

			setNotification({
                body:newNoti.request.content.body,
                code:code,
                data:newNoti.request.content.data.data,
                title:newNoti.request.content.title
            });
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response);
		  });

		return () => {
			if(notificationListener !== undefined && notificationListener.current !== undefined){
			Notifications.removeNotificationSubscription(notificationListener.current);
			}
			if(responseListener !== undefined && responseListener.current !== undefined){
				Notifications.removeNotificationSubscription(responseListener.current);
				}
			
		  };
	},[]);

    const sendNotification = async (data:INotification, delay:number) => {
        if(delay !== 0)
        {
            return await schedulePushNotification(data,delay)
        }
    }

    return (
        <NotiContext.Provider value={{notification,sendNotification}}>{children}</NotiContext.Provider>
    ) 
}

export default NotificationWrapper

async function sendPushNotification(expoPushToken:string) {
	const message = {
	to: expoPushToken,
	sound: 'default',
	title: 'Original Title123',
	body: 'And here is the body!',
	data: { someData: 'goes here' },
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Accept-encoding': 'gzip, deflate',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(message),
	});
}

async function schedulePushNotification(noti:INotification, delay:number) {
	return await Notifications.scheduleNotificationAsync({
	  content: {
		title: noti.title,
		body: noti.body,
		data: { data: noti.data, code:noti.code },
		sound:"iphone_cool_tone.wav",
		vibrate:[1,1,1,1]
	  },
	  trigger: { seconds: delay },
	});
  }

async function registerForPushNotificationsAsync() {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
		const { status } = await Notifications.requestPermissionsAsync({
			ios:{
				allowAlert:true,
				allowAnnouncements:true,
				allowSound:true
			}
		});
		finalStatus = status;
		}
		if (finalStatus !== 'granted') {
		alert('Failed to get push token for push notification!');
		return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
		name: 'default',
		importance: Notifications.AndroidImportance.MAX,
		vibrationPattern: [0, 250, 250, 250],
		lightColor: '#FF231F7C',
		});
	}

	return token;
}