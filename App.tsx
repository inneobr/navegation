import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import * as NavigationBar from 'expo-navigation-bar';

import { drizzle } from "drizzle-orm/expo-sqlite";
import { Alert, StatusBar } from "react-native";

import migrations from "./drizzle/migrations";
import Routes from "./src/routes";
import { useTheme } from "@/customs";

const DATABASE_NAME = "database.db";

const expoDB = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDB);

export default function App() {
  NavigationBar.setBackgroundColorAsync('#18181B');

  const { error } = useMigrations(db, migrations);
  if(error){ 
   Alert.alert("Atenção!", `Leitura tabelas: ${error.message}`);
   return error;
  }

  const theme = useTheme();

  return (
    <SQLiteProvider databaseName={ DATABASE_NAME }>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content' }  backgroundColor={theme.base}/>
      <Routes />
    </SQLiteProvider>
  );
}