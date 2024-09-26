import { Text, View, Image, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select } from "@/components/select";
import { userDataStore } from "@/store/data";
import { router } from "expo-router";

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

    const setPageTwo = userDataStore((state) => state.setPageTwo);
    
    function handleCreate(data: FormData) {
        setPageTwo({
            level: data.level,
            objective: data.objective,
            gender: data.gender
        })

        router.push('/nutrition')
        console.log(data)
    }

    const genderOptions = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
        { label: 'Outro', value: 'outro' }
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'sedentario' },
        { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'levemente ativo'},
        { label: 'Moderadamente ativo (exercícios 3 a 5 vezes)', value: 'moderamente ativo'},
        { label: 'Altamente ativo (exercícios 6 a 7 vezes)', value: 'altamente ativo'}
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'emagrecer' },
        { label: 'Hipertrofia', value: 'hipertrofia'},
        { label: 'Hipertrofia + Definição', value: 'hipertrofia e definição'},
        { label: 'Definição', value: 'definição'}
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

                <Text style={styles.label}>Selecione o nivel de atividade física: </Text>
                <Select 
                   name="level"
                   control={control}
                   options={levelOptions}
                   placeholder="Selecione o nível de atividade física"
                   error={errors.level?.message}
                />

                <Text style={styles.label}>Selecione seu objetivo: </Text>
                <Select 
                   name="objective"
                   control={control}
                   options={objectiveOptions}
                   placeholder="Selecione seu objetivo"
                   error={errors.objective?.message}
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
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
        marginBottom: 8,
        marginTop: 8,
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 12
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
});