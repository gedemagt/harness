from flask import Flask, render_template, send_from_directory, send_file

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


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()

