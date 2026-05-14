import fs from 'fs';
import path from 'path';

const baseDir = 'd:/BIMUS/plataforma-aagora/aagora/packages/ui/src/components/editor';
const uiComponentsDir = 'd:/BIMUS/plataforma-aagora/aagora/packages/ui/src/components';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace "@/components/editor" with relative path to editor root
      if (content.includes('@/components/editor')) {
        const relativeToEditor = path.relative(path.dirname(fullPath), baseDir);
        const prefix = relativeToEditor === '' ? '.' : relativeToEditor;
        content = content.replace(/@\/components\/editor/g, prefix);
        changed = true;
      }

      // Replace "@/components/ui" with relative path to components root
      if (content.includes('@/components/ui')) {
        const relativeToUI = path.relative(path.dirname(fullPath), uiComponentsDir);
        const prefix = relativeToUI === '' ? '.' : relativeToUI;
        content = content.replace(/@\/components\/ui/g, prefix);
        changed = true;
      }

      if (changed) {
        console.log(`Updating ${fullPath}`);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDirectory(baseDir);
