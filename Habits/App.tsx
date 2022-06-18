import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UserWrapper from './assets/Components/UserWrapper';
import Main from "./assets/Components/Main";
import NotificationWrapper from './assets/Components/NotificationWrapper';

export default function App() {
    return (
		<UserWrapper>
			<NotificationWrapper>
				<View style={styles.container}>
					<Main/>
				</View>
			</NotificationWrapper>
		</UserWrapper>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495E',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
