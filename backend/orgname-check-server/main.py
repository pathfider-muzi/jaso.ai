from pororo import Pororo
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
ner = Pororo(task="ner", lang="ko")

@app.route("/orgname-check", methods=["POST"])
def index():
    if request.method == "POST":
        requestText = request.get_json(silent=True)
        if requestText is None:
            return jsonify({"error": "no input data"})
        try:
            print(requestText)
            nerText = ner(requestText['text'])
            return jsonify({'text': nerText})
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"


if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
