# PowerShell脚本生成蛋蛋宠物占位图片
# 保存为: C:\Users\Administrator\Desktop\页游\generate_eggy.ps1

Add-Type -AssemblyName System.Drawing

$basePath = "C:\Users\Administrator\Desktop\页游\eggy"

# 创建目录
if (-not (Test-Path $basePath)) {
    New-Item -ItemType Directory -Force -Path $basePath | Out-Null
}

# 12个元素及其颜色
$elementsColors = @{
    "火" = [System.Drawing.Color]::FromArgb(255, 100, 80)
    "水" = [System.Drawing.Color]::FromArgb(80, 150, 255)
    "草" = [System.Drawing.Color]::FromArgb(100, 200, 100)
    "电" = [System.Drawing.Color]::FromArgb(255, 240, 80)
    "冰" = [System.Drawing.Color]::FromArgb(180, 230, 255)
    "格斗" = [System.Drawing.Color]::FromArgb(220, 150, 100)
    "毒" = [System.Drawing.Color]::FromArgb(180, 100, 255)
    "地面" = [System.Drawing.Color]::FromArgb(200, 160, 100)
    "飞行" = [System.Drawing.Color]::FromArgb(140, 190, 255)
    "精神" = [System.Drawing.Color]::FromArgb(255, 120, 220)
    "恶" = [System.Drawing.Color]::FromArgb(100, 100, 100)
    "龙" = [System.Drawing.Color]::FromArgb(255, 180, 60)
}

$imgSize = 64
$count = 0

foreach ($elem in $elementsColors.Keys) {
    $color = $elementsColors[$elem]
    
    for ($stage = 1; $stage -le 7; $stage++) {
        # 创建位图
        $bitmap = New-Object System.Drawing.Bitmap($imgSize, $imgSize)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        
        # 设置高质量
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        
        # 填充背景色
        $brush = New-Object System.Drawing.SolidBrush($color)
        $graphics.FillEllipse($brush, 2, 2, $imgSize - 4, $imgSize - 4)
        
        # 添加边框效果
        $darkerColor = [System.Drawing.Color]::FromArgb(
            [int]($color.R * 0.7),
            [int]($color.G * 0.7),
            [int]($color.B * 0.7)
        )
        $darkBrush = New-Object System.Drawing.SolidBrush($darkerColor)
        $pen = New-Object System.Drawing.Pen($darkBrush, 2)
        $graphics.DrawEllipse($pen, 2, 2, $imgSize - 5, $imgSize - 5)
        
        # 添加高光
        $lightColor = [System.Drawing.Color]::FromArgb(100, 255, 255, 255)
        $lightBrush = New-Object System.Drawing.SolidBrush($lightColor)
        $graphics.FillEllipse($lightBrush, 12, 12, 15, 15)
        
        # 保存图片
        $filename = "$elem$stage.png"
        $filepath = Join-Path $basePath $filename
        $bitmap.Save($filepath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # 清理
        $graphics.Dispose()
        $bitmap.Dispose()
        $brush.Dispose()
        $darkBrush.Dispose()
        $pen.Dispose()
        $lightBrush.Dispose()
        
        $count++
        Write-Host "已生成: $filename"
    }
}

Write-Host ""
Write-Host "完成! 共生成 $count 个图片文件"
