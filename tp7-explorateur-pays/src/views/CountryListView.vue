<template>
  <section>
    <input
      v-model="recherche"
      type="search"
      class="search"
      placeholder="Rechercher un pays par nom…"
    />

    <p v-if="loading" class="state">Chargement des pays…</p>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="chargerPays">Réessayer</button>
    </div>

    <template v-else>
      <p class="count">{{ paysAffiches.length }} pays</p>
      <p v-if="paysAffiches.length === 0" class="state">Aucun résultat.</p>
      <div class="grid">
        <CountryCard
          v-for="country in paysAffiches"
          :key="country.cca3"
          :country="country"
        />
      </div>
    </template>
  </section>
</template>

<script>
import CountryCard from '../components/CountryCard.vue'

const API_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca3,flags,capital,region,population'

export default {
  name: 'CountryListView',
  components: { CountryCard },
  data() {
    return {
      countries: [],
      recherche: '',
      loading: false,
      error: null
    }
  },
  computed: {
    paysAffiches() {
      const terme = this.recherche.trim().toLowerCase()
      if (!terme) return this.countries
      return this.countries.filter((country) =>
        country.name.common.toLowerCase().includes(terme)
      )
    }
  },
  mounted() {
    this.chargerPays()
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      try {
        const reponse = await fetch(API_URL)
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`)
        const data = await reponse.json()
        this.countries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )
      } catch (e) {
        this.error = 'Impossible de charger les données.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.search { width: 100%; padding: 12px 14px; font-size: 1rem; border: 1px solid #ccd; border-radius: 8px; margin-bottom: 12px; }
.count { color: #666; margin: 0 0 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
</style>
