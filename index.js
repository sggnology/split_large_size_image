import sharp from 'sharp';
import fs from 'fs/promises';

// For a4 paper standard (pixel, 300 DPI)
// (mm * DPI)/inch = mm/inch * DPI[Pixel], inch = 25.4mm
const a4WidthInPixels = Math.round(210 * 300 / 25.4); // 2480px
const a4HeightInPixels = Math.round(297 * 300 / 25.4); // 3508px

// Image Spliting Function
const splitImage = async (imagePath, separateCount) => {
    const image = sharp(imagePath);
    const { width, height } = await image.metadata();

    const partWidth = width / separateCount;
    const partHeight = height;

    console.log(`이미지 크기: ${width}x${height}`);
    console.log(`PART 용지 크기: ${partWidth}x${partHeight}`);

    const imageBuffers = await Promise.all(Array.from({ length: separateCount }, (_, i) => {

        console.log(`Image index: ${i + 1}, extracting...`);

        const image1 = sharp(imagePath);

        const imageSizeJson = {
            left: Math.floor(i * partWidth),
            top: 0,
            width: Math.floor(partWidth),
            height: partHeight,
        }

        console.log(JSON.stringify(imageSizeJson));

        return image1
            .extract(imageSizeJson)
            .resize(a4WidthInPixels, a4HeightInPixels)
            .toBuffer()
    }));

    await Promise.all(imageBuffers.map((buffer, index) => {
        const outputPath = `./source_out/output_part_${index + 1}.png`;
        return fs.writeFile(outputPath, buffer);
    }));

    console.log('Image spliting Done!');
};

// 실행 함수
const main = async (separateCount) => {
    try {
        const imagePath = './source_in/image.png'; // 이미지 경로
        
        await splitImage(imagePath, separateCount);
    } catch (error) {
        console.error('오류 발생:', error);
    }
};

main(4);