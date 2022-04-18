const parserRSS = (response, id) => {
  const parser = new DOMParser();
  const data = parser.parseFromString(response.data.contents, 'text/xml');
  const feed = {
    title: data.querySelector('chanel').firstElementChild,
    description: data.querySelector('chanel').childNodes[1],
    id,
  };
  const flow = {
    title: data.querySelector('item').firstElementChild,
    link: data.querySelector('item').childNodes[2],
    description: data.querySelector('item').childNodes[3],
    id,
  };
  return { feed, flow };
};

export default parserRSS;
