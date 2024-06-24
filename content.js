const runtime = chrome.runtime || browser.runtime;

runtime.onMessage.addListener(({ action, eval, autoSubmit }) => {
  if (action === "fillForm") {
    fillCourseForm(eval, autoSubmit);
  }

  if (action === "scan") {
    scanPage();
  }

  if(action === 'evaluateAll' ) {
    evaluateAll()
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

function evaluateAll() {

  const coursesOfferedDOM = document.querySelectorAll('.aalink.coursename');
  const feedBackID = extractFeedbackID();

  const evaluateCourse = async (courseIndex) => {
    if (courseIndex >= coursesOfferedDOM.length) {
      runtime.sendMessage({
        action: 'handleFinishedEvaluation'
      });
      return;
    }

    const href = coursesOfferedDOM[courseIndex].href;
    const courseId = href.split('=')[1];
    const url = `https://moodle.cu.edu.ng/mod/feedback/complete.php?id=${feedBackID}&courseid=${courseId}`;

    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const isCompleted = doc.querySelector('.alert.alert-danger');

    if (!isCompleted) {
      const evalType = document.getElementById('evaluationSelect').value;
      const shouldSubmit = document.getElementById('autoSubmitCheckbox').checked;
      fillCourseForm(evalType, shouldSubmit);
    }

    setTimeout(() => evaluateCourse(courseIndex + 1), 2000);
  };

  evaluateCourse(0);
}


async function scanPage() {
  const coursesOfferedDOM = document.querySelectorAll('.aalink.coursename');

  const feedBackID = extractFeedbackID();

  const evaluationResults = [];

  for (let i = 0; i < coursesOfferedDOM.length; i++) {
    const href = coursesOfferedDOM[i].href;
    const courseId = href.split('=')[1];
    const url = `https://moodle.cu.edu.ng/mod/feedback/complete.php?id=${feedBackID}&courseid=${courseId}`;

    const evaluationResult = await checkEvaluationStatus(url);
    evaluationResults.push(evaluationResult);
  }

  runtime.sendMessage({
    action: 'updatePopup',
    numberOfCoursesOffered: coursesOfferedDOM.length,
    numberOfCompletedEvaluations: evaluationResults.filter(result => result).length
  });
}

async function checkEvaluationStatus(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Network response was not ok: ${response.statusText}`);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const html = await response.text();
    const result = parseEvaluationPage(html);
    return result;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return 0; // or any other appropriate default value
  }
}

function parseEvaluationPage(html) {
  const completionMessage = new DOMParser().parseFromString(html, 'text/html').querySelector('.alert.alert-danger');

  // Check if the activity is completed
  if (completionMessage && completionMessage.textContent.includes("You've already completed this activity.")) {
    return true; // Activity is completed
  } else {
    return false; // Activity is not completed
  }
}

function extractFeedbackID() {
  const feedbackDOM = document.querySelector('.block_feedback .card-body .card-text.content a');
  return feedbackDOM.href.split('=')[1].split('&')[0];
}