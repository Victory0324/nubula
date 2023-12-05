const Path = require('path');
const { optimize } = require('svgo');
const { transform } = require('@svgr/core');
const { readFile, writeFile } = require('fs').promises;
const glob = require('glob');

glob(__dirname + '/src/**/*.svg', {}, async (err, files) => {
  for (const f of files) {
    const svgText = await readFile(f);
    const path = Path.parse(f);
    console.info(`processing: ${f}`);

    const jsCode = await transform(
      svgText,
      {
        svgo: true,
        replaceAttrValues: {
          white: 'currentColor',
          '#ffffff': 'currentColor',
        },
        svgoConfig: {
          removeViewBox: false,
        },
        jsxRuntime: 'automatic',
        typescript: true,
        plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      },
      {
        componentName: path.name,
      }
    );

    await writeFile(`${path.dir}/${path.name}.tsx`, jsCode);

    console.info(`processing: ${f}`);
  }
});
