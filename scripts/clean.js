
/**
 * scripts/clean.js
 * Cleans caches and temporary files to ensure a fresh build.
 */
import { execSync } from 'child_process';
import path from 'path';
import { sync } from 'rimraf';

const clean = () => {
  try {
    console.log('Cleaning caches and temporary files...');

    // Remove node_modules and lock files
    sync(path.resolve(__dirname, '..', 'node_modules'));
    sync(path.resolve(__dirname, '..', 'package-lock.json'));
    sync(path.resolve(__dirname, '..', 'yarn.lock'));

    // Clean React Native cache
    execSync('npx react-native clean', { stdio: 'inherit' });

    // Clean Metro cache
    sync(path.resolve(__dirname, '..', 'metro-cache'));

    // Clean iOS build artifacts
    sync(path.resolve(__dirname, '..', 'ios/build'));
    sync(path.resolve(__dirname, '..', 'ios/Pods'));
    sync(path.resolve(__dirname, '..', 'ios/Podfile.lock'));

    // Clean Android build artifacts
    sync(path.resolve(__dirname, '..', 'android/build'));
    sync(path.resolve(__dirname, '..', 'android/app/build'));

    console.log('Cleanup completed successfully.');
  } catch (error) {
    console.error(`Cleanup failed: ${error.message}`);
    process.exit(1);
  }
};

// Run with: node scripts/clean.js
clean();
