const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const sampleText = document.getElementById("sample_text");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
sampleText.addEventListener("click", enterSampleText);

// First, we disable the submit button by default when the user loads the website.
submitButton.disabled = true;

function verifyTextLength(e) {
  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textarea = e.target;

  // Check if the text in the text area is the right length - between 200 and 100,000 characters
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function enterSampleText(e) {
  textArea.value = "Servers play a vital role in modern digital infrastructure. They are specialized computers designed to store, manage, and process data, applications, and services. Acting as central repositories, servers respond to requests from client devices like computers, smartphones, or other servers over a network, such as the internet.These robust machines handle a diverse range of tasks. Web servers host websites, serving web pages to users who access them through browsers. Application servers manage and run software applications, facilitating their execution and ensuring smooth performance. Database servers store and organize data, allowing efficient retrieval and manipulation of information for various applications.In addition to these core components, servers also play a crucial role in enabling communication between different devices and services."  
}

function submitData(e) {
  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

// Send the text to the server using fetch API

// Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");

    })
    .catch(error => {
      console.log(error.message);
    });
}