import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GerarIdÚnico from '../components/GerarIdÚnico'
import { Field, Formik } from 'formik'
import { Text, TextInput } from 'react-native-paper'
import FuncionarioValidator from '../validator/Validator'
import CadastrarFuncionarioStyle from '../styles/CadastrarFuncionarioStyle'
import { Picker } from '@react-native-picker/picker'

export default function Cadastrarcardapio() {
    const [cardapios, setCardapios] = useState([])

    async function carregarFuncionario() {
        const funci = await AsyncStorage.getItem('cardapio')
        const funciStorage = funci ? JSON.parse(funci) : []
        setCardapios(funciStorage)
    }

    useEffect(() => {
        carregarFuncionario()
    }, [])

    async function salvarFuncionario(cardapio) {
        try {

            let listaFuncionarios = cardapios
            cardapio.id = GerarIdÚnico()
            listaFuncionarios.push(cardapio)
            await AsyncStorage.setItem('cardapio', JSON.stringify(listaFuncionarios))
            setCardapios(listaFuncionarios)

            // navigator.goBack()

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={CadastrarFuncionarioStyle.container}>
            <Formik
                initialValues={{ nome: "", sobreNome: "", cpf: "", salario: "", cep: "" }}
                validationSchema={FuncionarioValidator}
                onSubmit={values => salvarFuncionario(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={CadastrarFuncionarioStyle.containerInput}>

                            {touched.nome && errors.nome && (
                                <Text variant='labelLarge'>{errors.nome}</Text>
                            )}

                            <Field name="sucos">
                                {({ field, form }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(itemValue, itemIndex) => form.setFieldValue(field.name, itemValue)}
                                    >
                                        <Picker.Item label="selecione seu suco" value="suco" />
                                        <Picker.Item label="laranja" value="laranja" />
                                        <Picker.Item label="maracuja" value="maracuja" />
                                        <Picker.Item label="abacaxi" value="abacaxi" />
                                        <Picker.Item label="morango" value="morango" />
                                    </Picker>
                                )}
                            </Field>

                            <Field name="pratos">
                                {({ field, form }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(itemValue, itemIndex) => form.setFieldValue(field.name, itemValue)}
                                    >
                                        <Picker.Item label="selecione seu prato principal" value="prato" />
                                        <Picker.Item label="file a parmegiana" value="parmegiana" />
                                        <Picker.Item label="file com fritas" value="fritas" />
                                    </Picker>
                                )}
                            </Field>

                            <Field name="sobremesas">
                                {({ field, form }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(itemValue, itemIndex) => form.setFieldValue(field.name, itemValue)}
                                    >
                                        <Picker.Item label="selecione sua sobremesa" value="sobremesa" />
                                        <Picker.Item label="sorvete de chocolate" value="chocolate" />
                                        <Picker.Item label="churros com doce de leite" value="churros" />
                                        <Picker.Item label="milkshake" value="milkshake" />
                                    </Picker>
                                )}
                            </Field>
                            <Field name="entradas">
                                {({ field, form }) => (
                                    <Picker
                                        selectedValue={field.value}
                                        onValueChange={(itemValue, itemIndex) => form.setFieldValue(field.name, itemValue)}
                                    >
                                        <Picker.Item label="selecione sua entrada" value="entrada" />
                                        <Picker.Item label="queijo bufalo" value="queijo" />
                                        <Picker.Item label="pão ao molho de ervas" value="pão" />
                                        <Picker.Item label="croquetes" value="croquetes" />
                                    </Picker>
                                )}
                            </Field>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({})