<template>
  <div class="guest-list container-md">
    <hr>
    <h5 class="m-lg-2">Гости</h5>
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
        <tr>
          <td><slot name="type"></slot></td>
          <td><slot name="name"></slot></td>
          <td><slot name="payment-method"></slot></td>
          <td><slot name="cost"></slot></td>

        </tr>
        </tbody>
        <tfoot class="mb-5">
        <tr>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"> ₽</th>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const total = ref(null)

    return { total }
  }
}
</script>

<style scoped>

</style>
