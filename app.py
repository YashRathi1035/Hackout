from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model("model.h5")

class_labels = ["Healthy", "Powdery", "Rust"]


@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    image = tf.image.decode_image(file.read(), channels=3)
    image = tf.image.resize(image, [256, 256])
    image = tf.expand_dims(image, 0)
    prediction = model.predict(image)

    predicted_class = class_labels[np.argmax(prediction[0])]
    confidence = round(100 * np.max(prediction[0]), 2)

    return jsonify({"prediction": [predicted_class, confidence]})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
