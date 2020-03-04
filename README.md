# KITTENWARS

Client web per l'applicativo web e mobile di Kittenwars.

-   Prima installazione: `npm install`
-   Compilazione: `npm run build`

L'applicativo usa TypeScript come linguaggio principale e Webpack per compiare il tutto in un unico file `main.js`. 
I file compilati sono presenti nella cartella `dist`.

Per eseguire l'applicativo, copiare i file dalla cartella `dist` alla cartella `statics` del [server web](https://github.com/loribonna/kittenwars-server).

Test:

-   `npm run test`
-   La maggior parte dei componenti effettuano operazioni CRUD basiche. L'unico test effettuato si trova in `dto.spec.ts` per verificare il funzionamento dei DTO.

## Traccia concordata

Tecnologie:

-   Backend realizzato tramite il framework NestJS. Questa scelta è motivata dal fatto che ho già utilizzato Django per una tesina progettuale, per cui vorrei utilizzare un framework diverso.
-   App mobile realizzata tramite React Native.
-   Interfaccia Web realizzata tramite React. Gli utenti amministratori avranno funzionalità avanzate tramite questa.

Funzionalità:

-   Autenticazione tramite i principali OAuth provider, sfruttando la libreria PassportJS.
-   All’utente autenticato viene permesso di:
-   Votare le immagini, selezionando tra due proposte.
-   Inserire nuove immagini -> scatto foto. Queste verranno proposte ad un amministratore prima di venire inserite nel sistema di votazione.
-   Vedere il proprio punteggio.
-   Vedere una classifica di punteggi e la propria posizione in essa.
-   Visualizzare le immagini più votate e meno votate.
-   All’utente non autenticato viene permesso solo di visualizzare le immagini più votate e meno votate.
