<template>
    <div class="container py-5">
        <div class="card shadow-lg mx-auto" style="max-width: 500px;">
            <div class="card-header text-center py-3" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <h4 class="mb-0 text-white">
                    <i class="fa-solid fa-qrcode me-2"></i>
                    Thanh toán qua SePay
                </h4>
            </div>
            
            <div class="card-body text-center p-4">
                <!-- LOADING -->
                <div v-if="loading" class="py-5">
                    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
                    <p class="text-muted mt-3">Đang tạo mã QR...</p>
                </div>

                <!-- ĐÃ THANH TOÁN -->
                <div v-else-if="isPaid" class="py-4">
                    <div class="success-animation mb-4">
                        <i class="fa-solid fa-circle-check text-success" style="font-size: 80px;"></i>
                    </div>
                    <h3 class="text-success fw-bold mb-3">Thanh toán thành công!</h3>
                    <p class="text-muted mb-4">
                        Đơn hàng <b class="text-primary">{{ maDonHang }}</b> đã được xác nhận.
                    </p>
                    <div class="alert alert-info py-2 mb-4">
                        <i class="fa-solid fa-circle-info me-2"></i>
                        Hệ thống sẽ tự động chuyển hướng sau <b>{{ redirectCountdown }}</b> giây...
                    </div>
                    <router-link to="/lich-su-don-hang" class="btn btn-success btn-lg px-4">
                        <i class="fa-solid fa-clipboard-list me-2"></i>
                        Xem đơn hàng
                    </router-link>
                </div>

                <!-- HIỂN THỊ QR CODE -->
                <div v-else-if="paymentData">
                    <!-- Countdown Timer -->
                    <div class="alert alert-warning d-flex align-items-center mb-4" role="alert">
                        <i class="fa-solid fa-clock me-2"></i>
                        <span>Thời gian còn lại: <b>{{ formattedTime }}</b></span>
                    </div>

                    <!-- QR Code -->
                    <div class="qr-wrapper mb-4 p-3 bg-white rounded-3 shadow-sm d-inline-block">
                        <img :src="paymentData.qr_url" alt="QR Code VietQR" 
                             style="width: 250px; height: 250px;" class="rounded">
                    </div>

                    <!-- Thông tin chuyển khoản -->
                    <div class="transfer-info bg-light rounded-3 p-3 text-start mb-4">
                        <h6 class="text-center text-muted mb-3">
                            <i class="fa-solid fa-building-columns me-2"></i>
                            Thông tin chuyển khoản
                        </h6>
                        
                        <div class="row g-2">
                            <div class="col-5 text-muted">Ngân hàng:</div>
                            <div class="col-7 fw-bold text-primary">{{ paymentData.bank_name }}</div>
                            
                            <div class="col-5 text-muted">Số tài khoản:</div>
                            <div class="col-7 fw-bold">
                                {{ paymentData.bank_account }}
                                <button class="btn btn-sm btn-outline-secondary ms-2" @click="copyText(paymentData.bank_account)">
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                            </div>
                            
                            <div class="col-5 text-muted">Chủ tài khoản:</div>
                            <div class="col-7 fw-bold">{{ paymentData.bank_account_name }}</div>
                            
                            <div class="col-5 text-muted">Số tiền:</div>
                            <div class="col-7 fw-bold text-danger fs-5">{{ paymentData.so_tien_format }}</div>
                            
                            <div class="col-5 text-muted">Nội dung CK:</div>
                            <div class="col-7 fw-bold text-success">
                                {{ paymentData.noi_dung_chuyen_khoan }}
                                <button class="btn btn-sm btn-outline-secondary ms-2" @click="copyText(paymentData.noi_dung_chuyen_khoan)">
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Hướng dẫn -->
                    <div class="alert alert-info text-start mb-4">
                        <h6 class="mb-2"><i class="fa-solid fa-lightbulb me-2"></i>Hướng dẫn:</h6>
                        <ol class="mb-0 ps-3">
                            <li>Mở app ngân hàng và quét mã QR</li>
                            <li>Kiểm tra thông tin và số tiền</li>
                            <li>Nhập đúng nội dung chuyển khoản</li>
                            <li>Xác nhận thanh toán</li>
                        </ol>
                    </div>

                    <!-- Nút kiểm tra -->
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-lg" @click="checkPaymentManual" :disabled="checking">
                            <span v-if="checking">
                                <span class="spinner-border spinner-border-sm me-2"></span>
                                Đang kiểm tra...
                            </span>
                            <span v-else>
                                <i class="fa-solid fa-rotate me-2"></i>
                                Tôi đã thanh toán
                            </span>
                        </button>
                        <router-link to="/lich-su-don-hang" class="btn btn-outline-secondary">
                            <i class="fa-solid fa-arrow-left me-2"></i>
                            Quay lại
                        </router-link>
                    </div>
                </div>

                <!-- ERROR -->
                <div v-else class="py-4">
                    <i class="fa-solid fa-triangle-exclamation text-danger" style="font-size: 60px;"></i>
                    <h5 class="text-danger mt-3">{{ errorMessage }}</h5>
                    <router-link to="/" class="btn btn-primary mt-3">
                        <i class="fa-solid fa-home me-2"></i>
                        Về trang chủ
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            checking: false,
            isPaid: false,
            maDonHang: null,
            paymentData: null,
            errorMessage: null,
            timeRemaining: 15 * 60, // 15 phút
            pollingInterval: null,
            timerInterval: null,
            redirectCountdown: 3,
            redirectInterval: null,
        };
    },

    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    async mounted() {
        // Lấy mã đơn hàng từ URL query hoặc route params
        let rawMaDonHang = this.$route.query.order || this.$route.params.ma_don_hang;
        
        if (rawMaDonHang) {
            // Trim whitespace and trailing slashes
            this.maDonHang = rawMaDonHang.replace(/\/+$/, '').trim();
        }
        
        if (!this.maDonHang) {
            this.loading = false;
            this.errorMessage = 'Không tìm thấy mã đơn hàng';
            return;
        }

        await this.createPayment();
        
        // Bắt đầu polling kiểm tra trạng thái
        this.startPolling();
        
        // Bắt đầu countdown timer
        this.startTimer();
    },

    beforeUnmount() {
        // Dọn dẹp intervals
        if (this.pollingInterval) clearInterval(this.pollingInterval);
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.redirectInterval) clearInterval(this.redirectInterval);
    },

    methods: {
        async createPayment() {
            try {
                // Lấy thông tin đơn hàng từ localStorage hoặc API
                const orderInfo = JSON.parse(localStorage.getItem('pending_order') || '{}');
                const soTien = orderInfo.tien_thuc_nhan || 0;

                const res = await axios.post('/payment/sepay/create', {
                    ma_don_hang: this.maDonHang,
                    so_tien: soTien
                });

                if (res.data.status) {
                    this.paymentData = res.data.data;
                } else {
                    this.errorMessage = res.data.message || 'Không thể tạo thanh toán';
                }
            } catch (error) {
                console.error('Create payment error:', error);
                // Nếu API create thất bại, thử lấy QR từ API get
                await this.getQrCode();
            } finally {
                this.loading = false;
            }
        },

        async getQrCode() {
            try {
                const res = await axios.get(`/payment/sepay/qr/${this.maDonHang}`);
                if (res.data.status) {
                    this.paymentData = res.data.data;
                } else {
                    this.errorMessage = res.data.message;
                }
            } catch (error) {
                this.errorMessage = 'Không thể tải mã QR';
            }
        },

        startPolling() {
            // Polling mỗi 5 giây
            this.pollingInterval = setInterval(() => {
                this.checkPaymentStatus();
            }, 5000);
        },

        startTimer() {
            this.timerInterval = setInterval(() => {
                if (this.timeRemaining > 0) {
                    this.timeRemaining--;
                } else {
                    clearInterval(this.timerInterval);
                    clearInterval(this.pollingInterval);
                    this.errorMessage = 'Hết thời gian thanh toán. Vui lòng thử lại.';
                    this.paymentData = null;
                }
            }, 1000);
        },

        async checkPaymentStatus() {
            try {
                const url = `/payment/sepay/status/${this.maDonHang}`;
                console.log('Checking payment status at:', url);
                const res = await axios.get(url);
                
                if (res.data.status && res.data.data.is_paid) {
                    this.isPaid = true;
                    clearInterval(this.pollingInterval);
                    clearInterval(this.timerInterval);
                    // Xóa pending order và thông báo cho PaymentBubble
                    localStorage.removeItem('pending_order');
                    window.dispatchEvent(new Event('payment-completed'));
                    this.$toast.success('Thanh toán thành công!');
                    
                    // Bắt đầu đếm ngược chuyển trang
                    this.startRedirectTimer();
                }
            } catch (error) {
                console.error('Check status error:', error);
            }
        },

        async checkPaymentManual() {
            this.checking = true;
            await this.checkPaymentStatus();
            
            if (!this.isPaid) {
                this.$toast.info('Chưa nhận được thanh toán. Vui lòng đợi hoặc kiểm tra lại giao dịch.');
            }
            
            this.checking = false;
        },

        copyText(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.$toast.success('Đã copy: ' + text);
            }).catch(() => {
                this.$toast.error('Không thể copy');
            });
        },

        startRedirectTimer() {
            this.redirectInterval = setInterval(() => {
                if (this.redirectCountdown > 1) {
                    this.redirectCountdown--;
                } else {
                    clearInterval(this.redirectInterval);
                    this.$router.push('/lich-su-don-hang');
                }
            }, 1000);
        }
    }
};
</script>

<style scoped>
.qr-wrapper {
    border: 3px solid #667eea;
}

.success-animation i {
    animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.transfer-info {
    border-left: 4px solid #667eea;
}
</style>
