export function getUrlId(url: string | undefined) {
  let id = '';

  if (url !== undefined) {
    for (let i = url.length - 1; i >= 0; i -= 1) {
      if (url[i] === '/') break;
      id = url[i] + id;
    }

    return id;
  }

  return '';
}
