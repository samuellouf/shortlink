const sleep = (seconds) => {
  return new Promise((resolve) => {
    setInterval(resolve, seconds * 1000);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  let query = decodeURIComponent(window.location.href.split('/')[(window.location.href.split('/').length - (window.location.href.endsWith('/') ? 2 : 1))]);
  if (query.includes('#')) query = query.split('#')[0];
  if (query.includes('?')) query = query.split('?')[0];
  if (query.includes('.')) query = query.split('.')[0];
  document.querySelector('.search a').href = 'https://samuellouf.github.io/?q=' + query.replaceAll('-', ' ').replaceAll('_', ' ');
  document.querySelector('.search .search_query').innerText = query.replaceAll('-', ' ').replaceAll('_', ' ');
  document.querySelector('#sl').innerText = query;

  var response = await fetch('./redirections.json').then(r => r.json());
  if (response[query]){
    document.querySelector('#url').innerText = response[query];
    document.querySelector('#error').style.display = 'none';
    await sleep(3);
    window.location.href = response[query];
  }
  document.querySelector('#redirecting').style.display = 'none';
});