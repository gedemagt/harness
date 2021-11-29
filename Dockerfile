FROM python:3.8-alpine

COPY . .

RUN pip3 install flask gunicorn

CMD ["gunicorn", "-b", "0.0.0.0:8000", "main:app"]