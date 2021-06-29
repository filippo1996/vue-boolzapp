/**
 * @copyright Filippo Mazzamuto
 */
export default class Contact{

    /**
     * 
     * @param {string} name 
     * @param {string} avatar 
     * @param {boolean} visible 
     * @param {array} messages 
     */
    constructor(name, avatar, visible, messages){
        this.name = name;
        this.avatar = avatar;
        this.visible = visible;
        this.messages = messages;
    }
}