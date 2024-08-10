const imageInput = document.getElementById("imageupload");
const submitButton = document.getElementById("submit-button");
const predictionText = document.getElementById("prediction-text");
const confidenceText = document.getElementById("confidence-text");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const imageFile = imageInput.files[0];
  const formData = new FormData();
  formData.append("image", imageFile);

  fetch("http://127.0.0.1:8080/predict", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.prediction);
      const [predictedClass, confidence] = data.prediction;
      predictionText.innerHTML = `Prediction: ${predictedClass}`;
      confidenceText.innerHTML = `Confidence: ${confidence}%`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
