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
