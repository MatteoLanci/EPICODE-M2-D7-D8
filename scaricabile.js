/*
?PARTE 1: 
Oggi analizzeremo un problema molto comune: realizzare algoritmi di ricerca.
Il tuo compito è creare una funzione che cercherà per posizione lavorativa E posizione geografica. Questi due valori verranno passati come parametri
Ti abbiamo fornito un array chiamato "jobs" in fondo al file,
! NON modificarlo in alcun modo.

L'algoritmo che devi realizzare cercherà SIA per posizione lavorativa che per posizione geografica.
Prendi queste tre inserzioni ad esempio:

      job1:  location: "NY, US",     title: "java dev"
      job2:  location: "Genoa, IT"   title: "web dev"
      job3:  location: "US"      title: "dev"

Cercando contemporaneamente come posizione lavorativa "dev" e posizione geografica "US", dovresti ottenere come risultato solamente job1 e job3,
in quanto job2 non soddisfa la condizione posta sulla posizione geografica.

*REQUISITI:
- il tuo algoritmo deve tornare i risultati nella seguente forma:
{
  result: [], <-- inserisci qui le inserzioni che rispecchiano la posizione lavorativa e la posizione geografica richiesta
  count: 0 <-- inserisci qui il numero totale delle inserzioni trovate
}

! la parte di traccia barrata non è relativa alla build da seguire in quanto gli oggetti dell'array NON hanno le chiavi e relativi valori 'description', 'requirements' ... 
// - da ogni inserzione trovata, elimina i campi "description", "requirements", "benefits" e "company_profile" per semplificare il risultato

- la tua ricerca deve essere "case insensitive" (non deve essere influenzata da lettere maiuscole o minuscole nelle parole cercate). Questo e' possibile trasformando tutto in lettere minuscole con .toLowerCase()


?PARTE 2: 
Nella pagina HTML, inserisci 2 input di tipo testo (uno per la location e uno per il titolo lavorativo, ricordati di diversificarli con un id) e un bottone con valore “cerca”

Al click del bottone, il codice deve raccogliere i valori dei due input e darli in pasto alla funzione che hai creato nella parte 1. 

Dopo aver raccolto ed elaborato i dati, e’ il momento di mostrare i risultati sulla pagina: 
    Puoi scegliere tu se utilizzare un semplice ul / li oppure una tabella 
    Vai passo per passo e usa molti console.log per capire eventualmente dove sbagli
    SUGGERIMENTO: ti servira’ un ciclo for!

*/

// NON MODIFICARE QUESTO ARRAY!
const jobs = [
  { title: "Marketing Intern", location: "US, NY, New York" },
  {
    title: "Customer Service - Cloud Video Production",
    location: "NZ, Auckland",
  },
  {
    title: "Commissioning Machinery Assistant (CMA)",
    location: "US, IA, Wever",
  },
  {
    title: "Account Executive - Washington DC",
    location: "US, DC, Washington",
  },
  { title: "Bill Review Manager", location: "US, FL, Fort Worth" },
  { title: "Accounting Clerk", location: "US, MD," },
  { title: "Head of Content (m/f)", location: "DE, BE, Berlin" },
  {
    title: "Lead Guest Service Specialist",
    location: "US, CA, San Francisco",
  },
  { title: "HP BSM SME", location: "US, FL, Pensacola" },
  {
    title: "Customer Service Associate - Part Time",
    location: "US, AZ, Phoenix",
  },
  {
    title: "ASP.net Developer Job opportunity at United States,New Jersey",
    location: "US, NJ, Jersey City",
  },
  {
    title: "Talent Sourcer (6 months fixed-term contract)",
    location: "GB, LND, London",
  },
  {
    title: "Applications Developer, Digital",
    location: "US, CT, Stamford",
  },
  { title: "Installers", location: "US, FL, Orlando" },
  { title: "Account Executive - Sydney", location: "AU, NSW, Sydney" },
  {
    title: "VP of Sales - Vault Dragon",
    location: "SG, 01, Singapore",
  },
  { title: "Hands-On QA Leader", location: "IL, Tel Aviv, Israel" },
  {
    title: "Southend-on-Sea Traineeships Under NAS 16-18 Year Olds Only",
    location: "GB, SOS, Southend-on-Sea",
  },
  { title: "Visual Designer", location: "US, NY, New York" },
  {
    title: "Process Controls Engineer - DCS PLC MS Office - PA",
    location: "US, PA, USA Northeast",
  },
  { title: "Marketing Assistant", location: "US, TX, Austin" },
  { title: "Front End Developer", location: "NZ, N, Auckland" },
  { title: "Engagement Manager", location: "AE," },
  {
    title: "Vice President, Sales and Sponsorship (Businessfriend.com)",
    location: "US, CA, Carlsbad",
  },
  { title: "Customer Service", location: "GB, LND, London" },
  { title: "H1B SPONSOR FOR L1/L2/OPT", location: "US, NY, New York" },
  { title: "Marketing Exec", location: "SG," },
  {
    title: "HAAD/DHA Licensed Doctors Opening in UAE",
    location: "AE, AZ, Abudhabi",
  },
  {
    title: "Talent Management Process Manager",
    location: "US, MO, St. Louis",
  },
  { title: "Customer Service Associate", location: "CA, ON, Toronto" },
  {
    title: "Customer Service Technical Specialist",
    location: "US, MA, Waltham",
  },
  { title: "Software Applications Specialist", location: "US, KS," },
  { title: "Craftsman Associate", location: "US, WA, Everett" },
  { title: "Completion Engineer", location: "US, CA, San Ramon" },
  { title: "I Want To Work At Karmarama", location: "GB, LND," },
  {
    title: "English Teacher Abroad",
    location: "US, NY, Saint Bonaventure",
  },
];

