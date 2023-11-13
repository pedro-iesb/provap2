import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import CadastrarFuncionario from "../screens/CadastrarFuncionario";
import { NavigationContainer } from "@react-navigation/native";
import Cadastrarcardapio from "../screens/Cadastrarcardapio";

const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={Home} />
                <Stack.Screen name="Funcionarios" component={CadastrarFuncionario} />
                <Stack.Screen name="cardapio" component={Cadastrarcardapio} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}