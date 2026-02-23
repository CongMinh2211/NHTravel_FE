<template>
    <!-- Bong bóng thanh toán floating - Giống Vexere -->
    <div v-if="isVisible" class="payment-bubble" :class="{ expanded: isExpanded }" @click="handleClick">
        <!-- Trạng thái thu nhỏ (bong bóng) -->
        <div v-if="!isExpanded" class="bubble-mini">
            <div class="bubble-pulse"></div>
            <div class="bubble-icon">
                <i class="fa-solid fa-clock"></i>
            </div>
            <div class="bubble-timer">{{ formattedTime }}</div>
        </div>

        <!-- Trạng thái mở rộng -->
        <div v-else class="bubble-expanded" @click.stop>
            <div class="bubble-header">
                <div class="d-flex align-items-center">
                    <i class="fa-solid fa-hourglass-half text-warning me-2 fa-spin"></i>
                    <span class="fw-bold">Đang chờ thanh toán</span>
                </div>
                <button class="btn-close-bubble" @click.stop="isExpanded = false">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>

            <div class="bubble-body">
                <div class="timer-display">
                    <span class="timer-label">Thời gian còn lại</span>
                    <span class="timer-value" :class="{ 'text-danger': timeRemaining < 120 }">
                        {{ formattedTime }}
                    </span>
                </div>

                <div class="order-info">
                    <div class="info-row">
                        <span class="info-label">Mã đơn</span>
                        <span class="info-value">{{ orderCode }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Số tiền</span>
                        <span class="info-value text-danger fw-bold">{{ formattedAmount }}</span>
                    </div>
                </div>

                <div class="bubble-actions">
                    <button class="btn btn-primary btn-sm w-100" @click.stop="goToPayment">
                        <i class="fa-solid fa-qrcode me-1"></i>
                        Thanh toán ngay
                    </button>
                    <button class="btn btn-outline-secondary btn-sm w-100 mt-2" @click.stop="cancelPayment">
                        <i class="fa-solid fa-xmark me-1"></i>
                        Hủy thanh toán
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentBubble',
    data() {
        return {
            isVisible: false,
            isExpanded: false,
            orderCode: '',
            amount: 0,
            expiresAt: null,
            timeRemaining: 0,
            timerInterval: null,
            tourName: '',
        };
    },

    computed: {
        formattedTime() {
            if (this.timeRemaining <= 0) return '00:00';
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        formattedAmount() {
            return new Intl.NumberFormat('vi-VN').format(this.amount) + ' VND';
        }
    },

    watch: {
        '$route'() {
            this.checkPendingPayment();
        }
    },

    mounted() {
        this.checkPendingPayment();
        // Lắng nghe sự kiện từ trang thanh toán
        window.addEventListener('payment-started', this.onPaymentStarted);
        window.addEventListener('payment-completed', this.onPaymentCompleted);
        window.addEventListener('storage', this.onStorageChange);
    },

    beforeUnmount() {
        this.clearTimer();
        window.removeEventListener('payment-started', this.onPaymentStarted);
        window.removeEventListener('payment-completed', this.onPaymentCompleted);
        window.removeEventListener('storage', this.onStorageChange);
    },

    methods: {
        checkPendingPayment() {
            const pending = JSON.parse(localStorage.getItem('pending_order') || 'null');
            
            if (!pending || !pending.ma_don_hang) {
                this.isVisible = false;
                this.clearTimer();
                return;
            }

            // Kiểm tra thời gian hết hạn
            const expiresAt = pending.expires_at ? new Date(pending.expires_at).getTime() : null;
            const now = Date.now();
            
            if (expiresAt && now >= expiresAt) {
                // Hết hạn → xóa
                localStorage.removeItem('pending_order');
                this.isVisible = false;
                this.clearTimer();
                return;
            }

            // Không hiện bubble trên trang thanh toán
            if (this.$route.path.includes('thanh-toan-sepay')) {
                this.isVisible = false;
                return;
            }

            this.orderCode = pending.ma_don_hang;
            this.amount = pending.tien_thuc_nhan || 0;
            this.tourName = pending.ten_tour || '';
            this.expiresAt = expiresAt || (now + 15 * 60 * 1000);
            
            // Set expires_at nếu chưa có
            if (!pending.expires_at) {
                pending.expires_at = new Date(this.expiresAt).toISOString();
                localStorage.setItem('pending_order', JSON.stringify(pending));
            }

            this.isVisible = true;
            this.startTimer();
        },

        startTimer() {
            this.clearTimer();
            this.updateTimeRemaining();
            this.timerInterval = setInterval(() => {
                this.updateTimeRemaining();
            }, 1000);
        },

        updateTimeRemaining() {
            const now = Date.now();
            this.timeRemaining = Math.max(0, Math.floor((this.expiresAt - now) / 1000));
            
            if (this.timeRemaining <= 0) {
                this.clearTimer();
                localStorage.removeItem('pending_order');
                this.isVisible = false;
            }
        },

        clearTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
            }
        },

        handleClick() {
            if (!this.isExpanded) {
                this.isExpanded = true;
            }
        },

        goToPayment() {
            this.isExpanded = false;
            this.$router.push(`/thanh-toan-sepay/${this.orderCode}`);
        },

        cancelPayment() {
            if (confirm('Bạn có chắc muốn hủy thanh toán?')) {
                localStorage.removeItem('pending_order');
                this.isVisible = false;
                this.clearTimer();
            }
        },

        onPaymentStarted(e) {
            this.checkPendingPayment();
        },

        onPaymentCompleted() {
            localStorage.removeItem('pending_order');
            this.isVisible = false;
            this.clearTimer();
        },

        onStorageChange(e) {
            if (e.key === 'pending_order') {
                this.checkPendingPayment();
            }
        }
    }
};
</script>

