const fs = require('fs');
const path = require('path');

// Copier logo BCC
const src = 'BCC LOGO.png';
const dst = path.join('frontend', 'public', 'brand', 'logo-bcc.png');

try {
  fs.copyFileSync(src, dst);
  console.log('OK: logo-bcc.png copie dans', dst);
  console.log('Taille:', fs.statSync(dst).size, 'octets');
} catch(e) {
  console.error('ERREUR copie logo:', e.message);
}
