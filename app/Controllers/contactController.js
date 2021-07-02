import Contact from "./../Models/Contact.js";
import message from "./../Models/Message.js";

//Script date + plugin
dayjs.extend(window.dayjs_plugin_relativeTime);

let contacts = [
    new Contact('Michele', '_1', true, [{date: '10/01/2021 15:30:55',text: 'Hai portato a spasso il cane?',status: 'sent'}, {date: '10/01/2021 15:50:00',text: 'Ricordati di dargli da mangiare',status: 'sent'}, {date: '2021/01/10 16:15:22',text: 'Tutto fatto!',status: 'received'}]),
    new Contact('Fabio', '_2', true, [{date: '20/03/2021 16:30:00',text: 'Ciao come stai?',status: 'sent'}, {date: '2021/03/20 16:30:55',text: 'Bene grazie! Stasera ci vediamo?',status: 'received'}, {date: '2021/03/20 16:35:00',text: 'Mi piacerebbe ma devo andare a fare la spesa.',status: 'sent'}]),
    new Contact('Samuele', '_3', true, [{date: '28/03/2021 10:10:40',text: 'La Marianna va in campagna',status: 'received'}, {date: '28/03/2021 10:20:10',text: 'Sicuro di non aver sbagliato chat?',status: 'sent'}, {date: '2021/06/29 22:26:22',text: 'Ah scusa!',status: 'received'}]),
    new Contact('Luana', '_4', true, [{date: '10/01/2021 15:30:55',text: 'Lo sai che ha aperto una nuova pizzeria?',status: 'sent'}, {date: '2021/01/10 15:50:00',text: 'Si, ma preferirei andare al cinema',status: 'received'}])
];

//console.log(contacts);

/**
 * Funzione che recupera il valore dalla local storage
 */
const contactsLocalStorage = () => {
    //Leggiamo la chiave contacts situata in local storage
    const localContacts = localStorage.getItem('contacts');
    if(localContacts){ //Verifichiamo che esista
        //Se esiste parsifichiamo l'oggetto JSON in array di oggetti javascript
        const contactsArr = JSON.parse(localContacts); 
        if(contactsArr){ //Verifichiamo che la parsificazione non restituisca null
            //Passiamo l'array parsificato alla variabile contacts per gestire tutta la logica del programma
            contacts = contactsArr;
        }
    }
};

/**
 * Funzione che salva il valore nella Local Storage
 */
const saveContactLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
};


//Oggetto con metodi
const get = {
    lastAccess: function(obj){
        let date = obj.messages.filter(obj => obj.status === 'received');
        return dayjs(date[date.length - 1]?.date).fromNow();
    },
    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    scrollChat: function(){
        const scroll = document.getElementById('scroll');
        scroll.scrollTop = scroll.scrollHeight;
    }
}

//A ogni aggiornamento recuperiamo il valore dalla local storage
contactsLocalStorage();

const app = new Vue(
    {
        el: '#app',
        data: {
            contacts,
            //contact: this.contact[0] //Non funziona
            contact: contacts[0],
            lastAccess: get.lastAccess(contacts[0]),
            message: '',
            listen: false,
            search: ''

        },
        updated(){
            //A ogni aggiornamento scrolliamo i messaggi in fondo la pagina
            get.scrollChat();
        },
        mounted(){
            //Al primo caricamento della pagina scrolliamo i messaggi in fondo la pagina
            get.scrollChat();
        },
        methods: {
            showMessages: function(index){
                this.contact = this.contacts[index];
                //get last date
                this.lastAccess = get.lastAccess(this.contact);
            },
            sendMessage: function(){
                const obj = {
                    date: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                    text: this.message,
                    status: 'sent'
                }

                this.contact.messages.push(obj);
                //Save obj in local storage
                saveContactLocalStorage();
                this.message = '';
                this.listen = true;
                this.receivedMessage();
            },
            receivedMessage: function(){
                setTimeout(() => { 
                    const obj = {
                        date: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                        text: message(get.randomNumber),
                        status: 'received'
                    }
                    this.contact.messages.push(obj);
                    get.scrollChat(100);
                    //Save obj in local storage
                    saveContactLocalStorage();
                    this.listen = false;
                    this.lastAccess = 'online';
                }, 2000);
            },
            deleteMessage: function(index){
                this.contact.messages.splice(index, 1);
                //Save obj in local storage
                saveContactLocalStorage();
            }
        },
        computed: {
            searchContact: {
                get: function(){
                    return this.search;
                },
                set: function(word){
                    this.contacts = contacts.filter(obj => obj.name.toLowerCase().includes(word.toLowerCase()));
                    this.search = word;
                }
            }
        }
    }
);