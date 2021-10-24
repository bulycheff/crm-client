<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Дата начала</th>
        <th scope="col">Тип клиента</th>
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ order.value ? order.value.name : '' }}</td>
        <td>{{ dateFormat(order.value.start, 'short') }}</td>
        <td>{{ order.value.is_new ? 'Новый' : 'Постоянный' }}</td>
        <td>
          <button v-if="order.value.status!=='closed'" class="btn btn-danger" @click.prevent="closeOrder">Завершить
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <span class="mx-2">Покупки</span>
      <button
        @click.prevent="showAddPurchaseForm=!showAddPurchaseForm"
        v-if="order.value.status!=='closed'"
        class="btn btn-primary"
        type="button"
      >
        Добавить
      </button>
      <AddPurchase @close="addedNewPurchase" v-if="showAddPurchaseForm"/>
      <hr class="mt-3">
      <h4>Список покупок:</h4>

      <div class="card mt-4">
        <table class="table m-0">
          <thead>
          <tr>
            <th scope="col">Тип</th>
            <th scope="col">Наименование</th>
            <th scope="col">Способ оплаты</th>
            <th scope="col">Стоимость</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="p in purchaseList"
            :key="p.id"
          >
            <td>{{ p.purchase_type }}</td>
            <td>{{ p.purchase_type==='Бар' ? p.alcohol_name : p.service_name }}</td>
            <td>{{ p.payment_method }}</td>
            <td>{{ p.price_final }} ₽</td>
          </tr>
          </tbody>
          <tfoot class="mb-5">
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">{{ purchaseListTotal }} ₽</th>
          </tr>
          </tfoot>
        </table>
      </div>

    </div>

    <hr>
  </div>

</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import dateFormat from '../utils/dateFormat'
import {
  onBeforeMount,
  reactive,
  ref,
  computed
} from 'vue'
import AddPurchase from '../components/AddPurchase'

export default {
  components: { AddPurchase },
  setup () {
    const route = useRoute()
    const store = useStore()
    const order = reactive({})
    const showAddPurchaseForm = ref(false)

    const purchaseList = ref(computed(()=>store.getters.purchaseList))
    const purchaseListTotal = ref(computed(()=>store.getters.purchaseListTotal))

    const addedNewPurchase = async () => {
      showAddPurchaseForm.value=false
      await store.dispatch('loadOrderToEditInStore', route.params.id)
      await store.dispatch('refreshValuesInPurchaseList')
    }

    const closeOrder = async () => {
      await store.dispatch('closeOrder', route.params.id)
      await store.dispatch('loadOrderToEditInStore', route.params.id)
      order.value = store.getters.orderToEdit
    }

    onBeforeMount(async () => {
      const orderId = route.params.id
      await store.dispatch('loadOrderToEditInStore', orderId)
      await store.dispatch('refreshValuesInPurchaseList')
      order.value = store.getters.orderToEdit
    })

    return {
      order,
      dateFormat,
      closeOrder,
      showAddPurchaseForm,
      addedNewPurchase,
      purchaseList,
      purchaseListTotal
    }

  }

}
</script>

<style scoped>

</style>
