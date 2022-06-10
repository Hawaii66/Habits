import React from 'react'
import { View, Text} from 'react-native'
import { INote } from '../../../Interfaces/Notes'

interface Props
{
    note:INote,
    setNote:(note:INote) => void
}

function NoteView({note,setNote}:Props) {
    return (
        <View><Text>Error</Text></View>
    )
}

export default NoteView