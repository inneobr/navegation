import { useColorScheme } from 'react-native';

export function useTheme() {
    let colorScheme = useColorScheme();
    let color = colorScheme === 'dark'? true : false;
    return  {
        base:  color ? 'rgb(24, 24, 24)' : 'rgb(232, 239, 247)',
        body:  color ? 'rgb(54, 54, 54)' : 'rgb(246, 249, 254)',
        card:  color ? 'rgb(39, 39, 42)' : 'rgb(210, 229, 244)',
        shap:  color ? 'rgb(18, 18, 18)' : 'rgb(226, 233, 241)',

        font:  color ? 'rgb(255, 255, 255)' : 'rgb( 0,   0, 59)',
        tint:  color ? 'rgb(160, 160, 160)' : 'rgb(39,  39, 42)',
        open:  color ? 'rgb(254, 85,  59 )' : 'rgb(254, 85, 59 )',
        dark:  color
    }
}