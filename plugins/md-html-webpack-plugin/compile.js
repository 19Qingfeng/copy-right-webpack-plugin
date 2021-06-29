const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#+/;

function createTree(mdArr) {
  const _htmlPool = {};
  let lastMark = '';

  mdArr.forEach((i) => {
    const matched = i.match(reg_mark);
    const mark = matched[1];
    if (reg_sharp.test(mark)) {
      const { key, realKey, tag, type } = _parseTag(matched, 'sharp');
      _htmlPool[key] = {
        type,
        tag,
      };
      lastMark = realKey;
    }
  });

  console.log(_htmlPool, '_htmlPool');
}

function _parseTag(matched, type) {
  const input = matched.input;
  const content = input.replace(matched[1], '');
  const mark = matched[1];

  const typeList = {
    sharp: _parseSharp,
  };

  return typeList[type](matched[1], content);
  // utils
  function _parseSharp() {
    const tag = `h${mark.length}`;
    return {
      key: `${tag}-${Math.random()}`,
      realKey: tag,
      type: 'single',
      tag: [`<${tag}>${content}<\${tag}>`],
    };
  }
}

module.exports = {
  createTree,
};
