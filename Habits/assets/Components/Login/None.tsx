import React from 'react'
import { View } from 'react-native'
import Button from '../Utils/Button'
import Container from '../Utils/Container'

interface Props{
    login:()=>void,
    signup:()=>void
}

function None({login,signup}:Props) {
  return (
    <Container>
        <Button text='Login' onClick={login}/>
        <Button text='Sign Up' onClick={signup}/>
    </Container>
  )
}

export default None