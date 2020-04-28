entrate sul utente postgres con il seguente commando
```
su -l postgres
```
e poi create il utente monty con la password python (al ultima cosa che vi chiede li dite di si )
```
createuser --interactive --pwprompt
```
in fine create il db per pokemon_fansite
```
createdb -O monty pokemon_fansite
```
in fine andate dal vostro caro pg admin cercate il db appena creato aprite il query tool e fatte il drag and drop del file pokemon_fansite.sql che trovate su questo directory