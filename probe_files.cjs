const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

function probe(file) {
  try {
    const out = execSync(`"${ffmpeg}" -i "${file}"`, { stdio: 'pipe' }).toString();
    console.log(file, out);
  } catch (e) {
    console.log(file, e.stderr.toString());
  }
}

probe('public/logo-motion-header.mp4');
probe('public/logo-motion-header.webm');
