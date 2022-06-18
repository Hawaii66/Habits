import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { FamilyContext } from '../../../../../Contexts/FamilyContext';

interface Props
{

}

function FamilyVote({}:Props)
{
    const {family} = useContext(FamilyContext);

    return <></>
}

const styles = StyleSheet.create({

});

export default FamilyVote