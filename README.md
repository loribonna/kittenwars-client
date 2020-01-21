# KITTENWARS

## Client

Tecnologie:
-	Backend realizzato tramite il framework NestJS. Questa scelta è motivata dal fatto che ho già utilizzato Django per una tesina progettuale, per cui vorrei utilizzare un framework diverso.
-	App mobile realizzata tramite React Native.
-	Interfaccia Web realizzata tramite React. Gli utenti amministratori avranno funzionalità avanzate tramite questa.

Funzionalità:
-	Autenticazione tramite i principali OAuth provider, sfruttando la libreria PassportJS.
-	All’utente autenticato viene permesso di:
o	Votare le immagini, selezionando tra due proposte.
o	Inserire nuove immagini. Queste verranno proposte ad un amministratore prima di venire inserite nel sistema di votazione.
o	Vedere il proprio punteggio.
o	Vedere una classifica di punteggi e la propria posizione in essa.
o	Visualizzare le immagini più votate e meno votate. 
-	All’utente non autenticato viene permesso solo di visualizzare le immagini più votate e meno votate.
