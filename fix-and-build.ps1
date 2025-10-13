Write-Host "🧹 Running clean expo prebuild..."
npx expo prebuild --platform android --clean

# Step 2: Patch expo-system-ui build.gradle
$esuGradle = "node_modules\expo-system-ui\android\build.gradle"
if (Test-Path $esuGradle) {
    $esuContent = Get-Content $esuGradle -Raw
    if ($esuContent -notmatch "namespace") {
        Write-Host "⚙️ Adding namespace + SDK block to expo-system-ui build.gradle..."
        $newContent = @()
        foreach ($line in Get-Content $esuGradle) {
            $newContent += $line
            if ($line -match "id 'com.android.library'") {
                $newContent += "    id 'org.jetbrains.kotlin.android'"
            }
            if ($line -match "android {") {
                $newContent += '    namespace "expo.modules.systemui"'
                $newContent += "    compileSdkVersion 36"
                $newContent += "    defaultConfig {"
                $newContent += "        minSdkVersion 24"
                $newContent += "        targetSdkVersion 36"
                $newContent += "    }"
            }
        }
        $newContent | Set-Content $esuGradle -Encoding UTF8
        Write-Host "✅ expo-system-ui build.gradle patched"
    } else {
        Write-Host "✅ expo-system-ui build.gradle already has namespace"
    }
} else {
    Write-Host "⚠️ expo-system-ui build.gradle not found!"
}

# Step 3: Patch android/settings.gradle for autolinking
$settingsGradle = "android\settings.gradle"
if (Test-Path $settingsGradle) {
    $content = Get-Content $settingsGradle -Raw
    if ($content -notmatch "expoAutolinking.useExpoModules()") {
        Add-Content $settingsGradle "`n// Expo autolinking patch`nexpoAutolinking.useExpoModules()`nexpoAutolinking.useExpoVersionCatalog()"
        Write-Host "✅ settings.gradle patched for Expo autolinking"
    } else {
        Write-Host "✅ settings.gradle already has autolinking"
    }
} else {
    Write-Host "⚠️ settings.gradle not found!"
}

# Step 4: Go to android folder
Set-Location "android"

# Step 5: Run Gradle build with debug logs
Write-Host "🚀 Starting Gradle build with debug logs..."
.\gradlew.bat assembleDebug --stacktrace --info | Tee-Object -FilePath "..\build_debug_log.txt"

# Step 6: Back to project root
Set-Location ".."

Write-Host "✅ Build finished. Full debug log saved at build_debug_log.txt"
