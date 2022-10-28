'use strict';
console.log('app.js');

// taikomes ============================================================================
const els = {
  addMovieBtn: document.getElementById('add-movie-btn'),
  addMovieModal: document.getElementById('add-modal'),
  backdrop: document.getElementById('backdrop'),
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
els.backdrop.addEventListener('click', () => {
  console.log('backdrop click detected');
  // paslepti modala
  els.addMovieModal.classList.remove('visible');
  // paslepti backdrop
  els.backdrop.classList.remove('visible');
});

// uzdeti cancel mygtukui pasiklausyma ir atlikti ta pati ka ir darem su backdrop paspaudus
