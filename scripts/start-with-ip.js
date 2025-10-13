// scripts/start-with-ip.js
const { execSync } = require("child_process");
const os = require("os");

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

const ip = getLocalIp();
console.log(`🚀 Starting Expo with IP: ${ip}\n`);

const isWin = process.platform === "win32";

if (isWin) {
  // Windows ke liye
  execSync(`set EXPO_DEVTOOLS_LISTEN_ADDRESS=${ip} && npx expo start --host lan -c`, { stdio: "inherit", shell: true });
} else {
  // Mac/Linux ke liye
  execSync(`EXPO_DEVTOOLS_LISTEN_ADDRESS=${ip} npx expo start --host lan -c`, { stdio: "inherit", shell: true });
}