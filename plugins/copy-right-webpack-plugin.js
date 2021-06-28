const pluginName = 'CopyRightWebpackPlugin';

class CopyRightWebpackPlugin {
  // 接收参数
  constructor(options) {
    this.name = options.name || 'wangHaoYu';
  }

  // compiler 类似webpack实例 所有相关内容
  apply(compiler) {
    const textCtx = `copy right ${this.name}`;
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      // compilation 这次打包相关的内容
      // debugger
      compilation['assets']['copy-right.txt'] = {
        source: () => {
          return textCtx;
        },
        size: () => {
          return textCtx.length;
        },
      };
      cb();
    });
  }
}

module.exports = CopyRightWebpackPlugin;
