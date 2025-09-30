document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const categorySearch = document.getElementById('category-search');
  const speakerSearch = document.getElementById('speaker-search');
  const themeSwitcher = document.getElementById('theme-switcher');

  const currentTheme = localStorage.getItem('theme') || 'dark-theme';
  document.body.classList.add(currentTheme);

  fetchAndDisplayTalks();

  categorySearch.addEventListener('input', () => fetchAndDisplayTalks());
  speakerSearch.addEventListener('input', () => fetchAndDisplayTalks());
  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    const newTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', newTheme);
  });

  function fetchAndDisplayTalks() {
    const category = categorySearch.value.toLowerCase();
    const speaker = speakerSearch.value.toLowerCase();
    
    let url = '/api/talks?';
    if (category) {
      url += `category=${category}`;
    }
    if (speaker) {
      if (category) url += '&';
      url += `speaker=${speaker}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayTalks(data);
      });
  }

  function displayTalks(talksToDisplay) {
    scheduleContainer.innerHTML = '';
    talksToDisplay.forEach(talk => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');

      talkElement.innerHTML = `
        <div class="time">${talk.startTime} - ${talk.endTime}</div>
        <h2>${talk.title}</h2>
        <div class="speakers">By: ${talk.speakers.join(', ')}</div>
        <p>${talk.description}</p>
        <div class="categories">
          ${talk.categories.map(category => `<span class="category">${category}</span>`).join('')}
        </div>
      `;

      scheduleContainer.appendChild(talkElement);
    });
  }
});
