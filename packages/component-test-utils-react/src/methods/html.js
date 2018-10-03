function buildHtmlEl(reactEl) {
  if (reactEl === null || reactEl === undefined) {
    return '';
  }

  if (['string', 'number'].includes(typeof reactEl)) {
    return reactEl.toString();
  }

  const tagname =
    typeof reactEl.type === 'string' ? reactEl.type : reactEl.type.name;

  const props =
    reactEl.props &&
    Object.keys(reactEl.props).filter(key => key !== 'children');
  const children = reactEl.props && reactEl.props.children;

  const propsString =
    props && props.length !== 0 ?
      ` ${props
        .map(key => {
          const keyString = key === 'className' ? 'class' : key;
          return `${keyString}="${reactEl.props[key]}"`;
        })
        .join(' ')}` :
      '';

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
