
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import AppVectorIcon, {IconType} from './AppVectorIcon';
import AppText from './AppText';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void; // Optional back button action
  backgroundColor?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onBackPress,
  backgroundColor = '#fff',
}) => {
  const navigation = useAppNavigation();

  // Default behavior for the back button (goes back to previous screen)
  const handleBackPress = onBackPress ?? (() => navigation.goBack());

  return (
    <View style={[styles.header, {backgroundColor}]}>
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <AppVectorIcon
          type={IconType.MaterialIcons}
          name="arrow-back"
          size={24}
          color="#000"
        />
      </Pressable>
      <AppText text={title} fontWeight="bold" fontSize={18} />
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.4,
    marginBottom: 8,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  placeholder: {
    position: 'absolute',
    right: 16,
    width: 24, // Placeholder width
  },
});

export default AppHeader;
