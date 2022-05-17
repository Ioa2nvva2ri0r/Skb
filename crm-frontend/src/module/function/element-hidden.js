export function elemVisible(el, classOpen, display) {
  el.style.display = display;
  el.classList.add(classOpen);
}

export function elemHidden(el, classOpen, classClose, ms) {
  if (classOpen !== undefined) el.classList.remove(classOpen);
  el.classList.add(classClose);
  setTimeout(() => {
    el.style.display = 'none';
    el.classList.remove(classClose);
  }, ms);
}
