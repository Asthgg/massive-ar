/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabBarIcon from './TabBarIcon';

export default ({state, descriptors, navigation}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#696052',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map(
        (route: {key: string | number; name: any}, index: any) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingBottom: 20,
                backgroundColor: '#403B35',
              }}>
              <TabBarIcon
                icon={options.tabBarIcon}
                color={isFocused ? '#DEA55F' : '#5E5D5A'}
              />
              <Text
                style={{
                  color: isFocused ? '#DEA55F' : '#5E5D5A',
                  top: 5,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};
