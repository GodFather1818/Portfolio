document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here

  let downloadButton = document.getElementById("resume");
  downloadButton.addEventListener("click", downloadResume);

 

  function downloadResume() {
    // Replace this with the correct path to your resume file on the server
    const resumeFilePath = "SAHIL_RESUME.pdf";

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = resumeFilePath;
    downloadLink.download = "Sahil_Resume.pdf"; // Provide the desired file name for download

    // Append the anchor element to the document body and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Remove the anchor element from the document body
    document.body.removeChild(downloadLink);
  }
});
