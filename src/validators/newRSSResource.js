const isNewRSSResource = (resources, url) => {
  console.log(url, resources, 'inNew');
  const findedBrotherURL = resources.filter(({ value }) => value === url);
  return findedBrotherURL.length !== 1;
};

export default isNewRSSResource;
