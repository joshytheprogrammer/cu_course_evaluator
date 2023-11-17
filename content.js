// Listen for messages from the background script (popup.js)
browser.runtime.onMessage.addListener(function(message) {
  if (message.action === "fillForm") {
    fillCourseForm(message.eval);
  }
});

function fillCourseForm(eval) {
  const reverseValues = eval === '0';

  document.getElementById('id_multichoice_154218').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154219').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154221').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154222').value = reverseValues ? '4' : '1';

  document.getElementById('id_multichoice_154224').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154225').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154226').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154227').value = reverseValues ? '4' : '1';

  document.getElementById('id_multichoice_154229').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154230').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154231').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154232').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154234').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154235').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154236').value = reverseValues ? '4' : '1';

  document.getElementById('id_multichoice_154238').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154239').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154240').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154242').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154243').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154245').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154246').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154247').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154249').value = reverseValues ? '4' : '1';
  document.getElementById('id_multichoice_154250').value = reverseValues ? '1' : '4';

  document.getElementById('id_multichoice_154252').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154253').value = reverseValues ? '4' : '1';

  document.getElementById('id_multichoice_154255').value = reverseValues ? '1' : '4';
  document.getElementById('id_multichoice_154256').value = reverseValues ? '4' : '1';

  document.getElementById('id_textfield_154258').value = 'Not sure';

  document.getElementById('id_multichoice_154259').value = reverseValues ? '1' : '4';
}
