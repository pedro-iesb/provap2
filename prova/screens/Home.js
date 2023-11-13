import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Card, IconButton, Modal, Portal, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const [funcionarios, setFuncionarios] = useState([])
    const [visible, setVisible] = useState(false)

    async function carregarFuncionario() {
        const funci = await AsyncStorage.getItem('funcionarios')
        const funciStorage = funci ? JSON.parse(funci) : []
        setFuncionarios(funciStorage)
    }

    useLayoutEffect(() => {
        carregarFuncionario()
    }, [])

    const shoeModal = () => setVisible(true)
    const hideModal = () => setVisible(false)

    const navigation = useNavigation()

    async function excluirFuncionarios(funcionariosExcluit) {
        const novaListaFuncionarios = funcionarios.filter(funcionarios => funcionarios.id !== funcionariosExcluit.id);
        await AsyncStorage.setItem('funcionarios', JSON.stringify(novaListaFuncionarios));
        setFuncionarios(novaListaFuncionarios);

        Toast.show({
            type: 'success',
            text1: 'Professor excluído com sucesso!'
        });
    }


    function novaListaCursos(cursosExcluir) {
        Alert.alert("Confirmação?", "Você realmente deseja excluir este cliente?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => excluirFuncionarios(cursosExcluir) }
            ]
        );
    }

    console.log(funcionarios)
    return (
        <>
            <View style={{ flex: 9, width: '100%', padding: 10 }}>
                <Text variant='headlineSmall' style={{ textAlign: 'center', marginBottom: 10 }}>Funcionarios</Text>
                <FlatList
                    data={funcionarios}
                    renderItem={({ item }) => (
                        <>

                            <Card mode='outlined' style={{ marginBottom: 10 }}>
                                <Card.Title title={item.nome + ' ' + item.sobreNome} subtitle={item.email} right={(props) => <IconButton {...props} icon="dots-vertical" mode='outlined' onPress={shoeModal} />} />
                            </Card>

                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 10, flexDirection: 'row', width: '100%', gap: 10}}>
                                    <Button mode='outlined' icon='account-edit'>Editar</Button>
                                    <Button mode='outlined' icon='trash-can'  onPress={() => novaListaCursos(item)}>Excluir</Button>
                                </Modal>
                            </Portal>
                        </>
                    )}
                />
            </View>
            <View style={{ flex: 1, width: '100%', height: 10, gap: 10, bottom: 0, position: 'fixed', alignItems: 'center' }}>
                <Text variant='labelLarge'>Selecione o tipo de cadastro</Text>

                <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                    <Button mode='outlined' onPress={() => navigation.navigate('Funcionarios', { acao: carregarFuncionario })}>Cadastro Funcionarios</Button>
                    <Button mode='outlined' onPress={() => navigation.navigate('cardapio')}>Cadastro cardapio</Button>
                </View>
            </View>


        </>
    )
}