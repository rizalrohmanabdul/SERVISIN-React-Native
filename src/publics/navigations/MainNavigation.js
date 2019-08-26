import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Login from '../../screens/auth/login'
import Welcome from '../../screens/Welcome'
import ChooseRole from '../../screens/ChooseRole';
const stackNavigator = createStackNavigator({

    ChooseRole: {
        screen: ChooseRole,
        navigationOptions: {
            header: null
        }
    }
})

const authNavigator = createStackNavigator({
    Login
})

const appNavigator = createSwitchNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null
        }
    },
    Auth:{
        screen:authNavigator,
    },
    App: {
        screen: stackNavigator
    }
})

export default createAppContainer(appNavigator)