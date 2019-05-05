const ReactIs = require('react-is');

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

function getTagname(reactEl) {
  if (typeof reactEl.type === 'string') {
    return reactEl.type;
  }

  if (ReactIs.isFragment(reactEl)) {
    return '';
  }

  return (
    reactEl.type.displayName ||
    reactEl.type.name ||
    reactEl.type.$$typeof.toString()
  );
}

function buildHtmlEl(reactEl) {
  if (reactEl === null || reactEl === undefined) {
    return '';
  }

  if (['string', 'number'].includes(typeof reactEl)) {
    return reactEl.toString();
  }

  const tagname = getTagname(reactEl);

  const props =
    reactEl.props &&
    Object.keys(reactEl.props).filter(key => key !== 'children');
  const children = reactEl.props && reactEl.props.children;

  const propsString = buildPropsString(props, reactEl);

  if (children !== null && children !== undefined) {
    return Array.isArray(children) ?
      `<${tagname}${propsString}>${reactEl.props.children
        .map(buildHtmlEl)
        .join('')}</${tagname}>` :
      `<${tagname}${propsString}>${buildHtmlEl(
        reactEl.props.children
      )}</${tagname}>`;
  }

  return `<${tagname}${propsString}/>`;
}

exports.getHtml = reactTree => {
  return buildHtmlEl(reactTree);
};