//! PARTE 1
// l'intera funzione punta a cercare in un array in base a delle keywords impostate dall'utente per filtrare i risultati e mostrare a schermo le inserzioni desiderate;
function jobSearch() {
  let result = [];
  let count = 0;
  let output = document.querySelector("#output");
  let outMsg = document.querySelector("#outputMsg");
  let myForm = document.querySelector("#inputForm");
  let titleKeyword = document.getElementById("titleInput").value;
  let locationKeyword = document.getElementById("locationInput").value;

  // il seguente ciclo 'if' esegue un controllo di integrità per i campi di input dove se sono vuoti non permette alcuna ricerca mostrando un alert relativo;
  if (titleKeyword == "" && locationKeyword == "") {
    outMsg.innerHTML =
      "Devi compilare i campi di ricerca per ottenere un risultato";
    output.innerHTML = "";
    return;
  }

  // il seguente ciclo 'for' itera l'array jobs per confermare o meno se il valore negli input immessi dall'utente sono inclusi nei valori delle rispettive keys dell'array, pushando il risultato in un array di appoggio che viene stampato in console mostrando i soli risultati che includono i valori cercati dall'utente. Inoltre in console viene stampato anche la lunghezza di questo array d'appoggio, il cui valore viene associato alla variabile 'count', quindi mostra il numero di inserzioni trovate in base alla ricerca.
  for (let i = 0; i < jobs.length; i++) {
    titleKeyword = titleKeyword.toLowerCase();
    locationKeyword = locationKeyword.toLowerCase();
    if (
      jobs[i].title.toLowerCase().includes(titleKeyword) &&
      jobs[i].location.toLowerCase().includes(locationKeyword)
    ) {
      result.push(jobs[i]);
      count = result.length;
    } else {
      output.innerHTML = "";
    }
  }
  console.log(result);
  console.log(`${count} risultati trovati`);

  //! PARTE 2
  // il seguente ciclo 'for' itera l'array d'appoggio creata precedentemente e crea nuovi elementi inserendoli nell'ul e facendo visualizzare il risultato all'utente;
  for (let i = 0; i < result.length; i++) {
    output.innerHTML +=
      "<li class='myLi' >" +
      result[i].title +
      " <span class='unify'><strong>in</strong></span> " +
      result[i].location +
      "</li>";
  }

  // questa proprietà permette di svuotare i campi di input automaticamente al momento dell'attivazione della funzione;
  myForm.reset();

  // questo ciclo 'if' permette di avere un messaggio diverso in base se il risultato ha un solo elemento o più di uno;
  if (result.length > 1 || result.length == 0) {
    outMsg.innerHTML = `Ho trovato ${count} risultati dalla tua ricerca ( ${titleKeyword} ${locationKeyword} )`;
  } else {
    outMsg.innerHTML = `Ho trovato ${count} risultato dalla tua ricerca ( ${titleKeyword} ${locationKeyword} )`;
  }
}

// questa funzione associata ad un secondo button consente di mostrare all'utente tutte le inserzioni disponibili nell'array principale, con relativo messaggio di avviso;
let btnShowAll = document.getElementById("btnShowAll");
let output1 = document.querySelector("#output");
let outMsg = document.querySelector("#outputMsg");

btnShowAll = btnShowAll.addEventListener("click", function () {
  for (let i = 0; i < jobs.length; i++) {
    output1.innerHTML +=
      "<li>" +
      jobs[i].title +
      " <span class='unify'><strong>in</strong></span> " +
      jobs[i].location +
      "</li>";

    outMsg.innerHTML = `${jobs.length} risultati trovati. Queste sono tutte le inserzioni trovate sulla piattaforma`;
  }
  console.log(jobs);
  let count = jobs.length;
  console.log(count);
});

// questa funzione associata ad un terzo button permette di resettare l'intera pagina e permettere una nuova ricerca;
function clearAll() {
  let output = document.querySelector("#output");
  let outMsg = document.querySelector("#outputMsg");

  output.innerHTML = "";
  outMsg.innerHTML = "";
}
