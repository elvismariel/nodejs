import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/main';

const RootStack = createStackNavigator({
    ScreenOne: { 
        screen: Main,
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#DA552F"
            },
            headerTintColor: "#FFF"
        }
    },
});

const AppContainer = createAppContainer(RootStack);

// Now AppContainer is the main component for React to render
export default AppContainer;