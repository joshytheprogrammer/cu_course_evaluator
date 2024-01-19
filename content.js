const runtime = chrome.runtime || browser.runtime;

runtime.onMessage.addListener(function(message) {
  if (message.action === "fillForm") {
    fillCourseForm(message.eval, message.autoSubmit);
  }
});

function fillCourseForm(eval, shouldSubmit) {
  const reverseValues = eval === '0';

  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < 31; i++) {
    document.getElementsByClassName('custom-select')[i].value = reverseValues ? getRandomValue(3, 4) : getRandomValue(1, 2)
  }
  
  document.querySelector('input[type="text"].form-control[size="31"]').value = 'Not sure'

  if (shouldSubmit) {
    const submitButton = document.getElementById('id_savevalues');
    submitButton.click();
  }

}
