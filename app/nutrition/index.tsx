import { Header } from '@/components/header';
import { userDataStore } from '@/store/data';
import { Text, View, StyleSheet, Pressable, Platform, StatusBar, ScrollView } from 'react-native';
import { api } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { Data } from '@/types/data';
import { Link } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

interface ResponseData {
    data: Data;
}


export default function Nutrition() {

    const user = userDataStore((state) => state.user);

    const { data, isFetching, error } = useQuery({
        queryKey: ['nutrition'],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error('Failed to load nutrition');
                }

                const response = await api.post<ResponseData>(`/create`, {
                    name: user.name,
                    weight: user.weight,
                    height: user.height,
                    age: user.age,
                    level: user.level,
                    gender: user.gender,
                    objective: user.objective
                });
                // const response = await api.get<ResponseData>(`/teste`);

                return response.data.data;
            } catch (err) {
                console.log(err);
            }
        }
    })

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando a IA...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar a dieta!</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable style={styles.buttonShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.scrollContent}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.nameText}>{data.nome}</Text>
                        <Text style={styles.objectiveText}>{data.objetivo}</Text>
                        <Text style={styles.label}>Refeições:</Text>

                        <ScrollView>
                            <View style={styles.cards}>
                                {data.refeicoes.map((snack) => (
                                    <View key={snack.nome} style={styles.card}>
                                        <View style={styles.cardHeader}>
                                            <Text style={styles.snackName}>{snack.nome}</Text>
                                            <Ionicons name="restaurant" size={16} color={colors.black} />
                                        </View>

                                        <View style={styles.cardContent}>
                                            <Feather name="clock" size={24} color={colors.black} />
                                            <Text>{snack.horario}</Text>
                                        </View>

                                        <Text style={styles.snackDetail}>Alimentos: </Text>
                                        {snack.alimentos.map(detail => (
                                             <Text key={detail}>{detail}</Text>
                                        ))}
                                    </View>
                                ))}
                            </View>

                            <View style={styles.supplements}>
                                <Text style={styles.supplementName}>Dica de suplementos:</Text>
                                {data.suplementos.map(suplement => (
                                     <Text key={suplement}>- {suplement}</Text>
                                ))}
                            </View>

                            <Link href="/" asChild>
                                <Pressable style={styles.button}>
                                    <Text style={styles.buttonText}>Gerar nova dieta</Text>
                                </Pressable> 
                            </Link>
                        </ScrollView>
                    </>
                )}
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex:1,
        backgroundColor: colors.background, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        color: colors.white,
        marginBottom: 8,
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight! + 34 : 60,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 30,
        color: colors.background,
        fontWeight: 'bold'
    },
    buttonShare: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 8,
    },
    buttonShareText: {
        color: colors.white,
        fontSize: 16
    },
    scrollContent: {
        paddingHorizontal: 16,
        flex: 1
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white
    },
    objectiveText: {
        fontSize: 18,
        color: colors.white,
        marginBottom: 24
    },
    label: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    cards: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 4,
        gap: 8
    },
    card: {
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        padding: 8,
        borderRadius: 8
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    snackName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    snackDetail: {
      fontSize: 16,
      marginBottom: 4,
      marginTop: 14 
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    supplements: {
        backgroundColor: colors.white,
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 20
    },
    supplementName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.blue,
        padding: 16,
        borderRadius: 8,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
});