<template>
  <div class="p-3">
    <h6 class="mb-3">
      <i class="fa-solid fa-calendar-check me-2 text-primary"></i>Chọn ngày khởi hành
    </h6>
    <div v-if="tourDates && tourDates.length > 0" class="d-flex flex-column gap-2">
      <button 
        v-for="(dateObj, index) in formattedDates" 
        :key="index"
        @click="selectDate(dateObj)"
        class="btn w-100 text-start d-flex justify-content-between align-items-center"
        :class="selectedDate === dateObj.displayDate ? 'btn-primary text-white' : 'btn-outline-primary'"
      >
        <span>{{ dateObj.displayDate }}</span>
        <span v-if="dateObj.so_cho_con > 0" class="badge rounded-pill" :class="selectedDate === dateObj.displayDate ? 'bg-light text-primary' : 'bg-primary text-white'">
          Còn {{ dateObj.so_cho_con }} chỗ
        </span>
        <span v-else class="badge rounded-pill bg-danger text-white">Hết chỗ</span>
      </button>
    </div>
    <div v-else class="text-muted text-center py-2">
      Không có lịch khởi hành.
    </div>
  </div>
</template>

<script>
export default {
  name: "DateSelector",
  props: {
    tourDates: {
      type: Array,
      default: () => []
    },
    defaultDate: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selectedDate: this.defaultDate
    };
  },
  computed: {
    formattedDates() {
      return this.tourDates.map(d => {
        const date = new Date(d.ngay_di);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return {
          ...d,
          displayDate: `${day}/${month}/${year}`
        };
      });
    }
  },
  watch: {
    defaultDate(newVal) {
      if (newVal && !this.selectedDate) {
        this.selectedDate = newVal;
      }
    }
  },
  methods: {
    selectDate(dateObj) {
      if (dateObj.so_cho_con > 0) {
        this.selectedDate = dateObj.displayDate;
        this.$emit("date-selected", { date: dateObj.displayDate });
      } else {
        this.$toast ? this.$toast.error("Ngày khởi hành này đã hết chỗ!") : alert("Ngày khởi hành này đã hết chỗ!");
      }
    }
  },
  mounted() {
    if (this.defaultDate) {
      this.selectedDate = this.defaultDate;
    }
  }
};
</script>

<style scoped>
.btn-outline-primary {
  border-width: 2px;
}
</style>
