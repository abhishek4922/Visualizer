from flask import Flask, request, jsonify
from gradio_client import Client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend
client = Client("https://498c3d365246c38cb3.gradio.live")

@app.route("/generate_storyboard", methods=["POST"])
def generate_storyboard():
    data = request.json
    narrative = data.get("narrative", "")
    style = data.get("style_value", "Anime")
    try:
        html = client.predict(
            narrative=narrative,
            style_value=style,
            api_name="/predict"
        )
        return jsonify({"html": html})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
