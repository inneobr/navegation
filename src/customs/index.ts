import { useColorScheme } from 'react-native';

export function useTheme() {
    let colorScheme = useColorScheme();
    let color = colorScheme === 'dark'? true : false;
    return  {
        base:  color ? 'rgb(24, 24, 27)' : 'rgb( 35, 180, 201)',
        body:  color ? 'rgb(0,  0,  0 )' : 'rgb(160, 160, 160)',
        card:  color ? 'rgb(39, 39, 42)' : 'rgb( 67, 199, 215)',
        shap:  color ? 'rgb(18, 18, 18)' : 'rgb(153, 203, 209)',

        font:  color ? 'rgb(255, 255, 255)' : 'rgb(  0,  0,    0)',
        tint:  color ? 'rgb(160, 160, 160)' : 'rgb( 39,  39,  42)',
        open:  color ? 'rgb(254, 85,  59 )' : 'rgb(255, 255, 255)',
        dark:  color
    }
}