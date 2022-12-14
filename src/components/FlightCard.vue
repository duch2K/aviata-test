<template>
  <div class="flight-card">
    <div class="info">
      <div class="info-inner">
        <div class="main">
          <div class="head">
            <div class="logo">
              <img
                :src="`${BASE_URL}/static/airline-logos/80x80/${mainInfo.carrier}.png`"
                :alt="mainInfo.carrier_name"
              >
            </div>
            <h3 class="airline">{{ mainInfo.carrier_name }}</h3>
            <span class="head-baggage">{{ baggage }}</span>
          </div>
          <div class="flight">
            <div class="dep-time">
              <span class="day">{{ depTime.day }}</span>
              <span class="time">{{ depTime.time }}</span>
            </div>
            <Pathway
              class="flight-pathway"
              :origin="origin.origin_code"
              :destination="dest.dest_code"
              :time="secsToHours(mainInfo.traveltime)"
              :transfer="transfer"
            />
            <div class="arr-time">
              <span class="day">
                {{ arrTime.day }}
                <span v-if="days > 0" class="plus">+{{ days }}</span>
              </span>
              <span class="time">{{ arrTime.time }}</span>
            </div>
          </div>
          <Pathway
            class="flight-pathway_mobile"
            :origin="origin.origin_code"
            :destination="dest.dest_code"
            :time="secsToHours(mainInfo.traveltime)"
            :transfer="transfer"
          />
        </div>
        <div class="details">
          <Button class="detail-btn" type="clear">Детали перелета</Button>
          <Button class="detail-btn" type="clear">Условия тарифа</Button>
          <span v-if="!item.refundable" class="non-return">
            <NonReturnableIcon />
            невозвратный
          </span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <h3 class="price">{{ item.price }} {{ CURRENCIES[item.currency] }}</h3>
      <Button class="select-btn" type="main">Выбрать</Button>
      <p class="price-details">Цена за всех пассажиров</p>
      <div class="baggage">
        <span>{{ baggage }}</span>
        <Button type="light">+ Добавить багаж</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Pathway from './common/Pathway.vue'
import Button from './common/Button.vue'
import NonReturnableIcon from './icons/NonReturnableIcon.vue'
import { BASE_URL, CURRENCIES } from '../constants';
import { convertDateWithFormat, dayDiff, secsToHours } from '../helpers';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const mainInfo = computed(() => props.item.itineraries[0][0])
const origin = computed(() => mainInfo.value.segments[0])
const dest = computed(() =>
  mainInfo.value.segments[mainInfo.value.segments.length - 1]
)
const depTime = computed(() => ({
  day: convertDateWithFormat(origin.value.dep_time_iso, 'DD MMM, dd'),
  time: convertDateWithFormat(origin.value.dep_time_iso, 'HH:mm')
}))
const arrTime = computed(() => ({
  day: convertDateWithFormat(dest.value.arr_time_iso, 'DD MMM, dd'),
  time: convertDateWithFormat(dest.value.arr_time_iso, 'HH:mm')
}))
const days = computed(() =>
  dayDiff(origin.value.dep_time_iso, dest.value.arr_time_iso)
)
const transfer = computed(() => {
  if (mainInfo.value.segments.length <= 1) {
    return null
  }

  return {
    depTime: origin.value.dep_time_iso,
    transferTime: mainInfo.value.segments[1].dep_time_iso,
    location: mainInfo.value.segments[1].origin
  }
})
const baggage = computed(() => {
  if (props.item.services['0PC']) {
    return 'Нет багажа'
  }

  return Object.values(props.item.services)[0].value
})
</script>

<style lang="scss" scoped>
.flight-card {
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  .info {
    background: #FFFFFF;
    flex: 1;
  }

  .info-inner {
    padding: 40px 20px 16px 44px;
  }

  .main {
    margin-bottom: 46px;
    display: flex;
    align-items: center;
  }

  .head {
    margin-right: 13px;
    display: flex;
    column-gap: 12px;
  }

  .logo {
    width: 20px;
    height: 20px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .airline {
    min-width: 100px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
  }

  .head-baggage {
    display: none;
  }

  .flight {
    display: flex;
    column-gap: 28px;
  }

  .day {
    display: block;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  .time {
    display: block;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
  }

  .flight-pathway {
    width: 172px;

    &_mobile {
      display: none;
    }
  }

  .plus {
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    color: rgba(255, 55, 36, 0.8);
  }

  .details {
    display: flex;
  }

  .detail-btn {
    margin-right: 24px;

    &:last-child {
      margin-right: 0;
    }
  }

  .non-return {
    margin-left: 47px;
    display: flex;
    align-items: center;
    column-gap: 7px;
    font-size: 12px;
    line-height: 14px;
    color: #707276;
  }

  .card-footer {
    width: 240px;
    padding: 12px 20px 15px;
    background: #F5F5F5;
  }

  .price {
    margin-bottom: 13px;
    text-align: center;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
  }

  .select-btn {
    width: 100%;
    display: block;
    margin-bottom: 8px;
  }

  .price-details {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #707276;
  }

  .baggage {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    span {
      display: block;
      margin-right: 6px;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
  }

  @media all and (max-width: 1199px) {
    .info {
      padding: 40px 20px 16px;
      display: flex;
      justify-content: center;
      background: #FFFFFF;
      flex: 1;
    }

    .info-inner {
      margin: 0 auto;
      padding: 0;
    }

    .flight-pathway {
      width: 140px;
    }

    .card-footer {
      width: 200px;
      padding-left: 15px;
      padding-right: 15px;
    }

    .baggage {
      flex-direction: column;
      row-gap: 5px;
    }
  }

  @media all and (max-width: 991px) {
    .info {
      padding: 18px 20px 28px;
    }

    .main {
      margin-bottom: 0;
      flex-direction: column;
      align-items: stretch;
    }

    .head {
      margin: 0 0 27px;
    }

    .head-baggage {
      display: block;
      flex: 1;
      text-align: right;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }

    .flight {
      margin-bottom: 32px;
      justify-content: space-between;
    }

    .flight-pathway {
      display: none;

      &_mobile {
        display: block;
      }
    }

    .card-footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .select-btn {
      margin-bottom: 14px;
    }

    .price-details {
      margin-bottom: 0;
    }

    .details, .baggage {
      display: none;
    }
  }

  @media all and (max-width: 575px) {
    flex-direction: column;

    .info {
      padding-left: 22px;
      padding-right: 22px;
      display: block;
    }

    .card-footer {
      width: unset;
      padding: 16px 44px;
    }
  }
}
</style>
