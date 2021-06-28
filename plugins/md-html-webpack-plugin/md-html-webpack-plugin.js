class MdHtmlWebpackPlugin {
  constructor({ template, filename }) {
    if (!template) {
      throw new Error('The config for "template must for be configure."');
    }

    this.template = template;
    this.filename = filename || 'md.html';
  }

  apply() {}
}

module.exports = MdHtmlWebpackPlugin;
