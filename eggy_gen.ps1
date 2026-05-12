Add-Type -AssemblyName System.Drawing

$basePath = "C:\Users\Administrator\Desktop\页游\eggy"
if (-not (Test-Path $basePath)) {
    New-Item -ItemType Directory -Force -Path $basePath | Out-Null
}

# 使用数组避免编码问题
$elements = @(
    @{N="火"; R=255; G=100; B=80},
    @{N="水"; R=80; G=150; B=255},
    @{N="草"; R=100; G=200; B=100},
    @{N="电"; R=255; G=240; B=80},
    @{N="冰"; R=180; G=230; B=255},
    @{N="格斗"; R=220; G=150; B=100},
    @{N="毒"; R=180; G=100; B=255},
    @{N="地面"; R=200; G=160; B=100},
    @{N="飞行"; R=140; G=190; B=255},
    @{N="精神"; R=255; G=120; B=220},
    @{N="恶"; R=100; G=100; B=100},
    @{N="龙"; R=255; G=180; B=60}
)

$size = 64
$done = 0

foreach ($e in $elements) {
    for ($s = 1; $s -le 7; $s++) {
        $bmp = New-Object System.Drawing.Bitmap($size, $size)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        
        $c = [System.Drawing.Color]::FromArgb($e.R, $e.G, $e.B)
        $br = New-Object System.Drawing.SolidBrush($c)
        $g.FillEllipse($br, 2, 2, $size - 4, $size - 4)
        
        $dc = [System.Drawing.Color]::FromArgb([int]($c.R * 0.6), [int]($c.G * 0.6), [int]($c.B * 0.6))
        $dbr = New-Object System.Drawing.SolidBrush($dc)
        $pen = New-Object System.Drawing.Pen($dbr, 2)
        $g.DrawEllipse($pen, 2, 2, $size - 5, $size - 5)
        
        $hc = [System.Drawing.Color]::FromArgb(80, 255, 255, 255)
        $hbr = New-Object System.Drawing.SolidBrush($hc)
        $g.FillEllipse($hbr, 10, 10, 12, 12)
        
        $fn = "$($e.N)$s.png"
        $fp = Join-Path $basePath $fn
        $bmp.Save($fp, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $g.Dispose()
        $bmp.Dispose()
        $br.Dispose()
        $pen.Dispose()
        $hbr.Dispose()
        
        $done++
        Write-Output "Done: $fn"
    }
}

Write-Output ""
Write-Output "Total: $done images"
