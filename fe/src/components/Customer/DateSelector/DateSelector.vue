<template>
    <div class="date-selector-wrapper">
        <!-- Header with title and calendar button -->
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-bold">
                <i class="fa-solid fa-calendar-check text-primary me-2"></i>
                Chọn ngày khởi hành
            </h6>
            <button class="btn btn-sm btn-outline-secondary rounded-pill px-3" @click="showCalendar = !showCalendar">
                <i class="fa-regular fa-calendar me-1"></i>
                {{ showCalendar ? 'Ẩn lịch' : 'Xem lịch' }}
            </button>
        </div>

        <!-- Horizontal scrollable date strip -->
        <div class="date-strip-container">
            <!-- Left scroll button -->
            <button 
                class="scroll-btn scroll-btn-left" 
                @click="scrollLeft"
                :disabled="!canScrollLeft"
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Date cards container -->
            <div 
                class="date-strip" 
                ref="dateStrip"
                @scroll="checkScroll"
            >
                <div 
                    v-for="date in availableDates" 
                    :key="date.dateString"
                    class="date-card"
                    :class="{ 
                        'active': selectedDate === date.dateString,
                        'disabled': !date.available,
                        'today': date.isToday
                    }"
                    @click="date.available && selectDate(date)"
                >
                    <div class="day-name">{{ date.dayName }}</div>
                    <div class="day-number">{{ date.dayNumber }}</div>
                    <div class="month-year">{{ date.monthShort }}</div>
                    <div class="price" v-if="date.available && date.price">
                        {{ formatPrice(date.price) }}
                    </div>
                    <div class="status" v-else-if="!date.available">
                        Hết chỗ
                    </div>
                </div>
            </div>

            <!-- Right scroll button -->
            <button 
                class="scroll-btn scroll-btn-right" 
                @click="scrollRight"
                :disabled="!canScrollRight"
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>

        <!-- Selected date display -->
        <div class="selected-date-display mt-3" v-if="selectedDate">
            <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
                <div>
                    <span class="text-muted small">Ngày khởi hành:</span>
                    <div class="fw-bold text-primary fs-5">
                        {{ formatFullDate(selectedDate) }}
                    </div>
                </div>
                <div class="text-end" v-if="selectedDateInfo">
                    <span class="text-muted small">Giá từ:</span>
                    <div class="text-danger fw-bold fs-5">
                        {{ formatPrice(selectedDateInfo.price || 0) }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Simple Calendar Modal -->
        <div class="modal" :class="{ 'show': showCalendar }" v-if="showCalendar" @click.self="showCalendar = false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Chọn ngày khởi hành</h5>
                        <button type="button" class="btn-close" @click="showCalendar = false"></button>
                    </div>
                    <div class="modal-body">
                        <div class="calendar-month" v-for="(month, mIndex) in calendarMonths" :key="mIndex">
                            <div class="calendar-month-header">
                                <button class="btn btn-sm btn-link" @click="prevMonth(mIndex)">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                                <span class="fw-bold">{{ month.title }}</span>
                                <button class="btn btn-sm btn-link" @click="nextMonth(mIndex)">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                            <div class="calendar-weekdays">
                                <span v-for="day in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" :key="day">{{ day }}</span>
                            </div>
                            <div class="calendar-days">
                                <span 
                                    v-for="(day, dIndex) in month.days" 
                                    :key="dIndex"
                                    class="calendar-day"
                                    :class="{ 
                                        'other-month': day.otherMonth,
                                        'disabled': !day.available,
                                        'selected': day.dateString === selectedDate
                                    }"
                                    @click="day.available && day.dateString && selectDate(day)"
                                >
                                    {{ day.day }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DateSelector',
    props: {
        // Array of available dates with prices from backend
        tourDates: {
            type: Array,
            default: () => []
        },
        // Default selected date
        defaultDate: {
            type: String,
            default: ''
        }
    },
    emits: ['date-selected'],
    data() {
        return {
            selectedDate: '',
            showCalendar: false,
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            canScrollLeft: false,
            canScrollRight: true,
            days: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
            dayShorts: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            months: [
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ]
        };
    },
    computed: {
        // Generate available dates for the strip
        availableDates() {
            const dates = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Nếu có dữ liệu tourDates từ API (nhiều ngày khởi hành)
            if (this.tourDates && this.tourDates.length > 0) {
                // Sử dụng dữ liệu từ API
                this.tourDates.forEach(tourDate => {
                    if (tourDate.ngay_di) {
                        const date = new Date(tourDate.ngay_di);
                        const dateString = this.formatDateString(date);
                        const isAvailable = tourDate.so_cho_con > 0;
                        
                        dates.push({
                            date: date,
                            dateString: dateString,
                            dayName: this.dayShorts[date.getDay()],
                            dayNumber: date.getDate(),
                            monthShort: `Th${date.getMonth() + 1}`,
                            month: this.months[date.getMonth()],
                            year: date.getFullYear(),
                            price: tourDate.gia_nguoi_lon || tourDate.gia_tre_em,
                            available: isAvailable,
                            isToday: false,
                            so_cho_con: tourDate.so_cho_con || 0
                        });
                    }
                });
                
                // Sắp xếp theo ngày
                dates.sort((a, b) => a.date - b.date);
            } else {
                // Nếu không có dữ liệu API, hiển thị các ngày trong tháng từ ngày hiện tại
                for (let i = 0; i < 30; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    
                    dates.push({
                        date: date,
                        dateString: this.formatDateString(date),
                        dayName: this.dayShorts[date.getDay()],
                        dayNumber: date.getDate(),
                        monthShort: `Th${date.getMonth() + 1}`,
                        month: this.months[date.getMonth()],
                        year: date.getFullYear(),
                        price: null,
                        available: i === 0, // Chỉ ngày hôm nay available
                        isToday: i === 0,
                        so_cho_con: 0
                    });
                }
            }
            
            return dates;
        },
        // Get selected date info
        selectedDateInfo() {
            if (!this.selectedDate) return null;
            return this.availableDates.find(d => d.dateString === this.selectedDate);
        },
        // Calendar months data
        calendarMonths() {
            const months = [];
            const today = new Date();
            
            for (let m = 0; m < 2; m++) {
                const monthDate = new Date(this.currentYear, this.currentMonth + m, 1);
                const year = monthDate.getFullYear();
                const month = monthDate.getMonth();
                
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                const days = [];
                
                // Previous month days
                const prevMonthDays = new Date(year, month, 0).getDate();
                for (let i = firstDay - 1; i >= 0; i--) {
                    const date = new Date(year, month - 1, prevMonthDays - i);
                    days.push({
                        day: prevMonthDays - i,
                        otherMonth: true,
                        dateString: this.formatDateString(date),
                        available: false
                    });
                }
                
                // Current month days
                for (let i = 1; i <= daysInMonth; i++) {
                    const date = new Date(year, month, i);
                    const dateString = this.formatDateString(date);
                    const tourDate = this.tourDates.find(d => this.formatDateString(new Date(d.ngay_di)) === dateString);
                    const isAvailable = tourDate && tourDate.so_cho_con > 0;
                    
                    days.push({
                        day: i,
                        otherMonth: false,
                        dateString: dateString,
                        available: isAvailable
                    });
                }
                
                // Next month days
                const remaining = 42 - days.length;
                for (let i = 1; i <= remaining; i++) {
                    const date = new Date(year, month + 1, i);
                    days.push({
                        day: i,
                        otherMonth: true,
                        dateString: this.formatDateString(date),
                        available: false
                    });
                }
                
                months.push({
                    title: `${this.months[month]} ${year}`,
                    days: days
                });
            }
            
            return months;
        }
    },
    mounted() {
        // Set default date
        if (this.defaultDate) {
            this.selectedDate = this.defaultDate;
        } else if (this.availableDates.length > 0) {
            // Auto select first available date
            const firstAvailable = this.availableDates.find(d => d.available);
            if (firstAvailable) {
                this.selectedDate = firstAvailable.dateString;
            }
        }
        
        // Check scroll position after mounted
        this.$nextTick(() => {
            this.checkScroll();
        });
    },
    methods: {
        formatDateString(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },
        formatFullDate(dateString) {
            if (!dateString) return '';
            // Parse DD/MM/YYYY or D/M/YYYY to Date object
            const parts = dateString.split('/');
            if (parts.length !== 3) return dateString;
            
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            
            const date = new Date(year, month, day);
            if (isNaN(date.getTime())) return dateString;

            const dayName = this.days[date.getDay()];
            const monthName = this.months[date.getMonth()];
            return `${dayName}, ${day} ${monthName}, ${year}`;
        },
        formatPrice(price) {
            if (!price) return '';
            return new Intl.NumberFormat('vi-VI', { 
                style: 'currency', 
                currency: 'VND',
                maximumFractionDigits: 0
            }).format(price);
        },
        selectDate(date) {
            this.selectedDate = date.dateString;
            this.$emit('date-selected', {
                date: date.dateString,
                price: date.price,
                so_cho_con: date.so_cho_con
            });
        },
        scrollLeft() {
            const strip = this.$refs.dateStrip;
            if (strip) {
                strip.scrollBy({ left: -300, behavior: 'smooth' });
            }
        },
        scrollRight() {
            const strip = this.$refs.dateStrip;
            if (strip) {
                strip.scrollBy({ left: 300, behavior: 'smooth' });
            }
        },
        checkScroll() {
            const strip = this.$refs.dateStrip;
            if (strip) {
                this.canScrollLeft = strip.scrollLeft > 0;
                this.canScrollRight = strip.scrollLeft < strip.scrollWidth - strip.clientWidth - 10;
            }
        },
        prevMonth(index) {
            if (index === 0) {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
            }
        },
        nextMonth(index) {
            if (index === 1) {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
            }
        }
    }
};
</script>

