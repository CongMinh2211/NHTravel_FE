<template>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../../assets/images/homecustomer/listtour1.jpeg" class="d-block w-100"
                    style="width: 100%; height: 250px; object-fit: cover;">
            </div>
            <div class="carousel-item ">
                <img src="../../../assets/images/homecustomer/listtour2.jpg" class="d-block w-100"
                    style="width: 100%; height: 250px; object-fit: cover;">
            </div>
            <div class="carousel-item ">
                <img src="../../../assets/images/homecustomer/listtuor4.jpg" class="d-block w-100 img-fluid"
                    style="width: 100%; height: 250px; object-fit: cover;">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>

    <div class="container mt-3">
        <div class="row">
            <div class="text-center mb-3">
                <h4 class="text-uppercase fs-3 text-dark">Danh mục Tour Miền Trung</h4>
                <p class="text-muted">Khám phá vẻ đẹp miền Trung Việt Nam</p>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <!-- No tours state -->
            <div v-else-if="listTour.length === 0" class="col-12 text-center py-5">
                <i class="fa-solid fa-plane-slash fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Chưa có tour nào thuộc Miền Trung</h5>
            </div>

            <!-- Tour list -->
            <template v-else>
                <div v-for="(value, index) in listTour" :key="index" class="col-lg-3 col-md-4 rounded mb-5" style="flex: 0 0 auto;">
                    <div class="rounded position-relative"
                        style="transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden; height: 100%;"
                        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.2)'; this.querySelector('.btn-overlay').style.opacity = '1'"
                        onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.querySelector('.btn-overlay').style.opacity = '0'">

                        <div class="card-img-top">
                            <div class="position-relative">
                                <img :src="value.anh_dai_dien || value.anh" class="card-img-top"
                                    style="height: 270px; width: 320px; object-fit: cover;">
                                <!-- map -->
                                <div class="position-absolute bottom-0 start-0">
                                    <span class="badge bg-danger">
                                        <i class="fa-solid fa-map-pin"></i>
                                        {{ value.dia_diem }}
                                    </span>
                                </div>
                                <!-- Region badge -->
                                <div class="position-absolute top-0 end-0 m-2">
                                    <span class="badge bg-info text-dark">
                                        <i class="fa-solid fa-tag"></i> Miền Trung
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="btn-overlay text-center position-absolute w-100"
                            style="top: 40%; left: 50%; transform: translate(-50%, -50%); opacity: 0; transition: opacity 0.3s ease;">
                            <router-link :to="`/chi-tiet-tour/${value.id}`">
                                <button class="btn btn-success p-2 " style="width: 170px;">
                                    <i class="fa-solid fa-plane"></i>
                                    Xem chi tiết</button>
                            </router-link>
                        </div>
                        <div class="card-body ms-2 mt-2 me-2">
                            <h5 class="card-title text-nowrap">{{ value.ten_tour }}</h5>
                            <div class="card-text">
                                <div class="d-flex justify-content-between mt-2">
                                    <div class="text-secondary">
                                        <i class="fa-solid fa-clock me-2"></i>
                                        <span>
                                            {{ formatDate(value.ngay_di) }} → {{ formatDate(value.ngay_ve) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-2">
                                    <div class="text-secondary">
                                        <i class="fa-solid fa-chair me-1"></i>
                                        <small>Còn: {{ value.so_cho_con }} chỗ</small>
                                    </div>
                                    <div class="text-secondary">
                                        <i class="fa-solid fa-bus"></i>
                                    </div>
                                </div>
                                <h4 style="color: darkorange;" class="text-start mt-2">
                                    {{ formatVND(value.gia_nguoi_lon) }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            listTour: [],
            loading: true,
            // ID danh mục Miền Trung
            mienTrungCategoryId: 2,
        }
    },
    mounted() {
        this.getTourMienTrung();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number || 0);
        },
        formatDate(date) {
            if (!date) return '';
            return new Date(date).toLocaleDateString('vi-VN');
        },
        getTourMienTrung() {
            this.loading = true;
            axios.get("/customer/tour/get-data")
                .then(res => {
                    if (res.data && res.data.data) {
                        // Lọc tour Miền Trung dựa trên id_danh_muc = 2
                        this.listTour = res.data.data.filter(tour => {
                            return tour.id_danh_muc == this.mienTrungCategoryId && tour.so_cho_con > 0;
                        });
                        console.log('Tour Miền Trung:', this.listTour);
                    }
                })
                .catch(err => {
                    console.error("Lỗi khi lấy tour Miền Trung:", err);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>
<style></style>
