import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="artist-sort"
export default class extends Controller {
    static targets = ['artistCards', 'select', 'search']

    initialize() {
        this.selectTarget.value = 'default'

        if (this.hasArtistCardsTarget) {
            this.default_sort = [...this.artistCardsTarget.children]
        }
    }

    artistsSortSearch() {
        if (this.selectTarget.value === 'default') return

        this.artistsSort(null, this.selectTarget.value)
    }

    artistsSort(event, val) {
        let sort_opt = val || event.target.value
        let artists = [...this.artistCardsTarget.children]

        if (sort_opt === 'default' && this.searchTarget.value === '') {
            artists = [...this.default_sort]
        }
        else if (sort_opt === 'alphabetical-az') {
            this.alphabeticalSort(artists)
        }
        else if (sort_opt === 'alphabetical-za') {
            this.alphabeticalSort(artists, true)
        }
        else if (sort_opt === 'followers-lohi') {
            this.followersSort(artists)
        }
        else if (sort_opt === 'followers-hilo') {
            this.followersSort(artists, true)
        }

        this.artistCardsTarget.replaceChildren(...artists)
    }

    alphabeticalSort(items, reverse = false) {
        const modifier = reverse ? -1 : 1

        items.sort((a, b) => {
            const nameA = a.querySelector('.artist-name').innerText.toUpperCase()
            const nameB = b.querySelector('.artist-name').innerText.toUpperCase()

            if (nameA < nameB) return -1 * modifier
            if (nameA > nameB) return 1 * modifier

            return 0
        })
    }

    followersSort(items, reverse = false) {
        const modifier = reverse ? -1 : 1

        items.sort((a, b) => {
            const followersA = parseInt(a.querySelector('.artist-followers').innerText.replaceAll(',', ''))
            const followersB = parseInt(b.querySelector('.artist-followers').innerText.replaceAll(',', ''))

            return (followersA - followersB) * modifier
        })
    }
}
