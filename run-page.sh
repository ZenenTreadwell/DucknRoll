#!/bin/bash

# podman > docker
if command -v podman
then
    podman run --name=postgis -d -e POSTGRES_USER=user001 -e POSTGRES_PASS=123456789 -e POSTGRES_DBNAME=gis -p 5432:5432 kartoza/postgis:9.6-2.4
else
    docker run --name=postgis -d -e POSTGRES_USER=user001 -e POSTGRES_PASS=123456789 -e POSTGRES_DBNAME=gis -p 5432:5432 kartoza/postgis:9.6-2.4
fi

# set up the environment
alias "python"=python3

if [ ! -d "venv" ]; then
    python -m venv venv
else
    echo "You already have a virtualenv, great!"
fi

source venv/bin/activate
pip install -r requirements.txt

echo "Waiting for postgres to wake up..."
sleep 5
while ! nc -z localhost 5432; do
    echo "...waiting"
    sleep 5
done

echo "Postgres is running!"

# run the backend
cd ducknroll
python manage.py makemigrations
python manage.py migrate
python manage.py runserver &
echo $! > ../DJANGO_SERVER_PID
cd ../ducknroll-frontend
yarn start

