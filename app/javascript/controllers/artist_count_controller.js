import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="artist-count"
export default class extends Controller {
    static targets = ['artistCards', 'count']

    updateCount() {
        const count = this.artistCardsTarget.children.length
        this.countTarget.innerText = count
    }
}
