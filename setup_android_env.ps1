$SdkPath = "C:\Users\vaibh\AppData\Local\Android\Sdk"
$Env:ANDROID_HOME = $SdkPath
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $SdkPath, "User")

$AddToPath = @(
    "$SdkPath\platform-tools",
    "$SdkPath\emulator",
    "$SdkPath\tools",
    "$SdkPath\tools\bin"
)

$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
foreach ($Path in $AddToPath) {
    if ($CurrentPath -notlike "*$Path*") {
        $CurrentPath = "$CurrentPath;$Path"
        Write-Host "Adding $Path to User Path"
    } else {
        Write-Host "$Path already in User Path"
    }
}
[Environment]::SetEnvironmentVariable("Path", $CurrentPath, "User")

# Update current session path for immediate use
$Env:Path = $CurrentPath + ";" + $Env:Path

# Verify
Write-Host "Verifying configuration..."
adb version
emulator -list-avds
