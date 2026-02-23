<template>
    <div class="container py-5">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-lg-4 mb-4">
                <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
                    <div class="card-header bg-primary py-4 text-center">
                        <div class="position-relative d-inline-block">
                            <img :src="profile.avatar || 'https://i.pinimg.com/736x/eb/55/4c/eb554c8ebd4ee9ff53b270504839b3d9.jpg'" 
                                 class="rounded-circle border border-4 border-white shadow"
                                 style="width: 120px; height: 120px; object-fit: cover;">
                            <label for="avatarInput" class="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm cursor-pointer" style="width: 35px; height: 35px; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-solid fa-camera text-primary"></i>
                                <input type="file" id="avatarInput" class="d-none" @change="onFileChange">
                            </label>
                        </div>
                        <h4 class="text-white mt-3 mb-0">{{ profile.ho_ten }}</h4>
                        <p class="text-white-50 small mb-0">{{ profile.email }}</p>
                    </div>
                    <div class="card-body p-0">
                        <div class="list-group list-group-flush">
                            <button @click="activeTab = 'info'" 
                                    :class="['list-group-item list-group-item-action py-3 border-0', activeTab === 'info' ? 'active bg-primary-light text-primary fw-bold' : '']">
                                <i class="fa-solid fa-user me-3"></i> Thông tin tài khoản
                            </button>
                            <button @click="activeTab = 'password'" 
                                    :class="['list-group-item list-group-item-action py-3 border-0', activeTab === 'password' ? 'active bg-primary-light text-primary fw-bold' : '']">
                                <i class="fa-solid fa-lock me-3"></i> Đổi mật khẩu
                            </button>
                            <router-link to="/lich-su-dat-tour" class="list-group-item list-group-item-action py-3 border-0">
                                <i class="fa-solid fa-history me-3"></i> Lịch sử đặt tour
                            </router-link>
                            <button class="list-group-item list-group-item-action py-3 border-0 text-danger" @click="dangXuat">
                                <i class="fa-solid fa-right-from-bracket me-3"></i> Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-8">
                <!-- Tab Thông tin -->
                <div v-if="activeTab === 'info'" class="card shadow-sm border-0 rounded-4">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold mb-4">Cập Nhật Thông Tin</h5>
                        <form @submit.prevent="updateProfile">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Họ và tên</label>
                                    <input v-model="profile.ho_ten" type="text" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Số điện thoại</label>
                                    <input v-model="profile.so_dien_thoai" type="tel" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle">
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label fw-semibold">Địa chỉ Email</label>
                                    <input v-model="profile.email" type="email" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Số CCCD</label>
                                    <input v-model="profile.cccd" type="text" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-semibold">Ngày sinh</label>
                                    <input v-model="profile.ngay_sinh" type="date" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle">
                                </div>
                            </div>
                            <div class="mt-4 text-end">
                                <button type="submit" class="btn btn-primary rounded-pill px-5 py-2 fw-bold" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Tab Mật khẩu -->
                <div v-if="activeTab === 'password'" class="card shadow-sm border-0 rounded-4">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold mb-4">Đổi Mật Khẩu</h5>
                        <form @submit.prevent="changePassword">
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Mật khẩu hiện tại</label>
                                <input v-model="passwordForm.password_cu" type="password" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle" placeholder="••••••••">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Mật khẩu mới</label>
                                <input v-model="passwordForm.password_moi" type="password" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle" placeholder="Tối thiểu 6 ký tự">
                            </div>
                            <div class="mb-4">
                                <label class="form-label fw-semibold">Xác nhận mật khẩu mới</label>
                                <input v-model="passwordForm.re_password_moi" type="password" class="form-control rounded-pill px-4 py-2 shadow-none border-light-subtle" placeholder="Nhập lại mật khẩu mới">
                            </div>
                            <div class="text-end">
                                <button type="submit" class="btn btn-primary rounded-pill px-5 py-2 fw-bold" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                    Cập Nhật Mật Khẩu
                                </button>
                            </div>
                        </form>
                    </div>
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
            activeTab: 'info',
            loading: false,
            profile: {
                ho_ten: '',
                email: '',
                so_dien_thoai: '',
                cccd: '',
                ngay_sinh: '',
                avatar: ''
            },
            passwordForm: {
                password_cu: '',
                password_moi: '',
                re_password_moi: ''
            }
        };
    },
    mounted() {
        this.getProfileData();
    },
    methods: {
        getProfileData() {
            axios.get('/thong-tin', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth_token")
                }
            })
            .then(res => {
                if(res.data.status) {
                    this.profile = res.data.data;
                }
            })
            .catch(() => {
                this.$toast.error("Không thể lấy thông tin người dùng!");
            });
        },
        updateProfile() {
            this.loading = true;
            axios.post('/customer/profile/update', this.profile, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth_token")
                }
            })
            .then(res => {
                if(res.data.status) {
                    this.$toast.success(res.data.message);
                    // Cập nhật lại localStorage để header đồng bộ
                    const auth = JSON.parse(localStorage.getItem('auth_user'));
                    auth.ho_ten = this.profile.ho_ten;
                    localStorage.setItem('auth_user', JSON.stringify(auth));
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                const msg = err.response?.data?.message || "Lỗi cập nhật!";
                this.$toast.error(msg);
            })
            .finally(() => {
                this.loading = false;
            });
        },
        changePassword() {
            this.loading = true;
            axios.post('/customer/profile/change-password', this.passwordForm, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth_token")
                }
            })
            .then(res => {
                if(res.data.status) {
                    this.$toast.success(res.data.message);
                    this.passwordForm = {
                        password_cu: '',
                        password_moi: '',
                        re_password_moi: ''
                    };
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(err => {
                const msg = err.response?.data?.message || "Lỗi đổi mật khẩu!";
                this.$toast.error(msg);
            })
            .finally(() => {
                this.loading = false;
            });
        },
        dangXuat() {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            this.$router.push('/dang-nhap');
            this.$toast.info("Đã đăng xuất");
        },
        onFileChange(e) {
            // Tạm thời chỉ để giao diện (hoặc bạn có API upload ảnh riêng)
            this.$toast.info("Tính năng upload ảnh đang được phát triển!");
        }
    }
}
</script>

<style scoped>
.bg-primary-light {
    background-color: #f0f7ff;
}
.cursor-pointer {
    cursor: pointer;
}
.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.1) !important;
}
</style>
