import Contact from "./../Models/Contact.js";

//Script date + plugin
dayjs.extend(window.dayjs_plugin_relativeTime);

const contacts = [
    new Contact('Michele', '_1', true, [{date: '10/01/2021 15:30:55',text: 'Hai portato a spasso il cane?',status: 'sent'}, {date: '10/01/2021 15:50:00',text: 'Ricordati di dargli da mangiare',status: 'sent'}, {date: '2021/01/10 16:15:22',text: 'Tutto fatto!',status: 'received'}]),
    new Contact('Fabio', '_2', true, [{date: '20/03/2021 16:30:00',text: 'Ciao come stai?',status: 'sent'}, {date: '2021/03/20 16:30:55',text: 'Bene grazie! Stasera ci vediamo?',status: 'received'}, {date: '2021/03/20 16:35:00',text: 'Mi piacerebbe ma devo andare a fare la spesa.',status: 'sent'}]),
    new Contact('Samuele', '_3', true, [{date: '28/03/2021 10:10:40',text: 'La Marianna va in campagna',status: 'received'}, {date: '28/03/2021 10:20:10',text: 'Sicuro di non aver sbagliato chat?',status: 'sent'}, {date: '2021/06/29 22:26:22',text: 'Ah scusa!',status: 'received'}]),
    new Contact('Luana', '_4', true, [{date: '10/01/2021 15:30:55',text: 'Lo sai che ha aperto una nuova pizzeria?',status: 'sent'}, {date: '2021/01/10 15:50:00',text: 'Si, ma preferirei andare al cinema',status: 'received'}])
];

//console.log(contacts);

const set = {
    lastAccess: function(obj){
        let date = obj.messages.filter(obj => obj.status === 'received');
        return dayjs(date[date.length - 1].date).fromNow();
    }
}

const app = new Vue(
    {
        el: '#app',
        data: {
            contacts,
            contact: contacts[0],
            lastAccess: set.lastAccess(contacts[0]),
            //contact: this.contact[0] //Non funziona
            message: '',
            listen: false,
            receivedMessage: function(){
                setTimeout(() => { 
                    const obj = {
                        date: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                        text: 'Testo statico di prova',
                        status: 'received'
                    }
                    this.contact.messages.push(obj);
                    this.listen = false;
                    this.lastAccess = 'online';
                }, 2000);
            }

        },
        methods: {
            showMessages: function(index){
                this.contact = this.contacts[index];
                //Set last date
                this.lastAccess = set.lastAccess(this.contact);
            },
            sendMessage: function(){
                const obj = {
                    date: dayjs().format('YYYY/MM/DD HH:mm:ss'),
                    text: this.message,
                    status: 'sent'
                }

                this.contact.messages.push(obj);
                this.message = '';
                this.listen = true;
                this.receivedMessage();
            }
        }
    }
);