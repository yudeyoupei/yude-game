// 使用Node.js生成PNG图片 - 蛋蛋宠物占位图
// 运行: node C:\Users\Administrator\Desktop\页游\generate_eggy.js

const fs = require('fs');
const path = require('path');

// 基础路径
const basePath = r"C:\Users\Administrator\Desktop\页游\eggy";

// 创建目录
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
}

// 12个元素及其颜色
const elementsColors = {
    "火": [255, 100, 80],
    "水": [80, 150, 255],
    "草": [100, 200, 100],
    "电": [255, 240, 80],
    "冰": [180, 230, 255],
    "格斗": [220, 150, 100],
    "毒": [180, 100, 255],
    "地面": [200, 160, 100],
    "飞行": [140, 190, 255],
    "精神": [255, 120, 220],
    "恶": [100, 100, 100],
    "龙": [255, 180, 60],
};

// 创建简单PNG的函数
function createSimplePNG(width, height, r, g, b) {
    // PNG签名
    const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    // CRC32表
    const crcTable = [];
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        crcTable[n] = c;
    }
    
    function crc32(buf) {
        let crc = 0xffffffff;
        for (let i = 0; i < buf.length; i++) {
            crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
        }
        return (crc ^ 0xffffffff) >>> 0;
    }
    
    function makeChunk(type, data) {
        const len = Buffer.alloc(4);
        len.writeUInt32BE(data.length);
        const typeData = Buffer.concat([Buffer.from(type), data]);
        const crcVal = crc32(typeData);
        const crcBuf = Buffer.alloc(4);
        crcBuf.writeUInt32BE(crcVal);
        return Buffer.concat([len, typeData, crcBuf]);
    }
    
    // IHDR
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData[8] = 8;  // bit depth
    ihdrData[9] = 2;  // color type (RGB)
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace
    
    // 图像数据
    const rawData = [];
    for (let y = 0; y < height; y++) {
        rawData.push(0); // filter byte
        for (let x = 0; x < width; x++) {
            rawData.push(r, g, b);
        }
    }
    
    // 压缩
    const zlib = require('zlib');
    const compressed = zlib.deflateSync(Buffer.from(rawData));
    
    return Buffer.concat([
        signature,
        makeChunk('IHDR', ihdrData),
        makeChunk('IDAT', compressed),
        makeChunk('IEND', Buffer.alloc(0))
    ]);
}

// 生成84个图片
let count = 0;
for (const [elem, color] of Object.entries(elementsColors)) {
    for (let stage = 1; stage <= 7; stage++) {
        const filename = `${elem}${stage}.png`;
        const filepath = path.join(basePath, filename);
        
        const [r, g, b] = color;
        const pngData = createSimplePNG(64, 64, r, g, b);
        
        fs.writeFileSync(filepath, pngData);
        count++;
        console.log(`已生成: ${filename}`);
    }
}

console.log(`\n完成! 共生成 ${count} 个图片文件`);
