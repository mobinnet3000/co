const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpeg = path.resolve('node_modules/ffmpeg-static/ffmpeg.exe');
const input = 'C:/Users/Surface A/.gemini/antigravity/brain/0a6adcd9-206a-4529-b2f7-f0f5fa2d9592/.user_uploaded/media_1794445196774_0df62194.mp4';

console.log('Encoding optimized MP4...');
execFileSync(ffmpeg, [
  '-y',
  '-i', input,
  '-an',
  '-vf', 'crop=800:300:240:195,scale=540:202:flags=lanczos',
  '-c:v', 'libx264',
  '-crf', '22',
  '-preset', 'slow',
  '-movflags', '+faststart',
  '-pix_fmt', 'yuv420p',
  'public/logo-motion-header.mp4'
]);

console.log('Encoding optimized WebM...');
execFileSync(ffmpeg, [
  '-y',
  '-i', input,
  '-an',
  '-vf', 'crop=800:300:240:195,scale=540:202:flags=lanczos',
  '-c:v', 'libvpx-vp9',
  '-crf', '28',
  '-b:v', '0',
  'public/logo-motion-header.webm'
]);

// Also copy or encode logo-motion.mp4 and webm
fs.copyFileSync('public/logo-motion-header.mp4', 'public/logo-motion.mp4');
fs.copyFileSync('public/logo-motion-header.webm', 'public/logo-motion.webm');

console.log('Generating poster image at 8s...');
execFileSync(ffmpeg, [
  '-y',
  '-ss', '8',
  '-i', input,
  '-vf', 'crop=800:300:240:195,scale=540:202:flags=lanczos',
  '-vframes', '1',
  '-q:v', '2',
  'public/logo-motion-poster.jpg'
]);

// Clean up temporary test files
const tempFiles = [
  'public/new-logo-frame-1.jpg',
  'public/new-logo-frame-4.jpg',
  'public/new-logo-frame-7.jpg',
  'public/new-logo-frame-9.5.jpg',
  'public/new-seq-0.jpg',
  'public/new-seq-0.5.jpg',
  'public/new-seq-2.jpg',
  'public/new-seq-8.jpg',
  'public/new-seq-9.8.jpg',
  'public/new-seq-end.jpg',
  'public/test-crop-4s.jpg',
  'public/test-crop-8s.jpg',
  'scratch_process_video.cjs',
  'scratch_measure_logo.cjs',
  'scratch_test_crop.cjs'
];

for (const file of tempFiles) {
  if (fs.existsSync(file)) {
    try { fs.unlinkSync(file); } catch {}
  }
}

console.log('Encoding completed successfully!');
console.log('MP4 size:', fs.statSync('public/logo-motion-header.mp4').size);
console.log('WebM size:', fs.statSync('public/logo-motion-header.webm').size);
console.log('Poster size:', fs.statSync('public/logo-motion-poster.jpg').size);
