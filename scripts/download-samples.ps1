# PowerShell script to download sample audio files
$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path $scriptPath -Parent
$audioDir = Join-Path $scriptDir "..\public\audio"

# Create audio directory if it doesn't exist
if (!(Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force
}

# Sample royalty-free music URLs
$tracks = @(
    @{
        url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        output = "track1.mp3"
    },
    @{
        url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        output = "track2.mp3"
    },
    @{
        url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        output = "track3.mp3"
    },
    @{
        url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        output = "track4.mp3"
    }
)

# Download each track
foreach ($track in $tracks) {
    $outputPath = Join-Path $audioDir $track.output
    Write-Host "Downloading $($track.url) to $outputPath"
    
    try {
        Invoke-WebRequest -Uri $track.url -OutFile $outputPath
        Write-Host "Successfully downloaded $($track.output)"
    } catch {
        Write-Host "Failed to download $($track.url): $_" -ForegroundColor Red
    }
}

Write-Host "Download complete! Files are in: $audioDir" -ForegroundColor Green
