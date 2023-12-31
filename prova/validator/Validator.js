import * as Yup from 'yup'

const FuncionarioValidator =  Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    sobreNome: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email().required('Campo obrigatório!'),
    salario: Yup.string().required('Campo obrigatório!'),
    numero: Yup.string().required('Campo obrigatório!'),
    cep: Yup.string().required('Campo obrigatório!'),
})


const UsuarioValidator =  Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    sobreNome: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string().required('Campo obrigatório!'),
    email: Yup.string().email().required('Campo obrigatório!'),
    numero: Yup.string().required('Campo obrigatório!'),
    idade: Yup.string().required('Campo obrigatório!'),
})

export {FuncionarioValidator, UsuarioValidator}