FROM python:3.9.16

WORKDIR /app
COPY . /app
RUN pip install flask
RUN pip install pymongo
EXPOSE 8080
CMD ["python3", "main.py"]