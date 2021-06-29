const fs = require('fs');
const path = require('path');
const { createTree } = require('./compile')

const MARK_STRING = '<div id="md"></div>';

class MdHtmlWebpackPlugin {
  constructor({ template, filename }) {
    if (!template) {
      throw new Error('The config for "template must for be configure."');
    }

    this.template = template;
    this.filename = filename || 'md.html';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'md-html-webpack-plugin',
      (compilation, cb) => {
        const _assets = compilation.assets;
        const { source, size } = compileHTML(this.template);
        _assets[this.filename] = {
          source: () => {
            return source;
          },
          size: () => {
            return size;
          },
        };
        cb();
      }
    );
  }
}

function compileHTML(filePath) {
  const htmlPath = path.resolve(__dirname, './index.html');
  const htmlString = fs.readFileSync(htmlPath, 'utf-8');
  const mdString = fs.readFileSync(filePath, 'utf-8');
  const { size, source } = _compileMdToHTML(htmlString, mdString);
  return {
    size,
    source,
  };
}

function _compileMdToHTML(html, md) {

  const mdArr = md.split('\n').filter((i) => i);

  const tree = createTree(mdArr)


  // const newHtmlString = html.replace(MARK_STRING, parsedHtml);

  return {
    source: newHtmlString,
    size: newHtmlString.length,
  };
}

module.exports = MdHtmlWebpackPlugin;
