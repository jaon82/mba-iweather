import { ActivityIndicator, View } from "react-native";

import { theme } from "@styles/theme";
import { styles } from "./styles";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator testID="loading" color={theme.colors.blue_light} />
    </View>
  );
}
