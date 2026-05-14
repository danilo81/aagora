import fs from 'fs';
import path from 'path';

const baseDir = 'd:/BIMUS/plataforma-aagora/aagora/packages/ui/src/components/editor';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('@/components/editor')) {
        const relativeDir = path.relative(path.dirname(fullPath), baseDir);
        const prefix = relativeDir === '' ? '.' : relativeDir;
        
        // Replace "@/components/editor" with prefix
        const newContent = content.replace(/@\/components\/editor/g, prefix);
        if (content !== newContent) {
          console.log(`Updating ${fullPath}`);
          fs.writeFileSync(fullPath, newContent);
        }
      }
    }
  }
}

processDirectory(baseDir);
