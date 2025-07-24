<template>
  <div>
    <button @click="showMessage = !showMessage">کلیک کن!</button>
    <div v-if="showMessage" class="secret-message">
      <p>عزیزم، تولدت مبارک! تو بهترینی ♥</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMessage: false
    }
  }
}
</script>
