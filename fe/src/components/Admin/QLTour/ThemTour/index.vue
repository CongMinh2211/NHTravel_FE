<template>
    <div class="container mt-2">
        <div class="card p-4">

            <h2 class="text-center mb-3"><b>Thêm Tour Du Lịch</b></h2>
            <hr />

            <!-- ============ BƯỚC 1: THÔNG TIN TOUR ============ -->
            <h5>Bước 1: Nhập thông tin tour</h5>
            <div class="row mt-2">

                <div class="col-md-6 mb-3">
                    <label>Tên tour *</label>
                    <input class="form-control" v-model="form.ten_tour" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Danh mục tour *</label>
                    <select class="form-select" v-model="form.id_danh_muc">
                        <option disabled value="">-- Chọn danh mục --</option>
                        <option v-for="(value, index) in danhMuc" :key="index" :value="value.id">
                            {{ value.ten_danh_muc }}
                        </option>
                    </select>
                </div>

                <div class="col-md-6 mb-3">
                    <label>Giá người lớn *</label>
                    <input type="number" class="form-control" v-model="form.gia_nguoi_lon" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Giá trẻ em *</label>
                    <input type="number" class="form-control" v-model="form.gia_tre_em" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Ngày đi *</label>
                    <input type="date" class="form-control" v-model="form.ngay_di" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Ngày về *</label>
                    <input type="date" class="form-control" v-model="form.ngay_ve" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Giờ đi *</label>
                    <input type="time" class="form-control" v-model="form.gio_di" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Giờ về *</label>
                    <input type="time" class="form-control" v-model="form.gio_ve" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Địa điểm (Tỉnh/Thành) *</label>
                    <select class="form-select" v-model="form.dia_diem" @change="updateCoordinates">
                        <option value="">-- Chọn địa điểm --</option>
                        <option v-for="(prov, idx) in list34Provinces" :key="idx" :value="prov.name">{{ prov.name }}</option>
                    </select>
                </div>

                <div class="col-md-3 mb-3">
                    <label>Vĩ độ (Latitude) *</label>
                    <input class="form-control" v-model="form.latitude" placeholder="VD: 10.762622" />
                </div>

                <div class="col-md-3 mb-3">
                    <label>Kinh độ (Longitude) *</label>
                    <input class="form-control" v-model="form.longitude" placeholder="VD: 106.660172" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Số chỗ *</label>
                    <input type="number" class="form-control" v-model="form.so_cho" />
                </div>

                <div class="col-md-6 mb-3">
                    <label>Trạng thái *</label>
                    <select class="form-select" v-model="form.trang_thai">
                        <option value="hoat_dong">Hoạt động</option>
                        <option value="tam_dung">Tạm đóng</option>
                    </select>
                </div>
                

                <div class="col-12 mb-3">
                    <label>Mô tả *</label>
                    <textarea class="form-control" rows="4" v-model="form.mo_ta"></textarea>
                </div>
            </div>

            <hr />

            <!-- ============ BƯỚC 2: URL ẢNH TOUR ============ -->
            <h5>Bước 2: Thêm URL hình ảnh</h5>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Nhập URL ảnh" v-model="newAnhUrl" />
                <button class="btn btn-primary" @click="themAnhUrl">Thêm ảnh</button>
            </div>

            <div class="row g-2">
                <div class="col-3" v-for="(img, index) in form.anh" :key="index">
                    <div class="border p-1 position-relative">
                        <img :src="img" class="w-100" style="height:120px;object-fit:cover" />
                        <button class="btn btn-danger btn-sm position-absolute top-0 end-0"
                            @click="xoaAnh(index)">X</button>
                    </div>
                </div>
            </div>

            <hr />

            <!-- ============ BƯỚC 3: LỊCH TRÌNH ============ -->
            <h5>Bước 3: Nhập lịch trình tour</h5>
            <button class="btn btn-primary btn-sm mb-3" @click="themNgayLichTrinh">
                + Thêm ngày
            </button>

            <div class="border rounded p-3 mb-3" v-for="(value, index) in form.lich_trinh" :key="index">
                <label>Ngày {{ index + 1 }}</label>
                <input class="form-control mb-2" placeholder="Tiêu đề ngày" v-model="value.tieu_de" />
                <textarea class="form-control mb-2" rows="3" placeholder="Nội dung chi tiết..."
                    v-model="value.noi_dung"></textarea>
                <button class="btn btn-danger btn-sm" @click="xoaNgayLichTrinh(index)">Xóa ngày</button>
            </div>

            <hr />

            <!-- SUBMIT -->
            <button class="btn btn-success" @click="themTour()">Thêm Tour</button>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            form: {
                ten_tour: "",
                id_danh_muc: "",
                mo_ta: "",
                gia_nguoi_lon: "",
                gia_tre_em: "",
                ngay_di: "",
                ngay_ve: "",
                gio_di: "",
                gio_ve: "",
                dia_diem: "",
                latitude: "",
                longitude: "",
                so_cho: "",
                trang_thai: "Hoạt động",
                anh: [], // array URL ảnh
                lich_trinh: []
            },
            newAnhUrl: "", // input thêm URL ảnh
            danhMuc: [],
            list34Provinces: [
                { name: 'Hà Nội', lat: 21.028511, lng: 105.804817 },
                { name: 'Lào Cai (Sapa)', lat: 22.339396, lng: 103.840618 },
                { name: 'Quảng Ninh (Hạ Long)', lat: 20.959902, lng: 107.096230 },
                { name: 'Ninh Bình', lat: 20.253912, lng: 105.975000 },
                { name: 'Hải Phòng (Cát Bà)', lat: 20.844912, lng: 106.688084 },
                { name: 'Hà Giang', lat: 22.823351, lng: 104.980649 },
                { name: 'Sơn La (Mộc Châu)', lat: 20.852433, lng: 104.577242 },
                { name: 'Điện Biên', lat: 21.385494, lng: 103.015243 },
                { name: 'Cao Bằng', lat: 22.658253, lng: 106.262502 },
                { name: 'Thừa Thiên Huế', lat: 16.463713, lng: 107.590866 },
                { name: 'Đà Nẵng', lat: 16.054407, lng: 108.202167 },
                { name: 'Quảng Nam (Hội An)', lat: 15.880058, lng: 108.338047 },
                { name: 'Quảng Bình (Phong Nha)', lat: 17.483320, lng: 106.598270 },
                { name: 'Nghệ An (Cửa Lò)', lat: 18.673323, lng: 105.681329 },
                { name: 'Phú Yên', lat: 13.088185, lng: 109.313593 },
                { name: 'Bình Định (Quy Nhơn)', lat: 13.775836, lng: 109.219263 },
                { name: 'Khánh Hòa (Nha Trang)', lat: 12.238791, lng: 109.196749 },
                { name: 'Bình Thuận (Mũi Né)', lat: 10.933333, lng: 108.100000 },
                { name: 'Ninh Thuận', lat: 11.565863, lng: 108.992200 },
                { name: 'Lâm Đồng (Đà Lạt)', lat: 11.940419, lng: 108.458313 },
                { name: 'Kon Tum (Măng Đen)', lat: 14.348633, lng: 108.000720 },
                { name: 'Gia Lai', lat: 13.978280, lng: 108.007620 },
                { name: 'Đắk Lắk (Buôn Ma Thuột)', lat: 12.666667, lng: 108.033333 },
                { name: 'Hồ Chí Minh', lat: 10.823099, lng: 106.629662 },
                { name: 'Bà Rịa - Vũng Tàu', lat: 10.411401, lng: 107.136247 },
                { name: 'Kiên Giang (Phú Quốc)', lat: 10.224855, lng: 103.957599 },
                { name: 'Cần Thơ', lat: 10.045162, lng: 105.746853 },
                { name: 'An Giang (Châu Đốc)', lat: 10.728952, lng: 105.125896 },
                { name: 'Cà Mau', lat: 9.176918, lng: 105.150058 },
                { name: 'Bến Tre', lat: 10.240562, lng: 106.375496 },
                { name: 'Đồng Tháp (Sa Đéc)', lat: 10.291771, lng: 105.753386 },
                { name: 'Tiền Giang (Mỹ Tho)', lat: 10.354013, lng: 106.365942 },
                { name: 'Tây Ninh', lat: 11.311550, lng: 106.096388 },
                { name: 'Vĩnh Phúc (Tam Đảo)', lat: 21.456673, lng: 105.642055 }
            ]
        };
    },
    mounted() {
        this.getListDanhMuc();
    },
    methods: {
        getListDanhMuc() {
            axios.get("/admin/danh-muc-tour/get-data")
                .then(res => {
                    this.danhMuc = res.data.data;
                });
        },
        updateCoordinates() {
            const selected = this.list34Provinces.find(p => p.name === this.form.dia_diem);
            if (selected) {
                this.form.latitude = selected.lat;
                this.form.longitude = selected.lng;
            } else {
                this.form.latitude = '';
                this.form.longitude = '';
            }
        },

        themAnhUrl() {
            if (this.newAnhUrl.trim() !== "") {
                this.form.anh.push(this.newAnhUrl.trim());
                this.newAnhUrl = "";
            }
        },

        xoaAnh(index) {
            this.form.anh.splice(index, 1);
        },

        themNgayLichTrinh() {
            this.form.lich_trinh.push({ tieu_de: "", noi_dung: "" });
        },

        xoaNgayLichTrinh(index) {
            this.form.lich_trinh.splice(index, 1);
        },

        themTour() {
            // Tạo payload JSON
            const user = JSON.parse(localStorage.getItem("auth_user"));
            console.log("User đang login:", user);
            if (!user || user.id_chuc_vu !== 1) {
                this.$toast.error("Bạn không có quyền thêm tour");
                return;
            }
            const payload = {
                ...this.form
            };

            axios.post("/admin/them-tour", payload, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("auth_token")
                }
            })
                .then(res => {
                    this.$toast.success("Thêm tour thành công!");
                    // Reset form
                    this.form = {
                        ten_tour: "",
                        id_danh_muc: "",
                        mo_ta: "",
                        gia_nguoi_lon: "",
                        gia_tre_em: "",
                        ngay_di: "",
                        ngay_ve: "",
                        gio_di: "",
                        gio_ve: "",
                        dia_diem: "",
                        latitude: "",
                        longitude: "",
                        so_cho: "",
                        trang_thai: "Hoạt động",
                        anh: [],
                        lich_trinh: []
                    };
                })
                .catch(err => {
                    console.error(err.response?.data || err);
                    this.$toast.error("Có lỗi xảy ra!");
                });
        }
    }
};
</script>

<style scoped>
/* Bạn có thể thêm style nếu muốn */
</style>
