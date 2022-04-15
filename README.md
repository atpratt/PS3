# PS3
COMP333 Problem Set 3
Andrew Pratt and Wilson McCloy 

In order to run app open two console tabs then

1.) For Django:

cd backend

source my-venv/bin/activate

python3 manage.py migrate

python3 manage.py loaddata initial.json

python3 manage.py runserver

2.) For React:

cd frontend

npm install

npm add axios

npm add bootstrap reactstrap

npm start

Features we implemented:

-Sort songs by title, artist, or rating

-Full song catalogue using MUI cards. Can hide a card, then refresh to see all songs again

-Sort

-Average Rating

-Youtube link to "hottest song"

-Create and see artist biographies

UI Tips

Song List

- Able to sort based on different feaut
Create New Rating 
- able to create new ratings with valid users and songs
- able to update ratings and delete ratings
Create New Attribute 
- able to create new attributes
- able to delete attributes
Create New Songs
- Erros in adding and editting songs
- Able to delete songs and after a refresh changes are shown in the songlist cards
