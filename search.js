const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

// YT video url https://www.youtube.com/watch?v=${results.id.videoId ???}
//paginaton


function getDataFromApi(searchTerm, callback, pageTokenArg = "") {
  const query = {
    q: `${searchTerm} in:name`,
    part: 'snippet',
    key: 'AIzaSyBG76HYFNhzGbBrCZPfpXUDy-nvlSGk5iQ',
    pageToken: pageTokenArg
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}" alt="video link to ${result.snippet.title}" /></h2>
    </div>
  `
        // <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
      // <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>;
      // </a> by <a class="js-channel-name" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  handlePageButtons(data);
  handleNextButton(data);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

function handlePageButtons(data){
  console.log(data);
  const $nextButton = $('.next');
  $nextButton.removeClass('hidden');
}

function handleNextButton(data) {
  $('.next').on('click', event => {
    event.preventDefault();
    console.log("Next was clicked");
  });
}

$(watchSubmit);