<style scoped>
.date-selector-wrapper {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
}

.date-strip-container {
    position: relative;
    display: flex;
    align-items: center;
}

.date-strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 8px 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.date-strip::-webkit-scrollbar {
    display: none;
}

.date-card {
    flex: 0 0 auto;
    width: 70px;
    padding: 12px 8px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fff;
}

.date-card:hover:not(.disabled) {
    border-color: #0d6efd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.15);
}

.date-card.active {
    background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
    border-color: #0d6efd;
    color: white;
    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.35);
}

.date-card.today {
    border-color: #198754;
}

.date-card.today:not(.active) {
    background: #f8fff9;
}

.date-card.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f8f9fa;
}

.date-card.disabled .day-number {
    text-decoration: line-through;
    color: #adb5bd;
}

.day-name {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: #6c757d;
    margin-bottom: 4px;
}

.date-card.active .day-name {
    color: rgba(255, 255, 255, 0.9);
}

.day-number {
    font-size: 20px;
    font-weight: 700;
    color: #212529;
    line-height: 1;
}

.date-card.active .day-number {
    color: white;
}

.month-year {
    font-size: 10px;
    color: #6c757d;
    margin-top: 2px;
}

.date-card.active .month-year {
    color: rgba(255, 255, 255, 0.8);
}

