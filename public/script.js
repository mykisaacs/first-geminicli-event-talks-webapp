document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const categorySearch = document.getElementById('category-search');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      displayTalks(talks);
    });

  categorySearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.categories.some(category => category.toLowerCase().includes(searchTerm))
    );
    displayTalks(filteredTalks);
  });

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
