export default class Photographer {
    constructor(data) {
        const {
            name,
            id,
            city,
            country,
            tagline,
            price,
            portrait
        } = data;

        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }
}