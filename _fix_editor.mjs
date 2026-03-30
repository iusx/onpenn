import { writeFileSync } from 'fs'
writeFileSync(
  new URL('./src/app/editor/page.tsx', import.meta.url),
  `import { redirect } from 'next/navigation'\n\nexport default function EditorRedirect() {\n  redirect('/zh/editor')\n}\n`
)
console.log('done')
