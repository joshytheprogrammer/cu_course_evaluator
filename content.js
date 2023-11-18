// Listen for messages from the background script (popup.js)
browser.runtime.onMessage.addListener(function(message) {
  if (message.action === "fillForm") {
    fillCourseForm(message.eval);
  }
});

function fillCourseForm(eval) {
  const reverseValues = eval === '0';

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  document.getElementById('id_multichoice_154218').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154219').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154221').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154222').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);

  document.getElementById('id_multichoice_154224').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154225').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154226').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154227').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);

  document.getElementById('id_multichoice_154229').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154230').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154231').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154232').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154234').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154235').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154236').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);

  document.getElementById('id_multichoice_154238').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154239').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154240').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154242').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154243').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154245').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154246').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154247').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154249').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);
  document.getElementById('id_multichoice_154250').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.getElementById('id_multichoice_154252').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154253').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);

  document.getElementById('id_multichoice_154255').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);
  document.getElementById('id_multichoice_154256').value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2);

  document.getElementById('id_textfield_154258').value = 'Not sure';

  document.getElementById('id_multichoice_154259').value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

}
