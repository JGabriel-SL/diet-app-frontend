import { Header } from '@/components/header';
import { userDataStore } from '@/store/data';
import { Text, View, StyleSheet } from 'react-native';

export default function Nutrition() {

    const user = userDataStore((state) => state.user);

    return (
        <Header 
            title='Minha dieta'
            step=''
        />
    );
}