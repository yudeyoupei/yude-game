# 使用base64创建PNG文件 - 绕过编码问题
$basePath = "C:\Users\Administrator\Desktop\页游\eggy"

# PNG图片的base64数据 (64x64纯色圆形PNG)
# 格式: [R, G, B] -> base64 PNG

# 定义7个缺失元素及其颜色
$elements = @(
    @{Name="光"; R=255; G=255; B=100}
    @{Name="暗"; R=50; G=50; B=80}
    @{Name="金"; R=255; G=215; B=0}
    @{Name="岩"; R=180; G=140; B=100}
    @{Name="星"; R=255; G=200; B=255}
    @{Name="风"; R=180; G=220; B=200}
    @{Name="机器"; R=150; G=150; B=170}
)

# 简化的PNG生成函数 (创建纯色正方形)
function Create-SimplePNG {
    param($width, $height, $r, $g, $b)
    
    # PNG signature
    $signature = [byte[]](0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A)
    
    # CRC32 function
    function Get-CRC32 {
        param($data)
        $crcTable = @()
        for ($n = 0; $n -lt 256; $n++) {
            $c = $n
            for ($k = 0; $k -lt 8; $k++) {
                if ($c -band 1) { $c = 0xEDB88320 -bxor ($c -shr 1) }
                else { $c = $c -shr 1 }
            }
            $crcTable += $c
        }
        
        $crc = 0xFFFFFFFF
        foreach ($byte in $data) {
            $crc = $crcTable[($crc -bxor $byte) -band 0xFF] -bxor ($crc -shr 8)
        }
        return ($crc -bxor 0xFFFFFFFF) -band 0xFFFFFFFF
    }
    
    function New-Chunk {
        param($type, $data)
        $len = [BitConverter]::GetBytes([uint32]$data.Length)
        [Array]::Reverse($len)
        $typeData = [Text.Encoding]::ASCII.GetBytes($type) + $data
        $crc = Get-CRC32 $typeData
        $crcBytes = [BitConverter]::GetBytes([uint32]$crc)
        [Array]::Reverse($crcBytes)
        return $len + $typeData + $crcBytes
    }
    
    # IHDR
    $ihdrData = [byte[]]@(
        ($width -shr 24) -band 0xFF, ($width -shr 16) -band 0xFF, ($width -shr 8) -band 0xFF, $width -band 0xFF,
        ($height -shr 24) -band 0xFF, ($height -shr 16) -band 0xFF, ($height -shr 8) -band 0xFF, $height -band 0xFF,
        8, 2, 0, 0, 0
    )
    $ihdr = New-Chunk "IHDR" $ihdrData
    
    # Image data (raw RGB)
    $rawData = New-Object System.Collections.ArrayList
    for ($y = 0; $y -lt $height; $y++) {
        [void]$rawData.Add(0)  # filter byte
        for ($x = 0; $x -lt $width; $x++) {
            [void]$rawData.Add($r)
            [void]$rawData.Add($g)
            [void]$rawData.Add($b)
        }
    }
    
    # Compress with DeflateStream
    $ms = New-Object System.IO.MemoryStream
    $ds = New-Object System.IO.Compression.DeflateStream($ms, [System.IO.Compression.CompressionMode]::Compress)
    $ds.Write($rawData.ToArray(), 0, $rawData.Count)
    $ds.Close()
    $compressed = $ms.ToArray()
    $idat = New-Chunk "IDAT" $compressed
    
    # IEND
    $iend = New-Chunk "IEND" (New-Object byte[] 0)
    
    return $signature + $ihdr + $idat + $iend
}

# 生成49个文件
$done = 0
foreach ($elem in $elements) {
    for ($stage = 1; $stage -le 7; $stage++) {
        $filename = "$($elem.Name)$stage.png"
        $filepath = Join-Path $basePath $filename
        
        # 创建64x64 PNG
        $pngData = Create-SimplePNG -width 64 -height 64 -r $elem.R -g $elem.G -b $elem.B
        
        [System.IO.File]::WriteAllBytes($filepath, $pngData)
        
        $done++
        Write-Output "Created: $filename"
    }
}

Write-Output ""
Write-Output "Total: $done files created"
