// paladice-cone.js - pupil tracking script
(function(){
  const wrapper = document.querySelector('.cone-wrapper');
  if (!wrapper) return;

  const eyes = wrapper.querySelectorAll('.eye');
  const maxOffset = 8;

  function movePupils(clientX, clientY){
    eyes.forEach(eye=>{
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;

      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const strength = Math.min(maxOffset, dist / 10);
      const angle = Math.atan2(dy, dx);
      const px = Math.cos(angle) * strength;
      const py = Math.sin(angle) * strength;
      const pupil = eye.querySelector('.pupil');
      if (pupil) pupil.style.transform = `translate(${px}px, ${py}px)`;
    });
  }

  document.addEventListener('mousemove', e => {
    movePupils(e.clientX, e.clientY);
  });

  document.addEventListener('touchmove', e => {
    if (e.touches && e.touches[0]) {
      movePupils(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, {passive:true});

  document.addEventListener('mouseleave', () => {
    eyes.forEach(eye => {
      const pupil = eye.querySelector('.pupil');
      if (pupil) pupil.style.transform = 'translate(0,0)';
    });
  });

  window.requestAnimationFrame(()=>{
    document.body.classList.add('hero-loaded');
  });
})();
