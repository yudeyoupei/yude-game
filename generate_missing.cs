using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

class Program
{
    static void Main()
    {
        string basePath = @"C:\Users\Administrator\Desktop\页游\eggy";
        
        // 7个缺失元素
        var elements = new[] {
            new { Display = "光", R = 255, G = 255, B = 100 },
            new { Display = "暗", R = 50, G = 50, B = 80 },
            new { Display = "金", R = 255, G = 215, B = 0 },
            new { Display = "岩", R = 180, G = 140, B = 100 },
            new { Display = "星", R = 255, G = 200, B = 255 },
            new { Display = "风", R = 180, G = 220, B = 200 },
            new { Display = "机器", R = 150, G = 150, B = 170 }
        };
        
        int size = 64;
        int done = 0;
        
        foreach (var elem in elements)
        {
            for (int stage = 1; stage <= 7; stage++)
            {
                string filename = $"{elem.Display}{stage}.png";
                string filepath = Path.Combine(basePath, filename);
                
                using (Bitmap bitmap = new Bitmap(size, size))
                {
                    using (Graphics graphics = Graphics.FromImage(bitmap))
                    {
                        graphics.SmoothingMode = SmoothingMode.AntiAlias;
                        
                        Color color = Color.FromArgb(elem.R, elem.G, elem.B);
                        using (Brush brush = new SolidBrush(color))
                        {
                            graphics.FillEllipse(brush, 2, 2, size - 4, size - 4);
                        }
                        
                        Color darkColor = Color.FromArgb(
                            (int)(color.R * 0.6),
                            (int)(color.G * 0.6),
                            (int)(color.B * 0.6)
                        );
                        using (Brush darkBrush = new SolidBrush(darkColor))
                        using (Pen pen = new Pen(darkBrush, 2))
                        {
                            graphics.DrawEllipse(pen, 2, 2, size - 5, size - 5);
                        }
                        
                        Color highlightColor = Color.FromArgb(80, 255, 255, 255);
                        using (Brush highlightBrush = new SolidBrush(highlightColor))
                        {
                            graphics.FillEllipse(highlightBrush, 10, 10, 12, 12);
                        }
                    }
                    
                    bitmap.Save(filepath, System.Drawing.Imaging.ImageFormat.Png);
                }
                
                done++;
                Console.WriteLine($"Generated: {filename}");
            }
        }
        
        Console.WriteLine();
        Console.WriteLine($"Total: {done} images generated");
    }
}
