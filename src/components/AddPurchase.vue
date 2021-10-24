<template>
  <div class="add-purchase container-md">
    <div class="card card-body mt-4">
      <h5>Добавить покупку</h5>

      <form @submit.prevent="onSubmit">

        <div class="form-group">
          <div class="form-group mt-3">

            <select v-model="form.purchase_type" class="form-select" required>
              <option disabled selected>Тип покупки</option>
              <option>Программа</option>
              <option>Бар</option>
            </select>

            <div>
              <div class="payment card-body card mt-3">
                <h6 class="mb-1">Оплата</h6>

                <div class="input-group">
                  <label class="input-group-text" for="касса">Касса</label>
                  <select id="касса" v-model="form.cash_box" class="form-select" required>
                    <option selected>Касса админа</option>
                    <option>Касса управляющего</option>
                  </select>
                </div>

                <div class="input-group mt-1">
                  <label class="input-group-text" for="Способ оплаты">Способ оплаты</label>
                  <select id="Способ оплаты" v-model="form.payment_method" class="form-select" required>
                    <option>Наличные</option>
                    <option>Эквайринг</option>
                    <option>Перевод на карту</option>
                  </select>
                </div>

                <div v-if="form.payment_method==='Перевод на карту'" class="input-group mt-1">
                  <label class="input-group-text" for="Карта">Карта</label>
                  <select id="Карта" v-model="form.card_type" class="form-select" required>
                    <option>Сбер</option>
                    <option>Тинькофф</option>
                    <option>ВТБ</option>
                  </select>
                </div>

                <div class="discount">
                  <label class="form-label mt-3" for="discount">Скидка: {{ form.discount }}%</label>
                  <input id="discount"
                         v-model="form.discount"
                         class="form-range"
                         max=20
                         min=0
                         step="1"
                         type="range"
                  >

                  <div v-if="form.discount>0" class="input-group mt-1">
                    <label class="input-group-text" for="Обоснование">Обоснование</label>
                    <select id="Обоснование"
                            v-model="form.discount_rationale"
                            class="form-select"
                    >
                      <option>Первый визит</option>
                      <option>Купон</option>
                      <option>Флаер</option>
                      <option>VIP карта</option>
                      <option>Другое</option>
                    </select>
                  </div>

                  <div v-if="form.discount_rationale==='Другое'" class="input-group mt-1">
                    <label class="input-group-text" for="Обоснование_другое">Обоснование (другое)</label>
                    <input id="Обоснование_другое" v-model="form.discount_rationale_text" class="form-control"/>
                  </div>
                </div>

              </div>
            </div>

            <div v-if="form.purchase_type==='Программа'" class="program">

              <div class="program-options card-body card mt-3">
                <h6 class="mb-1">Программа</h6>

                <div class="input-group mt-1">
                  <label class="input-group-text" for="Комната">Комната</label>
                  <select id="Комната" v-model="form.room" class="form-select" required>
                    <option>VIP</option>
                    <option>LUXURY</option>
                    <option>RELAX</option>
                    <option>COMFORT</option>
                    <option>BDSM</option>
                  </select>
                </div>

                <div class="input-group mt-1">
                  <label class="input-group-text" for="Услуга">Услуга</label>
                  <select id="Услуга" v-model="form.service_type" class="form-select" required>
                    <option>Программа</option>
                    <option>Продление</option>
                    <option>Крейзи мастер</option>
                    <option>Крейзи админ</option>
                  </select>
                </div>

                <div class="input-group mt-1">
                  <label class="input-group-text" for="Наименование">Наименование</label>
                  <select id="Наименование" v-model="form.service_name" class="form-select" required>
                    <option>Классика 60 мин 4900</option>
                    <option>Клубничка 60 мин 6300</option>
                  </select>
                </div>

                <div class="mt-3 card-footer">Итого: {{ form.price_final }} ₽</div>

              </div>

            </div>

            <div v-if="form.purchase_type==='Бар'" class="alcohol-bar">

              <div class="bar-options card-body card mt-3">
                <h6 class="mb-1">Бар</h6>

                <div class="input-group mt-1">
                  <label class="input-group-text" for="Напиток">Напиток</label>
                  <select id="Напиток" v-model="form.alcohol_name" class="form-select" required>
                    <option>Виски 600</option>
                    <option>Коньяк 800</option>
                    <option>Джин 1000</option>
                    <option>Мартини 1200</option>
                    <option>Шампанское 2500</option>
                  </select>
                </div>


                <div class="mt-3 card-footer">Итого: {{ form.price_final }} ₽</div>

              </div>

            </div>


          </div>
        </div>

        <button class="btn btn-success mt-3" type="submit">Сохранить</button>

      </form>

    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  watch
} from 'vue'
import { useStore } from 'vuex'

export default {
  props: [ 'guestID' ],
  emits: ['close'],
  setup ( props, { emit }) {
    const store = useStore()
    const form = reactive({
      guest_id: computed(() => props.guestID),
      purchase_type: 'Тип покупки',
      cash_box: '',
      payment_method: '',
      card_type: '',
      room: '',
      service_type: '',
      service_name: '',
      price: computed(() => {
        const p1 = form.service_name === '' ? 0 : parseInt(form.service_name.split(' ').pop())
        const p2 = form.alcohol_name === '' ? 0 : parseInt(form.alcohol_name.split(' ').pop())
        return p1 + p2
      }),
      price_final: computed(() => form.price * (100 - form.discount) / 100),
      discount: 0,
      discount_rationale: '',
      discount_rationale_text: '',
      alcohol_name: '',
    })

    const clearForm = () => {
      form.room = ''
      form.service_type = ''
      form.service_name = ''
      form.alcohol_name = ''
    }

    watch(() => form.purchase_type, () => {
      clearForm()
    })

    const onSubmit = async () => {
      if (form.purchase_type !== 'Тип покупки') {
        form.order = store.getters.orderToEdit._id
        await store.dispatch('addNewPurchaseToList', form)
        emit('close')
        // clearForm()
      }
    }

    return {
      form,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-size: 10pt;

  .input-group-text {
    min-width: 50%;
  }

  h5 {
    font-size: 12pt;
  }

  h6 {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 10pt;
    text-align: right;
  }

}


.btn {
  background-color: #bd58a8;
  border: 0;
}

</style>
