@echo off
echo 🚀 Cleaning old caches and node_modules...

rmdir /s /q node_modules
rmdir /s /q .expo
rmdir /s /q .expo-shared
rmdir /s /q .parcel-cache
rmdir /s /q .cache

echo 📦 Reinstalling dependencies...
npm install

echo 🚀 Starting Expo in LAN mode...
set EXPO_NO_DOCTOR=1
set REACT_NATIVE_PACKAGER_HOSTNAME=10.120.153.171
npx expo start --host lan -c

pause
