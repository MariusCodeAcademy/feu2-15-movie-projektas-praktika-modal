'use strict';
console.log('app.js');

// taikomes ============================================================================
const els = {
  addMovieBtn: document.getElementById('add-movie-btn'),
  addMovieModal: document.getElementById('add-modal'),
  backdrop: document.getElementById('backdrop'),
  cancelMovieBtn: document.querySelector('.btn--passive'),
  addMovieForm: document.getElementById('add-movie-form'),
};

console.log('els ===', els);

// EVENT LISTENERS =====================================================================
// =====================================================================================
// =====================================================================================

// paspaudimas ant Add Movie Btn
els.addMovieBtn.addEventListener('click', () => {
  // parodyti modala
  els.addMovieModal.classList.add('visible');
  // parodyti backdrop
  els.backdrop.classList.add('visible');
});

// uzdeti paspaudimo pasiklausyma ant backdrop
els.backdrop.addEventListener('click', closeMovieModal);

// uzdeti cancel mygtukui pasiklausyma ir atlikti ta pati ka ir darem su backdrop paspaudus
els.cancelMovieBtn.addEventListener('click', closeMovieModal);

// klausomes formos issiuntimo ir stabdom perkrovima
els.addMovieForm.addEventListener('submit', (event) => {
  // stabdom perkrovima
  event.preventDefault();
  console.log('add movie');
  // gauti input reiksmes
  const newMovieDetails = {
    title: els.addMovieForm.elements.title.value.trim(),
    imageUrl: els.addMovieForm.elements['image-url'].value.trim(),
    rating: els.addMovieForm.elements.rating.value.trim(),
  };
  console.log('newMovieDetails ===', newMovieDetails);
  // mini validacija
  // jei nors vienas laukas neivestas
  if (
    newMovieDetails.title === '' ||
    newMovieDetails.imageUrl === '' ||
    newMovieDetails.rating === ''
  ) {
    // stabdom tolimesni filmo pridejo vygdyma
    console.log('stop nes ne viskas ivesta');
    return;
  }

  // jei viskas gerai sukuriam html vieno movie
  makeOneMovieHtmlEl(newMovieDetails);

  // talpinam ta movie i dom
  console.log('talpinam movie');
});

// MAIN FUNCTIONS =====================================================================
// =====================================================================================
// =====================================================================================

function closeMovieModal() {
  console.log('closeMovieModal fn');
  // paslepti modala
  els.addMovieModal.classList.remove('visible');
  // paslepti backdrop
  els.backdrop.classList.remove('visible');
}

/**
 * Sukuria ir grazina li elmenta is argumetu gauto objekto reiksmiu
 * @param {object} newMovieObj
 */

/*
<li class="movie-element">
  <div class="movie-element__image">
    <img src="https://picsum.photos/id/1003/600/500" alt="element__image">
  </div>
  <div class="movie-element__info">
    <h2>Title</h2>
    <p>rating/5 stars</p>
  </div>
</li>
*/

function makeOneMovieHtmlEl(newMovieObj) {
  console.log('newMovieObj ===', newMovieObj);
}
