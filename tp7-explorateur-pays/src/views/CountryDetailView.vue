<template>
  <section>
    <router-link to="/" class="back">← Retour à la liste</router-link>

    <p v-if="loading" class="state">Chargement…</p>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="chargerPays">Réessayer</button>
    </div>

    <article v-else-if="country" class="detail">
      <img :src="country.flags.svg || country.flags.png" :alt="country.flags.alt || 'Drapeau'" />
      <div class="info">
        <h1>{{ country.name.common }}</h1>
        <p class="official">{{ country.name.official }}</p>
        <ul>
          <li><strong>Capitale :</strong> {{ country.capital ? country.capital.join(', ') : '—' }}</li>
          <li><strong>Région :</strong> {{ country.region }}<span v-if="country.subregion"> ({{ country.subregion }})</span></li>
          <li><strong>Population :</strong> {{ country.population.toLocaleString('fr-FR') }}</li>
          <li><strong>Superficie :</strong> {{ country.area ? country.area.toLocaleString('fr-FR') + ' km²' : '—' }}</li>
          <li><strong>Langues :</strong> {{ langues }}</li>
          <li><strong>Monnaies :</strong> {{ monnaies }}</li>
          <li>
            <strong>Voisins :</strong>
            <span v-if="!country.borders || !country.borders.length">aucun</span>
            <router-link
              v-for="b in country.borders"
              :key="b"
              :to="{ name: 'detail', params: { code: b } }"
              class="tag"
            >{{ b }}</router-link>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script>
const FIELDS =
  'name,cca3,flags,capital,region,subregion,population,area,languages,currencies,borders'

export default {
  name: 'CountryDetailView',
  data() {
    return {
      country: null,
      loading: false,
      error: null
    }
  },
  computed: {
    langues() {
      const l = this.country && this.country.languages
      return l ? Object.values(l).join(', ') : '—'
    },
    monnaies() {
      const c = this.country && this.country.currencies
      return c
        ? Object.values(c).map((m) => `${m.name} (${m.symbol || ''})`).join(', ')
        : '—'
    }
  },
  watch: {
    // Bonus : le composant est réutilisé quand on passe d'un pays à un autre,
    // mounted ne se redéclenche pas -> on surveille le paramètre de route.
    '$route.params.code'() {
      this.chargerPays()
    }
  },
  mounted() {
    this.chargerPays()
  },
  methods: {
    async chargerPays() {
      const code = this.$route.params.code
      this.loading = true
      this.error = null
      try {
        const reponse = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}?fields=${FIELDS}`
        )
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`)
        const data = await reponse.json()
        // Selon la version : objet unique ou tableau d'un seul objet
        this.country = Array.isArray(data) ? data[0] : data
      } catch (e) {
        this.country = null
        this.error = 'Impossible de charger les données.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.back { display: inline-block; margin-bottom: 16px; color: #1f3a5f; text-decoration: none; }
.detail { display: flex; gap: 28px; flex-wrap: wrap; background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
.detail img { width: 320px; max-width: 100%; height: auto; align-self: flex-start; border: 1px solid #eee; }
.info { flex: 1; min-width: 260px; }
h1 { margin: 0; }
.official { color: #666; margin: 4px 0 16px; }
ul { list-style: none; padding: 0; margin: 0; line-height: 1.9; }
.tag { display: inline-block; margin-left: 6px; padding: 0 10px; background: #e3eaf5; border-radius: 12px; color: #1f3a5f; text-decoration: none; }
</style>