<style scoped>
.payment-bubble {
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 99999;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* === Bong bóng thu nhỏ === */
.bubble-mini {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10px 16px;
    border-radius: 50px;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
    transition: all 0.3s ease;
    animation: bubbleEntry 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-mini:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
}

.bubble-pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    opacity: 0.4;
    animation: pulse 2s ease-in-out infinite;
    z-index: -1;
}

.bubble-icon {
    font-size: 16px;
    animation: tick 1s ease-in-out infinite;
}

.bubble-timer {
    font-size: 15px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 1px;
}

/* === Bong bóng mở rộng === */
.bubble-expanded {
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
    width: 280px;
    overflow: hidden;
    animation: expandIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 14px;
}

.btn-close-bubble {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s;
}

.btn-close-bubble:hover {
    background: rgba(255, 255, 255, 0.35);
}

.bubble-body {
    padding: 16px;
}

.timer-display {
    text-align: center;
    margin-bottom: 14px;
}

.timer-label {
    display: block;
    font-size: 12px;
    color: #888;
    margin-bottom: 4px;
}

.timer-value {
    font-size: 32px;
    font-weight: 800;
    color: #667eea;
    font-variant-numeric: tabular-nums;
    letter-spacing: 2px;
}

.timer-value.text-danger {
    color: #dc3545 !important;
    animation: blink 1s ease-in-out infinite;
}

.order-info {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 14px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    font-size: 13px;
}

.info-label {
    color: #888;
}

.info-value {
    font-weight: 600;
    color: #333;
}

.bubble-actions .btn {
    font-size: 13px;
    border-radius: 8px;
}

/* === Animations === */
@keyframes bubbleEntry {
    0% { transform: scale(0) translateY(20px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes expandIn {
    0% { transform: scale(0.8) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.15); opacity: 0; }
}

@keyframes tick {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-15deg); }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Mobile responsive */
@media (max-width: 480px) {
    .payment-bubble {
        right: 10px;
        bottom: 80px;
    }
    .bubble-expanded {
        width: 260px;
    }
}
</style>
