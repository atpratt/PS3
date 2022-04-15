# PS3
COMP333 Problem Set 3
Andrew Pratt and Wilson McCloy 

In order to run app open two console tabs then

1.) For Django:
cd backend \
&& python3 manage.py migrate \
&& python3 manage.py loaddata initial.json \
&& python3 manage.py runserver

2.) For React:
cd frontend \
&& npm install \
&& npm start

Features we implemented:
-Sort songs by title, artist, or rating
-Full song catalogue using MUI cards. Can hide a card, then refresh to see all songs again
-Link "hottest song"
-Create and see artist biographies