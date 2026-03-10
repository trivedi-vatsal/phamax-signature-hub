import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emlPath = path.join(__dirname, 'Email signature (India team members).eml');
const publicDir = path.join(__dirname, 'public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

const emlContent = fs.readFileSync(emlPath, 'utf8');

// The boundary string for images is:
const parts = emlContent.split("--_008_BM1PR01MB3474BDADDE66E0BBAF4DF5978B7DABM1PR01MB3474INDP_");

parts.forEach(part => {
  if (part.includes('Content-Type: image/')) {
    const nameMatch = part.match(/name="([^"]+)"/);
    if (nameMatch) {
      const filename = nameMatch[1];
      // Find the base64 part
      const base64Start = part.indexOf('Content-Transfer-Encoding: base64') + 'Content-Transfer-Encoding: base64'.length;
      const base64String = part.substring(base64Start).trim();
      
      const buffer = Buffer.from(base64String.replace(/\s+/g, ''), 'base64');
      const outputPath = path.join(publicDir, filename);
      fs.writeFileSync(outputPath, buffer);
      console.log(`Extracted ${filename}`);
    }
  }
});
console.log("Done");
