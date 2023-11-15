import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GerarIdÚnico from '../components/GerarIdÚnico'
import { Formik } from 'formik'
import { Button, Text, TextInput } from 'react-native-paper'
import {FuncionarioValidator} from '../validator/Validator'
import CadastrarFuncionarioStyle from '../styles/CadastrarFuncionarioStyle'
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'

export default function CadastrarFuncionario(props) {
    const navigation = useNavigation()
    const { acao } = props.route.params
    const [funcionarios, setFuncionarios] = useState([])

    async function carregarFuncionario() {
        const funci = await AsyncStorage.getItem('funcionarios')
        const funciStorage = funci ? JSON.parse(funci) : []
        setFuncionarios(funciStorage)
    }

    useEffect(() => {
        carregarFuncionario()
    }, [])

    async function salvarFuncionario(funcionario) {
        try {

            let listaFuncionarios = funcionarios
            funcionario.id = GerarIdÚnico()
            listaFuncionarios.push(funcionario)
            await AsyncStorage.setItem('funcionarios', JSON.stringify(listaFuncionarios))
            setFuncionarios(listaFuncionarios)

            acao()
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }

    console.log(funcionarios)
    return (
        <View style={CadastrarFuncionarioStyle.container}>
            <Formik
                initialValues={{ nome: "", sobreNome: "", cpf: "", salario: "", email: "", numero: "" }}
                validationSchema={FuncionarioValidator}
                onSubmit={values => salvarFuncionario(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                    <>
                        <View style={CadastrarFuncionarioStyle.containerInput}>


                            <TextInput
                                mode="outlined"
                                label='Nome'
                                onChangeText={handleChange("nome")}
                                onBlur={handleBlur("nome")}
                                value={values.nome}
                                error={errors.nome ? true : false}
                            />

                            {touched.nome && errors.nome && (
                                <Text variant='labelLarge'>{errors.nome}</Text>
                            )}

                            <TextInput
                                mode="outlined"
                                label='Sobre Nome'
                                onChangeText={handleChange("sobreNome")}
                                onBlur={handleBlur("sobreNome")}
                                value={values.sobreNome}
                                error={errors.sobreNome ? true : false}
                            />

                            {touched.sobreNome && errors.sobreNome && (
                                <Text variant='labelLarge'>{errors.sobreNome}</Text>
                            )}

                            <TextInput
                                mode="outlined"
                                label='Cpf'
                                onChangeText={handleChange("cpf")}
                                onBlur={handleBlur("cpf")}
                                value={values.cpf}
                                error={errors.cpf ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type='cpf'
                                    />
                                }
                            />

                            {touched.cpf && errors.cpf && (
                                <Text variant='labelLarge'>{errors.cpf}</Text>
                            )}
                            <TextInput
                                mode="outlined"
                                label='Email'
                                keyboardType='email-address'
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                error={errors.email ? true : false}


                            />

                            {touched.email && errors.email && (
                                <Text variant='labelLarge'>{errors.email}</Text>
                            )}
                            <TextInput
                                mode="outlined"
                                label='Salário'
                                keyboardType='numeric'
                                onChangeText={handleChange("salario")}
                                onBlur={handleBlur("salario")}
                                value={values.salario}
                                error={errors.salario ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type="money"
                                    />
                                }
                            />

                            {touched.salario && errors.salario && (
                                <Text variant='labelLarge'>{errors.salario}</Text>
                            )}
                            <TextInput
                                mode="outlined"
                                label='Telefone Celular'
                                keyboardType='numeric'
                                onChangeText={handleChange("numero")}
                                onBlur={handleBlur("numero")}
                                value={values.numero}
                                error={errors.numero ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type='cel-phone'
                                    />
                                }
                            />

                            {touched.numero && errors.numero && (
                                <Text variant='labelLarge'>{errors.numero}</Text>
                            )}
                            <TextInput
                                mode="outlined"
                                label='Cep'
                                keyboardType='numeric'
                                onChangeText={handleChange("cep")}
                                onBlur={handleBlur("cep")}
                                value={values.cep}
                                error={errors.cep ? true : false}
                                render={props =>
                                    <TextInputMask
                                        {...props}
                                        type={'custom'}
                                        options={{

                                            mask: '99999-999'
                                        }}
                                    />
                                }
                            />

                            {touched.cep && errors.cep && (
                                <Text variant='labelLarge'>{errors.cep}</Text>
                            )}
                        </View>

                        <View>
                            <Button mode='outlined' onPress={handleSubmit}>Salvar</Button>
                        </View>

                    </>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({})