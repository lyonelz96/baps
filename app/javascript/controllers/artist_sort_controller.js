import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="artist-sort"
export default class extends Controller {
    connect() {
        console.log(this.element)
    }
}
