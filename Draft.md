# Pokemon FanSite - That's one small step for a Pikachu, one giant leap for a FAT PIKACHU

## DESCRIZIONE
Un fansite sui pokemon che permette di conoscere di più sul loro mondo e di fare battaglie contro la cpu nel simulatore semplificato con squadre customizzate.

-------------------------------------

## UTENTI
Da visitatore un utente può navigare per il sito ed accedere a tutti i contenuti meno il simulatore.
Se invece si è fatta la registrazione un utente può anche partecipare a ciò.


## REGISTRAZIONE & LOGIN
- username	(univoco per utente)
- password	(con verifica password durante registrazione)

-------------------------------------

## BARRA DI NAVIGAZIONE
Presente su tutte le schermate (meno quella della battaglia vera e propria), per collegare al meglio alcune funzionalità di base.

Contiene un bottone (a forma di logo Pokemon) per tornare alla Home Page, una barra di ricerca, e poi se si è un visitatore ci stanno i pulsanti per sign-up e login, mentre se si è loggati ci stanno i pulsanti per andare al simulatore (go battle!) e logout.


## RICERCA
Tramite una casella di testo nella barra di navigazione per ricercare pokemon, mosse o tipi scrivendo il loro nome (univoco nei tre gruppi).

Se lo trova reindirizza su tale pagina, altrimenti non si muove dalla pagina corrente e fa comparire un messaggio che dice che non esiste.

-------------------------------------

## HOME PAGE
Uguale sia per visitatore che per registrato.

Contiene una breve descrizione dei contenuti con slideshow.

Al di sotto poi ci sono tre riquadri per accedere alle pagine specifiche di Pokedex, Movedex e Typedex.


## POKEDEX
Una pagina a mo di elenco per tutte le diverse specie pokemon disponibili, posizionate tot per riga (in base a quanti pokemon abbiamo nel db) con nome ed artwork (similmente a pokedex di Pokemon Home).

Cliccando su ognuno si viene reindirizzati alla pagina specifica del pokemon.

- PAGINA POKEMON SPECIFICO

	Una pagina specifica su una specie di pokemon. Comprende i suoi nome, typing, statistiche di base, uber-status, artwork, mini sprite, front sprite, back sprite, le mosse disponibili che può apprendere e FORSE le sue diverse voci pokedex. C'è poi un pulsante per tornare al Pokedex.


## MOVEDEX
Una pagina a mo di elenco per tutte le diverse mosse disponibili, posizionate tot per riga (in base a quante mosse abbiamo nel db) in un riquadro con nome e sfondo color-tipo.
Cliccando su ognuno si viene reindirizzati alla pagina specifica della mossa.

- PAGINA MOSSA SPECIFICA

	Una pagina specifica su una mossa. Comprende i suoi nome, tipo, potenza, precisione, categoria (fisico o speciale, niente stato), i pokemon disponibili che possono apprenderla e FORSE la sua descrizione. C'è poi un pulsante per tornare al Movedex.


## TYPEDEX
Una pagina a mo di elenco per tutti i diciotto tipi disponibili, posizionati uno per riga in un riquadro con nome e sfondo color-tipo.
Cliccando su ognuno si viene reindirizzati alla pagina specifica del tipo.

- PAGINA TIPO SPECIFICO

	Una pagina specifica su un tipo. Comprende i suoi tabella dell'efficacia offensiva, tabella dell'efficacia difensiva, i pokemon disponibili di questo tipo (primario o secondario) e le mosse disponibili di questo tipo. C'è poi un pulsante per tornare al Typedex.

-------------------------------------

## SIMULATORE DI BATTAGLIE
Accedibile solo agli utenti registrati, permette di creare delle squadre dai pokemon e dalle mosse disponibili e di testarle in combattimento contro una cpu.

La cpu avrà una squadra casuale e un'IA basilare, che considera solo le efficacie di tipo proprie e dell'avversario per decidere mosse o switch.

La battaglia sarà una versione semplificata di una lotta in singolo pokemon, si tiene infatti conto solo delle statistiche di base, mosse di attacco (fisiche o speciali, niente stato) e senza effetti secondari o condizioni particolari, precisione, brutto colpo, stab (same type attack bonus) e calcolo standard dell'efficacia e del danno.

Riguardo alle animazioni degli attacchi, si userà una (massimo due) semplice immagine animata per tipo della mossa.

Il simulatore si divide in tre fasi:

- PREPARAZIONE:

	Da una schermata di selezione si scelgono sei pokemon (tutti diversi fra loro, di cui solo due uber) e quattro mosse ognuno (tutte diverse cadauno).

	Durante la scelta è possibile vedere le caratteristiche importanti di un pokemon (statistiche, typing, uber-status e mosse disponibili) e di una mossa (tipo, potenza, precisione, categoria).

	Se si vuole invece, c'è un pulsante che sceglie per l'utente casualmente la squadra e il suo movepool.

	Una volta che si ha fatto si può cliccare un pulsante per procedere alla battaglia.

- BATTAGLIA:

	In una schermata apposita (senza barra di navigazione) partirà la battaglia contro la cpu secondo le regole semplificate pokemon.

	In ogni momento l'utente può vedere le info importanti dei pokemon della propria squadra e delle loro mosse, assieme ai pokemon e le mosse noti dell'avversario.

	Ad ogni turno l'utente può poi:
	- forfeittare: viene richiesto se si è sicuri ed in caso affermativo si abbandona la partita senza possibilità di recuperarla e si finisce nella schermata di sconfitta.
	
	- attaccare: si sceglie la mossa del pokemon corrente tra quelle a disposizione.
	
	- switchare: si sceglie di usare il proprio turno per cambiare pokemon con uno ancora attivo in squadra.

- RISULTATO:

	Se si forfeitta o l'avversario sconfigge tutti i nostri pokemon si viene reindirizzati in una schermata di sconfitta.

	Se si sconfiggono tutti i pokemon dell'avversario si viene reindirizzati in una schermata di vittoria.

	In entrambi i casi sono disponibili le seguenti opzioni:
	- fare un'altra partita nuova (riscegliendo la squadra e tutto).
	
	- fare un'altra partita con la stessa nostra squadra e mosse ma avversario diverso.
	
	- fare una rivincita con stessa squadra e mosse per entrambi.
