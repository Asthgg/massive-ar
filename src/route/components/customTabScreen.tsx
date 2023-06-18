type CustomTabScreen = {
  iconName: string;
  title: string;
  onPress?: object;
};

export default ({iconName, title, onPress}: CustomTabScreen) => ({
  tabBarIcon: iconName,
  tabBarLabel: title,
  tabPress: onPress,
  header: () => null,
});
