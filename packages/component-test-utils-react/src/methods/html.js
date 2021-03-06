const {getTagName} = require('./getTagName');

function isString(variable) {
  return typeof variable === 'function';
}

function buildPropsString(props, reactEl) {
  return props && props.length !== 0 ?
    ` ${props
      .map(key => {
        const keyString = key === 'className' ? 'class' : key;

        if (isString(reactEl.props[key])) {
          const functionName = reactEl.props[key].name;
          return `${keyString}="[${functionName}]"`;
        }

        if (reactEl.props[key] === true) {
          return keyString;
        }

        return `${keyString}="${reactEl.props[key]}"`;
      })
      .join(' ')}` :
    '';
}

function buildHtmlEl(reactEl, options) {
  if (reactEl === null || reactEl === undefined || reactEl === false || reactEl === true) {
    return '';
  }

  if (['string', 'number'].includes(typeof reactEl)) {
    return reactEl.toString();
  }

  if (Array.isArray(reactEl)) {
    return reactEl
      .map(el => buildHtmlEl(el, options))
      .join('');
  }

  const isHTMLElement = typeof reactEl.type === 'string';
  const tagname = getTagName(reactEl);

  const props =
    reactEl.props &&
    Object.keys(reactEl.props).filter(key => key !== 'children');
  const children = reactEl.props && reactEl.props.children;

  const propsString = buildPropsString(props, reactEl);

  if (options.snapshot && !isHTMLElement && children !== null && children !== undefined) {
    return buildHtmlEl(reactEl.props.children, options);
  }

  if (children !== null && children !== undefined) {
    return `<${tagname}${propsString}>${buildHtmlEl(reactEl.props.children, options)}</${tagname}>`;
  }

  return `<${tagname}${propsString}/>`;
}

exports.getHtml = (reactTree, options = {snapshot: false}) => {
  return buildHtmlEl(reactTree, options);
};
