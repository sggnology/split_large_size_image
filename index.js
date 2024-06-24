import sharp from 'sharp';
import fs from 'fs/promises';

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

main(5);