Add-Type -AssemblyName System.Drawing

$basePath = "C:\Users\Administrator\Desktop\页游\eggy"

# 7个缺失元素
$missingElements = @(
    @{Display="光"; R=255; G=255; B=100}
    @{Display="暗"; R=50; G=50; B=80}
    @{Display="金"; R=255; G=215; B=0}
    @{Display="岩"; R=180; G=140; B=100}
    @{Display="星"; R=255; G=200; B=255}
    @{Display="风"; R=180; G=220; B=200}
    @{Display="机器"; R=150; G=150; B=170}
)

$size = 64
$done = 0

foreach ($elem in $missingElements) {
    for ($stage = 1; $stage -le 7; $stage++) {
        $filename = "$($elem.Display)$stage.png"
        $filepath = Join-Path $basePath $filename
        
        $bitmap = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        
        $color = [System.Drawing.Color]::FromArgb($elem.R, $elem.G, $elem.B)
        $brush = New-Object System.Drawing.SolidBrush($color)
        $graphics.FillEllipse($brush, 2, 2, $size - 4, $size - 4)
        
        $darkColor = [System.Drawing.Color]::FromArgb([int]($color.R * 0.6), [int]($color.G * 0.6), [int]($color.B * 0.6))
        $darkBrush = New-Object System.Drawing.SolidBrush($darkColor)
        $pen = New-Object System.Drawing.Pen($darkBrush, 2)
        $graphics.DrawEllipse($pen, 2, 2, $size - 5, $size - 5)
        
        $highlightColor = [System.Drawing.Color]::FromArgb(80, 255, 255, 255)
        $highlightBrush = New-Object System.Drawing.SolidBrush($highlightColor)
        $graphics.FillEllipse($highlightBrush, 10, 10, 12, 12)
        
        $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        $brush.Dispose()
        $pen.Dispose()
        $highlightBrush.Dispose()
        $darkBrush.Dispose()
        
        $done++
        Write-Output "Generated: $filename"
    }
}

Write-Output ""
Write-Output "Total: $done images generated"
