# Navigation

This folder contains the navigation configuration and navigators for the application. It includes the setup for stack, tab, drawer navigators, and any custom navigators used.

## Installation Steps

Follow these steps to set up navigation in your React Native application:

### 1. Install Dependencies

Run the following command to install the necessary dependencies:

```sh
yarn add @react-navigation/native react-native-screens react-native-safe-area-context
```

`react-native-screens` package requires one additional configuration step to properly work on Android devices. Edit `MainActivity.kt` or `MainActivity.java` file which is located under `android/app/src/main/java/<your package name>/`

```java
package com.example

import android.os.Bundle; // Add this import at the top

class MainActivity: ReactActivity() {
  // ...
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
  // ...
}

```

Install additional packages needed for stack navigation and gesture handling:

```sh
yarn add @react-navigation/stack react-native-gesture-handler @react-native-masked-view/masked-view
```

Install the packages needed for drawer navigation, bottom tabs and animations:

```sh
yarn add @react-navigation/drawer @react-navigation/bottom-tabs react-native-reanimated
```

Each time new screen added you have to update two files -> route-config.ts

NavigationService can be used outside of react scope for navigation purpose.

AppNavigator.ts -> it is main component which will include all stack naviagtions.
