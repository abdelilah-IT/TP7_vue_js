<template>
  <header class="top">
    <router-link to="/" class="brand">🌍 Explorateur de pays</router-link>
  </header>
  <main class="container">
    <router-view />
  </main>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f4f6fa; color: #222; }
.top { background: #1f3a5f; padding: 14px 24px; }
.brand { color: #fff; text-decoration: none; font-size: 1.2rem; font-weight: 600; }
.container { max-width: 1100px; margin: 0 auto; padding: 24px; }
.state { text-align: center; padding: 40px 0; }
.error { color: #b00020; background: #fdecea; border-radius: 8px; padding: 16px; }
button { cursor: pointer; }
</style>
