export default class Media {
    constructor(data) {
        const {
            id,
            photographerId,
            title,
            likes,
            date,
            price
        } = data;

        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}