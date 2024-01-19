const runtime = chrome.runtime || browser.runtime;

runtime.onMessage.addListener(({ action, eval, autoSubmit }) => {
  if (action === "fillForm") {
    fillCourseForm(eval, autoSubmit);
  }
});

const getContext = (index, reverseValues) => {
  //? Represents question moods - (positive and negative) as 1's and 0's
  const contextArray = [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
  
  return reverseValues ? !contextArray[index] : contextArray[index];
}

function fillCourseForm(eval, shouldSubmit) {
  const reverseValues = eval === '0';

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < 29; i++) {
    const selectElement = document.getElementsByClassName('custom-select')[i];
    selectElement.value = getContext(i, reverseValues) ? getRandomValue(1, 2) : getRandomValue(3, 4);
  }

  const lastSelectElement = document.getElementsByClassName('custom-select')[29];
  lastSelectElement.value = reverseValues ? getRandomValue(1, 2) : getRandomValue(3, 4);

  document.querySelector('input[type="text"].form-control[size="31"]').value = 'Not sure';

  if (shouldSubmit) {
    const submitButton = document.getElementById('id_savevalues');
    submitButton.click();
  }
}
