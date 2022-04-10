import { Controller } from "@hotwired/stimulus"
import Fuse from "fuse.js"

// Connects to data-controller="fuzzy-search"
export default class extends Controller {
    static targets = ['input', 'artist_cards']

    initialize() {
        this.initial_artists_cards = [...this.artist_cardsTarget.children]
        this.artists_objs = this.initial_artists_cards.map(c => {
            return {
                el: c,
                name: c.querySelector('.artist-name').innerText,
            }
        })
    }

    search(event) {
        if (event.target.value === '') {
            this.artist_cardsTarget.replaceChildren(...this.initial_artists_cards)
        }
        else {
            const fuse = new Fuse(this.artists_objs, {
                keys: ['name'],
                threshold: 0.4
            })

            const results = fuse.search(event.target.value)

            this.artist_cardsTarget.replaceChildren(...results.map(artist => {
                return artist.item.el
            }))
        }
    }
}