.price {
    font-size: 10px;
    font-weight: 600;
    color: #dc3545;
    margin-top: 6px;
    white-space: nowrap;
}

.date-card.active .price {
    color: #ffd43b;
}

.status {
    font-size: 9px;
    color: #dc3545;
    font-weight: 600;
    margin-top: 4px;
}

.scroll-btn {
    position: absolute;
    z-index: 10;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.scroll-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.scroll-btn:not(:disabled):hover {
    background: #0d6efd;
    color: white;
}

.scroll-btn-left {
    left: -16px;
}

.scroll-btn-right {
    right: -16px;
}

.selected-date-display {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Calendar Modal Styles */
.modal {
    background: rgba(0, 0, 0, 0.5);
    display: none;
}

.modal.show {
    display: block;
}

.calendar-month {
    margin-bottom: 20px;
}

.calendar-month:last-child {
    margin-bottom: 0;
}

.calendar-month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #6c757d;
    margin-bottom: 5px;
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.calendar-day {
    text-align: center;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}

.calendar-day:hover:not(.disabled):not(.other-month) {
    background: #e7f1ff;
}

.calendar-day.other-month {
    color: #dee2e6;
}

.calendar-day.disabled {
    color: #dee2e6;
    cursor: not-allowed;
}

.calendar-day.selected {
    background: #0d6efd;
    color: white;
}
</style>
