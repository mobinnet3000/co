const fs = require('fs');

// Check the temp frames we already extracted: temp_frame_0.jpg to temp_frame_10.jpg
for (let t = 0; t <= 10; t++) {
  const stats = fs.statSync(`temp_frame_${t}.jpg`);
  console.log(`temp_frame_${t}.jpg size: ${stats.size}`);
}
