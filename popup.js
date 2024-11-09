const tabsAPI = chrome.tabs || browser.tabs;
const runtime = chrome.runtime || browser.runtime;

document.addEventListener('DOMContentLoaded', function() {
  const fillFormButton = document.getElementById('fillForm');
  const scanButton = document.getElementById('scan');
  const evaluationSelect = document.getElementById('evaluationSelect');
  const autoSubmitCheckbox = document.getElementById('autoSubmitCheckbox');
  const evaluateAllBtn = document.getElementById('evaluateAll');
  const goHomeBtn = document.getElementById('goHomeBtn');

  const homeErrorMessage = document.getElementById('homeErrorMessage');

  //hide goHomeBtn
  goHomeBtn.style.display = 'none';

  // Get information about the current active tab
  tabsAPI.query({ active: true, currentWindow: true }, function(tabs) {
    const isFormPage = tabs[0].url.startsWith('https://moodle.cu.edu.ng/mod/feedback/complete.php');
    const isHomePage = tabs[0].url === 'https://moodle.cu.edu.ng/my/';

    if (isHomePage) { 
      // disable evaluate all button
      evaluateAllBtn.disabled = true;
      evaluateAllBtn.innerHTML = 'Loading...';

      toHomePage()
      scanPage(tabsAPI, tabs);
    }
    
    if (isFormPage) {
      toFillPage()
    }

    if (!isFormPage && !isHomePage) {
      to404Page()
    }
    
  });

  // Add click event listener to the goHome button and go to home page
  goHomeBtn.addEventListener('click', function() {
    toHomePage()
    console.log('Coming soon')
  });

  document.getElementById('visitSiteLink').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://joshytheprogrammer.com' });
  });

  document.getElementById('visitExtensionLink').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://joshytheprogrammer.com/extensions/cu-course-evaluator' });
  });

  document.getElementById('visitReportFormLink').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://forms.gle/M3H5ogUDSwhPyZSCA' });
  });

  document.getElementById('externalVisitMoodleHomeLink').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.update(tabs[0].id, { url: 'https://moodle.cu.edu.ng/my/' });
    });

    toHomePage();
  });

  // Add click event listener to the fillForm button
  fillFormButton.addEventListener('click', function() {
    const evaluationType = evaluationSelect.value;
    const shouldSubmitAutomatically = autoSubmitCheckbox.checked;

    // Send a message to the content script
    tabsAPI.query({ active: true, currentWindow: true }, function(tabs) {
      tabsAPI.sendMessage(tabs[0].id, { action: 'fillForm', eval: evaluationType, autoSubmit: shouldSubmitAutomatically });
      toSuccessPage();
    });
  });

  // Add click event listener to the fillForm button
  evaluateAllBtn.addEventListener('click', function() {
    evaluateAllBtn.disabled = true;
    evaluateAllBtn.innerHTML = 'Evaluating...';

    // Send a message to the content script
    tabsAPI.query({ active: true, currentWindow: true }, function(tabs) {
      tabsAPI.sendMessage(tabs[0].id, { action: 'evaluateAll' });
    });

    
  });

  runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updatePopup') {
      const numberOfCoursesOfferedElement = document.getElementById('numberOfCoursesOffered');
      const numberOfCompletedEvaluationsElement = document.getElementById('numberOfCompletedEvaluations');

      numberOfCoursesOfferedElement.textContent = request.numberOfCoursesOffered;
      numberOfCompletedEvaluationsElement.textContent = request.numberOfCompletedEvaluations;

      if(request.numberOfCoursesOffered === 0) {
        homeErrorMessage.innerText="Could not find any registered courses. Try waiting for the page to finish loading.";
      }

      // enable evaluate all button
      evaluateAllBtn.disabled = true;
      evaluateAllBtn.innerHTML = 'Evaluate All';

      // show error message
      homeErrorMessage.hidden = false;
    }

    if (request.action === 'handleFinishedEvaluation') {
      console.log('Evaluation done')
    }
  });
});


function scanPage(tabsAPI, tabs){
  tabsAPI.sendMessage(tabs[0].id, { action: 'scan' });
}

function changePage(fromPage, toPage) {
  fromPage.style.display = 'none';
  toPage.style.display = 'block';
}

function toHomePage() {
  const homePage = document.getElementById('home');
  const fillPage = document.getElementById('fill');
  const noPage = document.getElementById('noPage');
  const successPage = document.getElementById('success');
  const errorPage = document.getElementById('error');

  changePage(fillPage, homePage);
  changePage(noPage, homePage);
  changePage(successPage, homePage);
  changePage(errorPage, homePage);
} 

function toFillPage() {
  const homePage = document.getElementById('home');
  const fillPage = document.getElementById('fill');
  const noPage = document.getElementById('noPage');
  const successPage = document.getElementById('success');
  const errorPage = document.getElementById('error');

  changePage(homePage, fillPage);
  changePage(noPage, fillPage);
  changePage(successPage, fillPage);
  changePage(errorPage, fillPage);
}

function to404Page() {
  const homePage = document.getElementById('home');
  const fillPage = document.getElementById('fill');
  const noPage = document.getElementById('noPage');
  const successPage = document.getElementById('success');
  const errorPage = document.getElementById('error');

  changePage(homePage, noPage);
  changePage(fillPage, noPage);
  changePage(successPage, noPage);
  changePage(errorPage, noPage);
}

function toSuccessPage() {
  const homePage = document.getElementById('home');
  const fillPage = document.getElementById('fill');
  const noPage = document.getElementById('noPage');
  const successPage = document.getElementById('success');
  const errorPage = document.getElementById('error');

  changePage(homePage, successPage);
  changePage(fillPage, successPage);
  changePage(noPage, successPage);
  changePage(errorPage, successPage);
}

function toErrorPage() {
  const homePage = document.getElementById('home');
  const fillPage = document.getElementById('fill');
  const noPage = document.getElementById('noPage');
  const successPage = document.getElementById('success');
  const errorPage = document.getElementById('error');

  changePage(homePage, errorPage);
  changePage(fillPage, errorPage);
  changePage(noPage, errorPage);
  changePage(successPage, errorPage);
}

