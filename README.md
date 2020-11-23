# DucknRoll
duck-typed data for scientists (and Freshworks hiring teams)

## Summary
My development notes were stored in "outline.txt" and should give a rough approximation of how I tackled this project. I laid out some steps with
regards to how I wanted to tackle the problem. I didn't get around to prettifying the page or Dockerising it properly, but I did get most of the expected
functionality working in pure Django within 3 hours so I'm happy about that. All in all, I spend about 9 hours building the actual webpage, and
another 2 on writing out the documentation / scripts.

## Running the program
I spent a bit of bonus time writing some bash scripts to automate the setup and teardown of the webpage. They don't work quite as well as I want them
to, but at the very least "run-page.sh" should give some solid indication of the steps required to get this application up and running:

0.  installing gdal and python3-gdal onto the system may be a prerequisite to getting this site running properly? I'm not sure.

1. Run the PostGIS database from Podman / Docker using the following command:
```
$ podman run --name=postgis -d -e POSTGRES_USER=user001 -e POSTGRES_PASS=123456789 -e POSTGRES_DBNAME=gis -p 5432:5432 kartoza/postgis:9.6-2.4
```
2. Set up the python virtual environment (should be using python3):
```
$ python -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```
3. Set up and run the Django server (either in the background or in a separate terminal)
```
$ cd ducknroll
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver &
```

4. Run the frontend server
```
$ cd ../ducknroll-frontend
$ yarn start
```

The end result should be an empty table which you can populate as much as you want! I was going to initialise the database with some values but
alas... not enough time. 

## Final Notes
I would like to note that opening up Django's administration page to the public would have totally trivialised this assignment. It has built-in form
submission and integration with the GeoDjango module... but it would have also given them the ability to delete and modify data. Subclassing the admin
interface would have been an interesting alternative solution to this problem. I stopped trying to write it all in Django once the generic view
classes started causing me trouble, but I made some progress.

If I had more time, I would have focused it on making form validation more robust and apparent to the user. I also would have liked to add better
design, switch to a deployment build, and to fix the questionable state management that I used to build the front-end. 

Ultimately, this project was a lot of fun! Thanks for the challenge
