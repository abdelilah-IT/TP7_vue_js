<template>
  <router-link :to="{ name: 'detail', params: { code: country.cca3 } }" class="card">
    <img :src="country.flags.png" :alt="country.flags.alt || 'Drapeau de ' + country.name.common" />
    <div class="body">
      <h3>{{ country.name.common }}</h3>
      <p>{{ country.capital && country.capital.length ? country.capital[0] : '—' }}</p>
      <small>{{ country.region }} · {{ country.population.toLocaleString('fr-FR') }} hab.</small>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    country: { type: Object, required: true }
  }
}
</script>

<style scoped>
.card { display: block; background: #fff; border-radius: 10px; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 1px 4px rgba(0,0,0,.12); transition: transform .15s; }
.card:hover { transform: translateY(-3px); }
img { width: 100%; height: 120px; object-fit: cover; display: block; border-bottom: 1px solid #eee; }
.body { padding: 12px 14px; }
h3 { margin: 0 0 4px; font-size: 1.05rem; }
p { margin: 0 0 6px; color: #555; }
small { color: #777; }
</style>
