document.addEventListener('DOMContentLoaded', function() {
  const fillFormButton = document.getElementById('fillForm');
  const messageElement = document.getElementById('message');
  const evaluationSelect = document.getElementById('evaluationSelect');

  // Get information about the current active tab
  browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const isMoodlePage = tabs[0].url.startsWith('https://moodle.cu.edu.ng/mod/feedback/complete.php');
    // const isMoodlePage = tabs[0].url.startsWith('https://moodle.cu.edu.ng/');

    // Show/hide elements based on the URL
    fillFormButton.style.display = isMoodlePage ? 'block' : 'none';
    evaluationSelect.style.display = isMoodlePage ? 'block' : 'none';
    messageElement.innerText = isMoodlePage ? '' : 'This feature is not available on this page.';
  });

  // Add click event listener to the fillForm button
  fillFormButton.addEventListener('click', function() {
    const evaluationType = evaluationSelect.value;
    // Send a message to the content script
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, { action: 'fillForm', eval: evaluationType });
      displaySuccessMessage();
    });
  });
});

function displaySuccessMessage() {
  const fillFormButton = document.getElementById('fillForm');
  const successParagraph = document.getElementById('successText');
  const evalForm = document.getElementById('eval');

  fillFormButton.style.display = 'none';
  evalForm.style.display = 'none';
  successParagraph.style.display = 'block';
}
