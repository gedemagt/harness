import os
import random
import math

from flask import Flask, render_template, send_from_directory, send_file, jsonify

app = Flask(__name__, static_folder='static')


@app.route("/image/<path>")
def images(path):
    return send_file(f"static/images/{path}", mimetype='image/gif')


@app.route("/audio/<path>")
def audio(path):
    return send_file(f"static/audio/{path}", mimetype='image/gif')


@app.route("/js/<path>")
def js(path):
    return send_from_directory("templates", path)


@app.route("/css/<path>")
def css(path):
    return send_from_directory("templates", path)


@app.route("/content")
def content():
    result = []
    for p in sorted(os.listdir("static/texts")):
        with open(f"static/texts/{p}") as f:
            result.append(f.read())

    return jsonify(result)


@app.route("/")
def index():

    n = len(os.listdir("static/texts"))

    delta_deg = 360.0 / n

    thetas = [x * delta_deg * math.pi / 180.0 for x in range(n)]
    rs = [random.randrange(25, 40) for _ in range(n)]

    pos = [(math.cos(t)*r + 50, math.sin(t)*r + 50) for t,r in zip(thetas, rs)]

    return render_template('index.html', pos=pos)


if __name__ == "__main__":
    app.run()

