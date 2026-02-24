<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-lg-5">
                <div class="card">
                    <div class="card-header">
                        <h4>Liên hệ với chúng tôi</h4>
                    </div>
                    <div class="card-body">
                        <input v-model="list_lien_he.ten" type="text" class="form-control mt-2 mb-3"
                            placeholder="Họ và tên">
                        <input v-model="list_lien_he.email" type="text" class="form-control mt-2 mb-3"
                            placeholder="Email">
                        <input v-model="list_lien_he.so_dien_thoai" type="text" class="form-control mt-2 mb-3"
                            placeholder="Điện Thoại">
                        <textarea v-model="list_lien_he.tin_nhan" class="form-control mt-2 mb-3" placeholder="Nội dung"
                            rows="3"></textarea>

                        <button @click="guiThongTinLienHe()" class="btn btn-primary mt-3">Gửi thông tin</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4>Công ty cổ phần dịch vụ HiTravel</h4>
                        <div class="d-flex ">
                            <div class="me-auto p-2 mt-2 ms-2"><i class="fa-solid fa-location-dot fa-2x"></i></div>
                            <div class="p-2">
                                <h6><b>Địa chỉ:</b></h6>
                                <p class="mt-0">Tầng 6, Tòa HaHa, Điện Biên Phủ, Quận Thanh Khê, TP Đà Nẵng</p>
                            </div>
                        </div>
                        <div class="d-flex ">
                            <div class="p-2 mt-2 ms-2"><i class="fa-solid fa-envelope fa-2x"></i></div>
                            <div class="p-2">
                                <h6><b>Email:</b></h6>
                                <p class="mt-0">hitreavel2025.@gmail.com</p>
                            </div>
                        </div>
                        <div class="d-flex ">
                            <div class="p-2 mt-2 ms-2"><i class="fa-solid fa-phone fa-2x"></i></div>
                            <div class="p-2">
                                <h6><b>Hotline:</b></h6>
                                <p class="mt-0">0392864769</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="text-center mt-5">
                    <img src="../../../assets/images/anh/lien-he.webp" alt="">
                </div>
                <p class="text-center mt-3"><b>Để được hỗ trợ nhanh hơn, vui lòng gửi yêu cầu của bạn qua biểu mẫu</b>
                </p>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Câu hỏi & Giải Pháp</h5>
                        <hr>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Xác nhận và xác thực thanh toán
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample" style="">
                                    <div class="accordion-body"> Thông báo sẽ được gửi tới sms và email của quý khách
                                        ngay khi xử lý xong</div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Accordion Item #2
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample" style="">
                                    <div class="accordion-body"> <strong>This is the second item's accordion
                                            body.</strong> It is hidden by default, until the collapse plugin adds the
                                        appropriate classes that we use to style each element. These classes control the
                                        overall appearance, as well as the showing and hiding via CSS transitions. You
                                        can modify any of this with custom CSS or overriding our default variables. It's
                                        also worth noting that just about any HTML can go within the
                                        <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse"
                                    aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div class="accordion-body"> <strong>This is the third item's accordion
                                            body.</strong> It is hidden by default, until the collapse plugin adds the
                                        appropriate classes that we use to style each element. These classes control the
                                        overall appearance, as well as the showing and hiding via CSS transitions. You
                                        can modify any of this with custom CSS or overriding our default variables. It's
                                        also worth noting that just about any HTML can go within the
                                        <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Accordion Item #4
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse"
                                    aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div class="accordion-body"> <strong>This is the third item's accordion
                                            body.</strong> It is hidden by default, until the collapse plugin adds the
                                        appropriate classes that we use to style each element. These classes control the
                                        overall appearance, as well as the showing and hiding via CSS transitions. You
                                        can modify any of this with custom CSS or overriding our default variables. It's
                                        also worth noting that just about any HTML can go within the
                                        <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card mb-3">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Khám phá Địa danh Việt Nam</h5>
                        <small v-if="userLocation">Đã tìm thấy vị trí của bạn!</small>
                    </div>
                    <div class="card-body p-0">
                        <div class="row g-0">
                            <div class="col-md-9 border-end">
                                <div id="map" style="height: 550px; width: 100%; z-index: 1;"></div>
                            </div>
                            <div class="col-md-3">
                                <div class="p-3" style="height: 550px; overflow-y: auto;">
                                    <h6 class="fw-bold mb-3">Địa danh gợi ý <span v-if="userLocation">(Gần bạn nhất)</span></h6>
                                    <div class="list-group list-group-flush">
                                        <button 
                                            v-for="(place, index) in sortedLandmarks" 
                                            :key="index"
                                            @click="flyToPlace(place)"
                                            class="list-group-item list-group-item-action d-flex flex-column align-items-start border-0 px-0 mb-2 py-2"
                                        >
                                            <div class="d-flex w-100 justify-content-between align-items-center">
                                                <span class="fw-bold text-primary">{{ place.name }}</span>
                                                <span v-if="place.distance" class="badge bg-secondary rounded-pill">{{ place.distance.toFixed(1) }} km</span>
                                            </div>
                                            <small class="text-muted">{{ place.desc }}</small>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
            list_lien_he: {
                ten: '',
                email: '',
                so_dien_thoai: '',
                tin_nhan: '',
                trang_thai: 'chua_xem',
            },
            map: null,
            userMarker: null,
            userLocation: null,
            landmarks: [
                { name: "Fansipan (Sapa)", coords: [22.3364, 103.8438], desc: "Nóc nhà Đông Dương", distance: null },
                { name: "Vịnh Hạ Long", coords: [20.9101, 107.1839], desc: "Di sản thiên nhiên thế giới", distance: null },
                { name: "Động Phong Nha", coords: [17.5126, 106.2731], desc: "Kỳ quan đệ nhất động", distance: null },
                { name: "Cố đô Huế", coords: [16.4674, 107.5786], desc: "Di sản văn hóa cố đô", distance: null },
                { name: "Cầu Vàng Đà Nẵng", coords: [15.9961, 107.9942], desc: "Biểu tượng du lịch Đà Nẵng", distance: null },
                { name: "Phố cổ Hội An", coords: [15.8801, 108.3273], desc: "Thương cảng cổ kính", distance: null },
                { name: "Vinpearl Nha Trang", coords: [12.2154, 109.2208], desc: "Thiên đường vui chơi giải trí", distance: null },
                { name: "Thành phố Đà Lạt", coords: [11.9404, 108.4583], desc: "Thành phố ngàn hoa", distance: null },
                { name: "Dinh Độc Lập", coords: [10.7770, 106.6953], desc: "Di tích lịch sử tại TP.HCM", distance: null },
                { name: "Đảo Ngọc Phú Quốc", coords: [10.2899, 103.9840], desc: "Hòn đảo lớn nhất Việt Nam", distance: null }
            ]
        }
    },
    computed: {
        sortedLandmarks() {
            if (!this.userLocation) return this.landmarks;
            return [...this.landmarks].sort((a, b) => a.distance - b.distance);
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            // Giới hạn bản đồ trong lãnh thổ Việt Nam
            const vnBounds = L.latLngBounds([8.0, 102.0], [24.0, 110.0]);

            this.map = L.map('map', {
                maxBounds: vnBounds,
                maxBoundsViscosity: 1.0,
                minZoom: 5
            }).setView([16.047, 108.206], 6);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap authors'
            }).addTo(this.map);

            // Thêm tất cả marker địa danh
            this.landmarks.forEach(place => {
                L.marker(place.coords)
                    .addTo(this.map)
                    .bindPopup(`<b>${place.name}</b><br>${place.desc}`);
            });

            this.locateUser();
        },
        locateUser() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    this.userLocation = [latitude, longitude];

                    // Tính khoảng cách đến các địa danh
                    this.landmarks.forEach(place => {
                        place.distance = this.calculateDistance(latitude, longitude, place.coords[0], place.coords[1]);
                    });

                    // Marker người dùng
                    if (this.userMarker) this.map.removeLayer(this.userMarker);
                    
                    const redIcon = L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
                    });

                    this.userMarker = L.marker(this.userLocation, { icon: redIcon })
                        .addTo(this.map)
                        .bindPopup("<b>Bạn đang ở đây</b>")
                        .openPopup();

                    this.map.flyTo(this.userLocation, 10);
                });
            }
        },
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Bán kính Trái Đất theo km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                      Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        },
        flyToPlace(place) {
            this.map.flyTo(place.coords, 12);
            // Tìm marker của địa điểm này (tạm thời mở popup bằng cách lặp qua các layer hoặc giả lập nhấn)
            L.popup()
                .setLatLng(place.coords)
                .setContent(`<b>${place.name}</b><br>${place.desc}`)
                .openOn(this.map);
        },
        validateLienHe(data) {
            if (!data.ten || !data.email || !data.so_dien_thoai || !data.tin_nhan) {
                this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
                return false;
            }
            return true;
        },
        guiThongTinLienHe() {
            if (!this.validateLienHe(this.list_lien_he)) return;

            axios
                .post("/admin/lien-he/guiThongTin", this.list_lien_he)

                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.list_lien_he = {
                            ten: '',
                            email: '',
                            so_dien_thoai: '',
                            tin_nhan: ''
                        };
                    } else {
                        this.$toast.error(res.data.message || "Gửi thất bại!");
                    }
                })
                .catch(() => this.$toast.error("API lỗi khi gửi thông tin!"));
        }



    }
}
</script>
<style></style>
