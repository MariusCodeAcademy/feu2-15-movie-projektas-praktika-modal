'use strict';
console.log('app.js');

// taikomes ============================================================================
const els = {
  addMovieBtn: document.getElementById('add-movie-btn'),
  addMovieModal: document.getElementById('add-modal'),
  backdrop: document.getElementById('backdrop'),
  cancelMovieBtn: document.querySelector('.btn--passive'),
  addMovieForm: document.getElementById('add-movie-form'),
  moviesContainer: document.getElementById('movie-list'),
  noMoviesContainer: document.getElementById('entry-text'),
};

// bendras globalus filmu kintamasis
let mainMoviesArr = [];

const mainMoviesSuperObj = {
  movies: [],
  add: function (movieObj) {
    console.log('adding movie', movieObj.title);
    mainMoviesSuperObj.movies.push(movieObj);
    console.log(mainMoviesSuperObj.movies);
    renderMovies();
  },
  remove: function (id) {
    // mainMoviesArr paliekam viska isskyrus ta elementa ant kurio paspausta delete
    mainMoviesSuperObj.movies = mainMoviesSuperObj.movies.filter((mObj) => mObj.id !== id);
    console.log('mainMoviesSuperObj.movies === ', mainMoviesSuperObj.movies);
    renderMovies();
  },
  doWeHaveMovies: function () {
    return !!mainMoviesSuperObj.movies.length;
  },
};

console.log('doWeHaveMovies ===', mainMoviesSuperObj.doWeHaveMovies());
// testavimui prisidedam filma iskart
mainMoviesSuperObj.add({
  id: generateId(),
  imageUrl: 'https://picsum.photos/id/1003/1181/1772',
  rating: '4',
  title: 'Bambi1',
});
mainMoviesSuperObj.add({
  id: generateId(),
  imageUrl: 'https://picsum.photos/id/1006/1181/1772',
  rating: '4',
  title: 'Mountain',
});
mainMoviesSuperObj.add({
  id: generateId(),
  imageUrl: 'https://picsum.photos/id/1015/1181/1772',
  rating: '4',
  title: 'River',
});
console.log('mainMoviesArr ===', mainMoviesArr);

console.log('els ===', els);

// EVENT LISTENERS =====================================================================
// =====================================================================================
// =====================================================================================

// paspaudimas ant Add Movie Btn
els.addMovieBtn.addEventListener('click', showMovieForm);

// uzdeti paspaudimo pasiklausyma ant backdrop
els.backdrop.addEventListener('click', closeMovieModal);

// uzdeti cancel mygtukui pasiklausyma ir atlikti ta pati ka ir darem su backdrop paspaudus
els.cancelMovieBtn.addEventListener('click', closeMovieModal);

// klausomes formos issiuntimo ir stabdom perkrovima
els.addMovieForm.addEventListener('submit', movieAddFormHandler);

// MAIN FUNCTIONS =====================================================================
// =====================================================================================
// =====================================================================================
function movieAddFormHandler(event) {
  // stabdom perkrovima
  event.preventDefault();
  console.log('add movie');
  // gauti input reiksmes ====================================================
  const newMovieDetails = {
    id: generateId(),
    title: els.addMovieForm.elements.title.value.trim(),
    imageUrl: els.addMovieForm.elements['image-url'].value.trim(),
    rating: els.addMovieForm.elements.rating.value.trim(),
  };
  console.log('newMovieDetails ===', newMovieDetails);
  // mini validacija =========================================================
  if (weHaveErrors(newMovieDetails)) {
    console.log('stop nes ne viskas ivesta');
    return;
  }

  // jei viskas nera tusciu lauku ================================================
  mainMoviesSuperObj.add(newMovieDetails);
  // kai pridedam sekmingai filma isvalyti forma ir paslepti modala ir backdrop
  closeMovieModal();
  els.addMovieForm.reset();
  //
}
function showMovieForm() {
  // parodyti modala
  els.addMovieModal.classList.add('visible');
  // parodyti backdrop
  els.backdrop.classList.add('visible');
}

function renderMovies() {
  // issivalyti saraso konteineri kad nebutu dubliuojami elementai su apend
  els.moviesContainer.innerHTML = '';
  console.log('doWeHaveMovies ===', mainMoviesSuperObj.doWeHaveMovies());
  // noMoviesContainer rodyti arba ne, priklausomai ar turim nors viena movie
  if (mainMoviesSuperObj.doWeHaveMovies()) {
    // paslepti elementa kuris rodomas jei neturim nei vieno filmo
    els.noMoviesContainer.style.display = 'none';
  } else {
    // rodyti elementa kuris rodomas jei neturim nei vieno filmo
    els.noMoviesContainer.style.display = 'block';
    return;
  }

  // sukti cikla per visa mainMoviesArr. sugeneruoti naujus movies html elementus is masyvo
  mainMoviesSuperObj.movies.forEach((mObj) => {
    // jei viskas gerai sukuriam html vieno movie
    const newMovieHtmlEl = makeOneMovieHtmlEl(mObj);
    // talpinam ta movie i dom
    els.moviesContainer.append(newMovieHtmlEl);
  });
}

function closeMovieModal() {
  console.log('closeMovieModal fn');
  // paslepti modala
  els.addMovieModal.classList.remove('visible');
  // paslepti backdrop
  els.backdrop.classList.remove('visible');
}

/**
 * Sukuria ir grazina li elmenta is argumetu gauto objekto reiksmiu
 * @param {*} newMovieObj
 *
 */

function makeOneMovieHtmlEl(newMovieObj) {
  // console.log('newMovieObj ===', newMovieObj);
  // isorini el sukuriam su createElement
  const liEl = document.createElement('li');
  liEl.className = 'movie-element';
  // prisidenam data-movie-id atributa kad atskirti individualu li el
  liEl.dataset.movieId = newMovieObj.id;
  // vidinius elementus su string (veliau reiktu perdaryti i createElement)
  const liInsideHtml = `
  <div class="movie-element__image">
    <img src="${newMovieObj.imageUrl}" alt="element__image">
  </div>
  <div class="movie-element__info">
    <h2>${newMovieObj.title}</h2>
    <p>${newMovieObj.rating}/5 stars</p>
    <i class="delete fa fa-trash" aria-hidden="true"></i>
  </div>
  `;
  // dedam string elementu i li elementa
  liEl.insertAdjacentHTML('afterbegin', liInsideHtml);
  // console.log(liEl);
  // taikomes i sukurta delete iconele
  const deleteBtnEl = liEl.querySelector('.delete');
  deleteBtnEl.addEventListener('click', movieDeleteHandler);
  return liEl;
}

function movieDeleteHandler(event) {
  const idOfElToBeDeleted = findClosestLiDataId(event.target);
  // mainMoviesArr paliekam viska isskyrus ta elementa ant kurio paspausta delete
  mainMoviesSuperObj.remove(idOfElToBeDeleted);
}

function weHaveErrors(chekObj) {
  return [chekObj.title, chekObj.imageUrl, chekObj.rating].includes('');
  //
}

// =====================================================================================
// HELPER FUNCTIONS =====================================================================
// =====================================================================================
// =====================================================================================

function generateId() {
  return Math.random().toFixed(8).slice(2);
}

function findClosestLiDataId(fromThisElement) {
  // console.log('delete movie', event.target);
  const deleteIconEl = fromThisElement;
  const movieLiElToDelete = deleteIconEl.closest('li');
  const idOfElToBeDeleted = movieLiElToDelete.dataset.movieId;
  console.log('idOfElToBeDeleted ===', idOfElToBeDeleted);
  return idOfElToBeDeleted;
}
