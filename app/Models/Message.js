/**
 * Array di messaggi randomizzato che invierà il server in risposta
 */
export default function message(callback){
    const messages = [
        'Ho detto di noooo', 'Cosaaaa?', 'Può darsi',
        'Io ti amo lilli', 'Ti odio', 'Tu mi tradisci...',
        'Sei falso Gianmmarco', 'okkkkk', 'Sono al mare, tu?'
    ];
    //Callback per la randomizzazione
    let index = callback(0, messages.length - 1);
    return messages[index];
};