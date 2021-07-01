const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#+/;
const reg_crossbar = /^\-/;
const reg_number = /^\d/;

function parseObjectToHTML(object) {
  let _html = '';
  Object.keys(object).forEach((key) => {
    const formatKey = key.slice(0, key.indexOf('-'));
    const value = object[key];
    const tagType = value.type;
    const innerTag = value.tag;

    if (tagType === 'multiple') {
      _html += `<${formatKey}>${innerTag.join('')}</${formatKey}>`;
    } else {
      _html += innerTag;
    }
  });

  return _html;
}

function createTree(mdArr) {
  const _htmlPool = {};
  let lastMark = '';
  let lastTagKey = '';

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
      lastTagKey = key;
    }
    if (reg_crossbar.test(mark)) {
      const { key, realKey, tag, type } = _parseTag(matched, 'crossbar');
      if (lastMark === realKey) {
        _htmlPool[lastTagKey].tag.push(...tag);
      } else {
        _htmlPool[key] = {
          type,
          tag,
        };
        lastMark = realKey;
        lastTagKey = key;
      }
    }
    if (reg_number.test(mark)) {
      const { key, realKey, tag, type } = _parseTag(matched, 'number');
      if (lastMark === realKey) {
        _htmlPool[lastTagKey].tag.push(...tag);
      } else {
        _htmlPool[key] = {
          type,
          tag,
        };
        lastMark = realKey;
        lastTagKey = key;
      }
    }
  });
  return _htmlPool;
}

function _parseTag(matched, type) {
  const input = matched.input;
  const content = input.replace(matched[1], '');
  const mark = matched[1];

  const typeList = {
    sharp: _parseSharp,
    crossbar: _parseCrossbar,
    number: _parseNumber,
  };

  return typeList[type](matched[1], content);
  // utils

  // 有序列表
  function _parseNumber() {
    const tag = `li`;
    return {
      key: `ol-${Date.now()}`,
      realKey: 'ol',
      type: 'multiple',
      tag: [`<${tag}>${content}</${tag}>`],
    };
  }

  // 无序列表
  function _parseCrossbar() {
    const tag = `li`;
    return {
      key: `ul-${Date.now()}`,
      realKey: 'ul',
      type: 'multiple',
      tag: [`<${tag}>${content}</${tag}>`],
    };
  }

  // H标签
  function _parseSharp() {
    const tag = `h${mark.length}`;
    return {
      key: `${tag}-${Date.now()}`,
      realKey: tag,
      type: 'single',
      tag: [`<${tag}>${content}</${tag}>`],
    };
  }
}

module.exports = {
  createTree,
  parseObjectToHTML,
};
