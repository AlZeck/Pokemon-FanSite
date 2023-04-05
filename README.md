# Pokemon FanSite
Un fansite sui pokémon che permette di conoscere di più sul loro mondo e di fare battaglie contro la cpu od altri utenti nel simulatore con squadre customizzate.

## Autori
- Juan Sebastian Arboleda Polo (1805920)
- Andrea Cerone (1770688)
- Matteo Di Stadio (1794111)

## Istruzioni per l'uso
L'applicazione è stata creata utilizzando le tecnologie di containerizzazione per assicurare su qualsiasi macchina un corretto funzionamento.
Perciò, per poterla girare in locale è necessaria l'installazione di "docker". Dopodichè per attivare i vari servizi basterà scrivere nell'apposita cartella da terminale in ambiente Linux il seguente comando e recarsi da un browser su "http://localhost:8081":
```sh
docker compose up
```


## Consigli sui browser
L'applicazione è stata progettata con le tecnologie di Chromium in mente (in primis Google Chrome), data la sua diffusione ed importanza nel contesto attuale, perciò si consiglia l'utilizzo di tali browser per la migliore user experience.
È possibile comunque ottenere una prestazione impeccabile anche su Safari.
Se si preferisce invece l'utilizzo di Firefox, per evitare problemi di visualizzazione con la proprietà css "backdrop-filter", è opportuno settare, tramite "about:config", le proprietà "layout.css.backdrop-filter.enabled" e "gfx.webrender.all" a true.
Può inoltre capitare su Windows che i browser mettano una visualizzazione più ingrandità rispetto a Linux, perciò è consigliato diminuire lo zoom ad una adeguata grandezza.

## Licenza & Copyright
L'applicazione è autorizzata sotto la licenza MIT. Vedi il file [`LICENSE`](LICENSE) per il testo completo sul copyright e la licenza.
La nostra applicazione include inoltre proprietà intellettuali provenienti dalla serie videoludica "Pokemon", appartenente alla "The Pokémon Company" e protetta da vari copyright e trademark. Gli autori credono che l'utilizzo di questo materiale sia coperto dal fair use, dato che l'applicazione è di uso inerentemente scolastico ed il software ne risentirebbe severamente dalla sua assenza.


