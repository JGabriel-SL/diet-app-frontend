import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select } from "@/components/select";

const schema = z.object({
    level: z.string().min(1, {message: "O nível é obrigatório!"}),
    objective: z.string().min(1, {message: "O objetivo é obrigatório!"}),
    gender: z.string().min(1, {message: "O gênero é obrigatório!"}),
});

type FormData = z.infer<typeof schema>;

export default function Create() {

    const { control, handleSubmit, formState: { errors, isValid }} =  useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const genderOptions = [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Outro', value: 'O' }
    ]

    return (
        <View style={styles.container}>
            <Header 
                step="Passo 2" 
                title="Finalizando dieta" 
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo: </Text>
                <Select 
                   name="gender"
                   control={control}
                   options={genderOptions}
                   placeholder="Selecione o seu sexo"
                   error={errors.gender?.message}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
});