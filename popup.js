const tabsAPI = chrome.tabs || browser.tabs;

document.addEventListener('DOMContentLoaded', function() {
  const fillFormButton = document.getElementById('fillForm');
  const messageElement = document.getElementById('message');
  const evaluationSelect = document.getElementById('evaluationSelect');
  const checkboxContainer = document.getElementById('checkboxContainer');
  const autoSubmitCheckbox = document.getElementById('autoSubmitCheckbox');

  // Get information about the current active tab
  tabsAPI.query({ active: true, currentWindow: true }, function(tabs) {
    const isMoodlePage = tabs[0].url.startsWith('https://moodle.cu.edu.ng/mod/feedback/complete.php');
    // const isMoodlePage = tabs[0].url.startsWith('https://moodle.cu.edu.ng/');

    // Show/hide elements based on the URL
    fillFormButton.style.display = isMoodlePage ? 'block' : 'none';
    evaluationSelect.style.display = isMoodlePage ? 'block' : 'none';
    checkboxContainer.style.display = isMoodlePage ? 'flex' : 'none';
    messageElement.innerText = isMoodlePage ? '' : 'This feature is not available on this page.';
  });

  // Add click event listener to the fillForm button
  fillFormButton.addEventListener('click', function() {
    const evaluationType = evaluationSelect.value;
    const shouldSubmitAutomatically = autoSubmitCheckbox.checked;

    // Send a message to the content script
    tabsAPI.query({ active: true, currentWindow: true }, function(tabs) {
      tabsAPI.sendMessage(tabs[0].id, { action: 'fillForm', eval: evaluationType, autoSubmit: shouldSubmitAutomatically });
      displaySuccessMessage();
    });
  });
});

function displaySuccessMessage() {
  const fillFormButton = document.getElementById('fillForm');
  const successParagraph = document.getElementById('successText');
  const evalForm = document.getElementById('eval');
  const checkboxContainer = document.getElementById('checkboxContainer');

  fillFormButton.style.display = 'none';
  evalForm.style.display = 'none';
  checkboxContainer.style.display = 'none';
  successParagraph.style.display = 'block';
}

