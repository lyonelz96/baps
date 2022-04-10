import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="artist-sort"
export default class extends Controller {
    static targets = ['columns', 'select']

    initialize() {
        if (this.hasColumnsTarget) {
            this.default_sort = [...this.columnsTarget.children]
        }
    }

    connect() {
        this.artistsSort(null, this.selectTarget.value)
    }

    artistsSort(event, val) {
        let sort_opt = val || event.target.value
        let artists = [...this.default_sort]

        if (sort_opt === 'alphabetical-asc') {
            this.alphabeticalSort(artists)
        }
        else if (sort_opt === 'alphabetical-desc') {
            this.alphabeticalSort(artists, true)
        }
        else if (sort_opt === 'followers-asc') {
            this.followersSort(artists)
        }
        else if (sort_opt === 'followers-desc') {
            this.followersSort(artists, true)
        }

        this.columnsTarget.replaceChildren(...artists)
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
