document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('#team .cards');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  const cardsPerPage = 6;
  const originalCards = Array.from(document.querySelectorAll('#team .card'));
  const totalCards = originalCards.length;
  let currentIndex = 0;
  let isAnimating = false;
  
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    cardsContainer.appendChild(clone);
  });
  
  function getCardWidth() {
    const firstCard = document.querySelector('#team .card');
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 20;
  }
  
  function updatePosition(smooth = true) {
    if (!smooth) {
      cardsContainer.style.transition = 'none';
    } else {
      cardsContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    const cardWidth = getCardWidth();
    const offset = -currentIndex * cardWidth;
    cardsContainer.style.transform = `translateX(${offset}px)`;
  }
  
  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex++;
    updatePosition(true);
    
    setTimeout(() => {
      if (currentIndex >= totalCards) {
        cardsContainer.style.transition = 'none';
        currentIndex = 0;
        updatePosition(false);
      }
      isAnimating = false;
    }, 500);
  }
  
  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex--;
    
    if (currentIndex < 0) {
      updatePosition(false);
      currentIndex = totalCards - 1;
      cardsContainer.style.transition = 'none';
      updatePosition(false);
      setTimeout(() => {
        cardsContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        isAnimating = false;
      }, 0);
    } else {
      updatePosition(true);
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', slidePrev);
  nextBtn.addEventListener('click', slideNext);
  
  // Affichage initial
  updatePosition(false);
});
