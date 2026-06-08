from flask import Flask, render_template

app = Flask(__name__)


FORMULAS = {
    "epley": {
        "name": "Epley",
        "equation": "1RM = w × (1 + r/30)",
        "note": "Most common; tends to overestimate for high rep counts.",
    },
    "brzycki": {
        "name": "Brzycki",
        "equation": "1RM = w × 36 / (37 − r)",
        "note": "Most accurate in the 1–10 rep range; breaks down past 10.",
    },
    "lombardi": {
        "name": "Lombardi",
        "equation": "1RM = w × r^0.10",
        "note": "Average across most rep ranges.",
    },
}


@app.route("/")
def index():
    return render_template("index.html", formulas=FORMULAS)


if __name__ == "__main__":
    app.run(debug=True)
