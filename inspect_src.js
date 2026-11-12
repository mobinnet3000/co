const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');

const src = 'C:/Users/Surface A/.gemini/antigravity/brain/0a6adcd9-206a-4529-b2f7-f0f5fa2d9592/.user_uploaded/media_1794445196774_0df62194.mp4';

for (let t = 0; t <= 10; t++) {
  try {
    execSync(`"${ffmpeg}" -y -ss ${t} -i "${src}" -vframes 1 -vf scale=320:-1 "temp_frame_${t}.jpg"`, { stdio: 'ignore' });
    console.log(`Saved temp_frame_${t}.jpg`);
  } catch (e) {
    console.error(`Failed at ${t}s:`, e.message);
  }
}
