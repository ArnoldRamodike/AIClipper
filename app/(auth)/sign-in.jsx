import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'

const SignIn = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {setUser, setIsLoggedIn, user} = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const submit = async () => {
    if (form.email ==='' || form.password === '') {
      Alert.alert('Error', 'Email and Passwords are Required')
    }
    setIsSubmiting(true);
    try {
      const result = await signIn(form.email, form.password);
      setUser(result);
      setIsLoggedIn(true);
      

      Alert.alert("Success", "User signed in successfully");
      router.replace('/home')
    } catch (error) {
        Alert.alert('Error', error.message)
    }finally{
      setIsSubmiting(false);
    }
  }
  console.log(user);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log into Aora</Text>
          <FormField 
           title='Email'
           value={form.email}
           handleChangeText={(ev) => setForm({...form, email: ev})}
           otherStyles= 'mt-7'
           keyboardType="email-address"
          />

          <FormField 
           title='Password'
           value={form.password}
           handleChangeText={(ev) => setForm({...form, password: ev})}
           otherStyles= 'mt-7'

          />
          <CustomButton 
            title={'sign in'} handlePress={submit} containerStyles={'mt-7'} isLoading={isSubmiting}
            />

            <View className="justify-center p-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                  Don't have an account ?
              </Text>
              <Link href={'/sign-up'} className='text-lg font-semibold text-secondary'> Sign up</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
