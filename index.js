import sharp from 'sharp';
import fs from 'fs/promises';

// 이미지 분할 함수
const splitImage = async (imagePath, outputDir) => {
    const image = sharp(imagePath);
    const { width, height } = await image.metadata();

    const partWidth = width / 5;
    const partHeight = height;

    console.log(`이미지 크기: ${width}x${height}`);
    console.log(`PART 용지 크기: ${partWidth}x${partHeight}`);

    const imageBuffers = await Promise.all(Array.from({ length: 5 }, (_, i) => {

        console.log(`이미지 ${i + 1} 부분 추출 중...`);

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

    await fs.mkdir(outputDir, { recursive: true });

    await Promise.all(imageBuffers.map((buffer, index) => {
        const outputPath = `${outputDir}/output_part_${index + 1}.jpg`;
        return fs.writeFile(outputPath, buffer);
    }));

    console.log('이미지 분할 및 저장 완료');
};

// 실행 함수
const main = async () => {
    try {
        const imagePath = './source_in/image.png'; // 이미지 경로
        const outputDir = 'source_out'; // 출력 디렉토리
        await splitImage(imagePath, outputDir);
    } catch (error) {
        console.error('오류 발생:', error);
    }
};

main();