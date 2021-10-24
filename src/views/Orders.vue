<template>
  <div class="order-container">
    <div v-if="isLoading" class="loading">
      <Loader/>
    </div>
    <div v-else class="order-list">
      <ClientBlock
        v-for="order in orders"
        :key="order._id"
        :class="{closed: (order.status==='closed')}"
        @click.prevent="this.$router.push(`/order/${order._id}`)"
      >
        <template v-slot:name>{{ order.name }}</template>
        <template v-slot:start>{{ dateFormat(order.start, 'short') }}</template>
        <template v-if="order.status==='closed'" v-slot:footer>завершён</template>
      </ClientBlock>
    </div>
    <div class="add-new mt-5">
      <div class="button-wrapper">
        <button class="btn btn-primary" @click.prevent="showForm=!showForm">Добавить клиента</button>
      </div>
      <AddGuest v-if="showForm" @close="showForm=false"/>
    </div>

  </div>
</template>

<script>
import ClientBlock from '../components/ClientBlock'
import {
  computed,
  onMounted,
  ref,
  watch
} from 'vue'
import Loader from '../components/Loader'
import { useStore } from 'vuex'
import dateFormat from '../utils/dateFormat'
import AddGuest from '../components/AddOrder'

export default {
  components: {
    AddGuest,
    Loader,
    ClientBlock
  },

  setup () {
    const store = useStore()
    const isLoading = ref(false)
    const orders = ref(null)
    const showForm = ref(false)

    onMounted(async () => {
      await store.dispatch('onReload')
      orders.value = store.getters.orders
    })

    watch(computed(() => store.getters.orderLength), async () => {
      // await store.dispatch('onReload')
      orders.value = store.getters.orders
    })

    return {
      isLoading,
      orders,
      dateFormat,
      showForm
    }
  }
}
</script>
<style lang="scss" scoped>

.client-block.closed {
  background: #589ca6;
}

.order-list {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  justify-items: center;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
}

.add-new {
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  justify-items: center;
  position: relative;
  margin: 0 auto;
}

</style>
