class Restaurants {
    classification: string
    description: string
    image: string
    infos: string[]
    title: string
    id: number

    constructor(
        id: number,
        classification: string,
        description: string,
        image: string,
        infos: string[],
        title: string
    ) {
        this.id = id
        this.classification = classification
        this.description = description
        this.image = image
        this.infos = infos
        this.title = title
    }
}

export default Restaurants
