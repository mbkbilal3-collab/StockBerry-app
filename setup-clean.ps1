Write-Host "🧹 Cleaning old files..." -ForegroundColor Yellow

# Delete node_modules folder
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ node_modules deleted"
} else {
    Write-Host "ℹ️ node_modules not found"
}

# Delete package-lock.json if exists
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "✅ package-lock.json deleted"
} else {
    Write-Host "ℹ️ package-lock.json not found"
}

# Clear npm cache
Write-Host "🗑 Clearing npm cache..."
npm cache clean --force

# Install dependencies
Write-Host "📦 Installing dependencies (legacy peer deps mode)..."
npm install --legacy-peer-deps --verbose

Write-Host "🎉 Done! Now run: npx expo start -c" -ForegroundColor Green