<template>

    <div class="position-relative">

        <!-- carousel video du lịch Việt Nam -->
        <div id="carouselVideo" class="carousel slide" style="width: 100%;">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselVideo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#carouselVideo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselVideo" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <video autoplay muted playsinline style="width: 100%; height: 850px; object-fit: cover;" @ended="nextSlide">
                        <source src="../../../assets/images/homecustomer/vietnam_travel.mp4" type="video/mp4">
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="fw-bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Khám phá Việt Nam</h2>
                        <p style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">Vẻ đẹp thiên nhiên tuyệt vời</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <video autoplay muted playsinline style="width: 100%; height: 850px; object-fit: cover;" @ended="nextSlide">
                        <source src="../../../assets/images/homecustomer/vietnam_travel_2.mp4" type="video/mp4">
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="fw-bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Vẻ đẹp bất tận</h2>
                        <p style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">Trải nghiệm từng khoảnh khắc</p>
                    </div>
                </div>

                <div class="carousel-item">
                    <video autoplay muted playsinline style="width: 100%; height: 850px; object-fit: cover;" @ended="nextSlide">
                        <source src="../../../assets/images/homecustomer/vietnam_travel_4.mp4" type="video/mp4">
                    </video>
                    <div class="carousel-caption d-none d-md-block">
                        <h2 class="fw-bold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Bản sắc văn hóa</h2>
                        <p style="text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">Hào khí Việt Nam</p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselVideo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselVideo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>

        <div class="position-absolute top-100 start-50 translate-middle w-50">

            <!-- KHUNG TÌM KIẾM CHÍNH (Đã thu gọn) -->
            <div class="bg-white d-flex align-items-center py-3 px-4 rounded-pill shadow-lg mb-3" style="
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                        opacity: 0; 
                        transform: translateY(50px); 
                        transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        border: 2px solid #f0f0f0;
                    " data-animate="fade-in-up">

                <div class="flex-grow-1 px-3">
                    <label
                        style="font-weight: 800; font-size: 0.95rem; color: #1e3a8a; margin-bottom: 2px; display: block;">
                        <i class="fa-solid fa-location-dot me-2 text-primary"></i>
                        Điểm đến <span style="color: #f87171;">*</span>
                    </label>
                    <input type="text" v-model="searchText"
                        style="border: none; outline: none; width: 100%; color: #374151; font-size: 1.1rem; padding: 0; background: transparent;"
                        placeholder="Tìm kiếm thành phố, điểm tham quan...">
                    <p v-if="errors.diaDiem" class="text-danger mt-1" style="font-size: 0.85rem;">
                        {{ errors.diaDiem }}
                    </p>

                </div>

                <div class="d-none d-md-block"
                    style="width: 1px; height: 35px; background-color: #d1d5db; margin: 0 8px;"></div>

                <div class="px-3" style="min-width: 180px;">
                    <label
                        style="font-weight: 800; font-size: 0.95rem; color: #1e3a8a; margin-bottom: 2px; display: block;">
                        <i class="fa-regular fa-calendar-alt me-2 text-success"></i>
                        Ngày đi
                    </label>
                    <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" v-model="ngayDi"
                        style="border: none; outline: none; width: 100%; color: #374151; font-size: 1.1rem; padding: 0; background: transparent;"
                        placeholder="Chọn ngày">
                </div>

                <div class="d-none d-md-block"
                    style="width: 1px; height: 35px; background-color: #d1d5db; margin: 0 8px;"></div>

                <div class="px-3" style="min-width: 160px;">
                    <label
                        style="font-weight: 800; font-size: 0.95rem; color: #1e3a8a; margin-bottom: 2px; display: block;">
                        <i class="fa-solid fa-sack-dollar me-2" style="color: #f59e0b;"></i>
                        Ngân sách
                    </label>
                    <select class="form-select border-0 p-0" v-model="nganSach"
                        style="border: none !important; outline: none !important; width: 100%; color: #374151; font-size: 1.1rem; padding: 0 !important; background: transparent !important; background-image: none !important; box-shadow: none !important;">
                        <option value="" disabled selected style="color: #6c757d;">Mức giá</option>
                        <option value="1">&lt; 5 triệu</option>
                        <option value="2">5 - 10 triệu</option>
                        <option value="3">&gt; 10 triệu</option>
                    </select>
                </div>

                <div class="ps-2">
                    <button class="shadow-lg border-0" @click="submitSearch" style="
                width: 50px; 
                height: 50px; 
                border-radius: 50%; 
                background-color: #ff5722; /* Màu cam nổi bật */
                color: white; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Hiệu ứng Pop-up */
            " onmouseover="this.style.backgroundColor='#e64a19'; this.style.transform='scale(1.15) rotate(5deg)'"
                        onmouseout="this.style.backgroundColor='#ff5722'; this.style.transform='scale(1) rotate(0deg)'">
                        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>

    <!-- INTERACTIVE TOUR DISCOVERY MAP -->
    <div class="container mt-5 pt-3 mb-5" data-animate="fade-in-up" 
         style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
        
        <!-- Header Bar -->
        <div class="d-flex justify-content-between align-items-center px-4 py-2" 
             style="background-color: #006ce4; border-radius: 12px 12px 0 0; color: white;">
            <h5 class="mb-0" style="font-weight: 700; font-size: 1.1rem;">
                <i class="fa-solid fa-earth-asia me-2"></i>Khám phá Địa danh Việt Nam
            </h5>
            <span v-if="userLat" style="font-size: 0.85rem; font-style: italic;">
                <i class="fa-solid fa-check-circle me-1"></i>Đã tìm thấy vị trí của bạn!
            </span>
        </div>

        <div class="row g-0" style="box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 2px solid #006ce4; border-top: none; border-radius: 0 0 16px 16px; overflow: hidden; background: white;">
            <!-- Left: Map -->
            <div class="col-lg-8" style="position: relative;">
                <div id="tourMap" style="height: 520px; width: 100%; border-right: 1px solid #dee2e6; z-index: 1;"></div>
                
                <!-- Legend Overlay -->
                <div style="position: absolute; bottom: 15px; left: 15px; z-index: 500; background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #eee;">
                    <div style="font-size: 0.75rem; display: flex; align-items: center; gap: 8px;">
                        <span style="background-color:#ff5722; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; display: inline-block;"></span> 
                        <span style="color: #444; font-weight: 600;">Điểm đến có Tour</span>
                    </div>
                </div>
            </div>

            <!-- Right: Sidebar -->
            <div class="col-lg-4" style="background: white; display: flex; flex-direction: column; height: 520px;">
                <div class="p-3 border-bottom" style="background: #f8f9fa;">
                    <h6 class="mb-0" style="font-weight: 800; color: #333;">
                        <i class="fa-solid fa-location-arrow me-2 text-primary"></i>Địa danh gợi ý <span v-if="userLat" class="text-muted" style="font-size: 0.8rem;">(Gần bạn nhất)</span>
                    </h6>
                </div>
                
                <div class="flex-grow-1 overflow-auto custom-scrollbar" style="padding: 0;">
                    <template v-if="uniqueLocations && uniqueLocations.length > 0">
                        <div v-for="(loc, index) in uniqueLocations" :key="index" 
                             @click="focusLocation(loc)"
                             class="p-3 border-bottom location-item" 
                             style="cursor: pointer; transition: all 0.2s ease;">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <div style="font-weight: 700; color: #006ce4; font-size: 0.95rem;">{{ loc.dia_diem }}</div>
                                    <div style="font-size: 0.75rem; color: #666; margin-top: 2px;">{{ loc.description || 'Khám phá vẻ đẹp tại ' + loc.dia_diem }}</div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div v-if="weatherStore[loc.dia_diem]" title="Thời tiết hiện tại" 
                                         class="me-3 text-center d-flex align-items-center justify-content-center" 
                                         style="background: #f0f7ff; padding: 4px 8px; border-radius: 8px; border: 1px solid #d0e7ff; min-width: 65px;">
                                        <span style="font-size: 1.1rem; margin-right: 4px;">{{ weatherStore[loc.dia_diem].emoji }}</span>
                                        <span style="font-weight: 800; color: #333; font-size: 0.85rem;">{{ weatherStore[loc.dia_diem].temp }}°</span>
                                    </div>
                                    <div v-if="loc.distance" class="badge rounded-pill bg-light text-dark border" style="font-size: 0.7rem; font-weight: 600; padding: 5px 10px;">
                                        {{ loc.distance.toFixed(1) }} km
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div v-else-if="isLoadingData" class="p-5 text-center text-muted">
                        <i class="fa-solid fa-spinner fa-spin fa-3x mb-3 d-block opacity-25"></i>
                        Đang lấy dữ liệu tour...
                    </div>
                    <div v-else class="p-5 text-center text-muted">
                        <i class="fa-regular fa-map fa-3x mb-3 d-block opacity-25"></i>
                        <p class="mb-1">Chưa có địa danh nào có tọa độ.</p>
                        <small>Vui lòng cập nhật tọa độ tour trong Admin.</small>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- LOCATION SUGGESTION SECTION - REDESIGNED -->
    <div class="location-suggest-section" data-animate="fade-in-up"
         style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 3rem 0; margin-top: 4rem;">
        <div class="container">
            <div class="text-center mb-4">
                <h2 style="color: #fff; font-weight: 800; font-size: 2rem; text-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                    <i class="fa-solid fa-compass me-2" style="animation: spin 4s linear infinite;"></i>
                    Gợi Ý Điểm Đến Gần Bạn
                </h2>
                <p style="color: rgba(255,255,255,0.85); font-size: 1.05rem;">Khám phá những tour du lịch hấp dẫn ngay quanh bạn</p>
            </div>

            <!-- Chưa bật định vị -->
            <div v-if="!currentCity && !isLoadingLocation" class="text-center">
                <button @click="detectLocation" class="btn px-5 py-3 fw-bold"
                    style="background: rgba(255,255,255,0.95); color: #764ba2; border-radius: 50px;
                           font-size: 1.1rem; box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                           transition: all 0.3s ease;"
                    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 35px rgba(0,0,0,0.25)'"
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.15)'">
                    <i class="fa-solid fa-location-crosshairs me-2"></i> Bật định vị ngay
                </button>
            </div>

            <!-- Đang loading -->
            <div v-if="isLoadingLocation" class="text-center">
                <div class="spinner-border text-white" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3" style="color: rgba(255,255,255,0.9); font-size: 1.1rem;">{{ currentLocationStatus }}</p>
            </div>

            <!-- Đã xác định vị trí -->
            <div v-if="currentCity">
                <div class="text-center mb-4">
                    <span style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px);
                                 padding: 8px 24px; border-radius: 50px; color: #fff; font-weight: 600;
                                 display: inline-block; border: 1px solid rgba(255,255,255,0.3);">
                        <i class="fa-solid fa-map-marker-alt me-2"></i>
                        Vị trí: <strong>{{ currentCity }}</strong>
                    </span>
                </div>

                <div v-if="suggestedTours.length > 0" class="row g-4">
                    <div v-for="(tour, index) in suggestedTours" :key="index" class="col-xl-3 col-lg-4 col-md-6">
                        <div style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
                                    border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.5);
                                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer;"
                             onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.1)'">
                            <div class="position-relative">
                                <img :src="tour.anh && tour.anh.length > 0 ? tour.anh[0].url : 'https://placehold.co/400x250/667eea/white?text=Tour'"
                                     style="width: 100%; height: 180px; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; right: 0;
                                            background: linear-gradient(transparent, rgba(0,0,0,0.7));
                                            padding: 20px 12px 8px; color: white;">
                                    <span style="font-size: 0.85rem;"><i class="fa-solid fa-map-pin me-1"></i> {{ tour.dia_diem }}</span>
                                </div>
                            </div>
                            <div style="padding: 14px 16px;">
                                <h6 style="font-weight: 700; color: #333; margin-bottom: 8px; display: -webkit-box;
                                           -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                                           font-size: 0.95rem; line-height: 1.4;">{{ tour.ten_tour }}</h6>
                                <div style="display: flex; align-items: center; justify-content: space-between;">
                                    <span style="color: #e53e3e; font-weight: 800; font-size: 1.1rem;">{{ formatVND(tour.gia_nguoi_lon) }}</span>
                                    <router-link :to="`/chi-tiet-tour/${tour.id}`"
                                        style="background: linear-gradient(135deg, #667eea, #764ba2); color: white;
                                               padding: 6px 16px; border-radius: 20px; font-size: 0.85rem;
                                               text-decoration: none; font-weight: 600; transition: all 0.3s;"
                                        onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                                        Xem →
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center">
                    <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px);
                                padding: 20px 30px; border-radius: 16px; display: inline-block;
                                border: 1px solid rgba(255,255,255,0.3); color: #fff;">
                        <i class="fa-solid fa-info-circle me-2"></i>
                        Hiện chưa có tour nào gần <b>{{ currentCity }}</b>. Hãy thử tìm kiếm điểm đến khác!
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- LÝ DO CHỌN NHTRAVEL -->
    <div class="mt-5"
        style="background-color: #f4f8ff; padding: 4rem 1rem; border-top: 1px solid #0099ff; border-bottom: 1px solid #0099ff;">

        <h2 style="text-align: center; font-size: 1.8rem; font-weight: bold; margin-bottom: 2.5rem; opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;" data-animate="fade-in-up">
            Vì sao bạn nên chọn NHTravel 💙
        </h2>

        <div class="row justify-content-center g-4 mx-auto"
            style="max-width: 1200px; opacity: 0; transform: translateY(30px); transition: all 0.8s ease;"
            data-animate="fade-in-up">

            <div class="col-lg-4 col-md-6">
                <div class="bg-white shadow-sm p-4 text-center h-100"
                    style="border-radius: 1rem; border: 1px solid #eee; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);"
                    onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 15px 30px rgba(0, 0, 0, 0.15)'"
                    onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.07)'">

                    <div class="mx-auto"
                        style="border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); background-color: #28a745;">
                        <img src="../../../assets/images/homecustomer/salary.png" style="width: 40px;" alt="Giá tốt">
                    </div>
                    <h4 style="margin-top: 1rem; font-weight: bold;">Giá tốt nhất cho bạn</h4>
                    <p style="color: #555;">Có nhiều mức giá đa dạng phù hợp với ngân sách và nhu cầu của bạn</p>
                </div>
            </div>

            <div class="col-lg-4 col-md-6">
                <div class="bg-white shadow-sm p-4 text-center h-100"
                    style="border-radius: 1rem; border: 1px solid #eee; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);"
                    onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 15px 30px rgba(0, 0, 0, 0.15)'"
                    onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.07)'">
                    <div class="mx-auto"
                        style="border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); background-color: #007bff;">
                        <img src="../../../assets/images/homecustomer/world-tour.png" style="width: 40px;"
                            alt="Dễ dàng đặt tour">
                    </div>
                    <h4 style="margin-top: 1rem; font-weight: bold;">Booking dễ dàng</h4>
                    <p style="color: #555;">Các bước booking và chăm sóc khách hàng nhanh chóng và thuận tiện</p>
                </div>
            </div>

            <div class="col-lg-4 col-md-6">
                <div class="bg-white shadow-sm p-4 text-center h-100"
                    style="border-radius: 1rem; border: 1px solid #eee; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);"
                    onmouseover="this.style.transform='translateY(-10px) scale(1.02)'; this.style.boxShadow='0 15px 30px rgba(0, 0, 0, 0.15)'"
                    onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.07)'">
                    <div class="mx-auto"
                        style="border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); background-color: #ffc107;">
                        <img src="../../../assets/images/homecustomer/tour-guide.png" style="width: 40px;"
                            alt="Tour tối ưu">
                    </div>
                    <h4 style="margin-top: 1rem; font-weight: bold;">Tour du lịch tối ưu</h4>
                    <p style="color: #555;">Đa dạng các loại hình tour du lịch với nhiều mức giá khác nhau</p>
                </div>
            </div>
        </div>
    </div>

    <!-- BOOKING CÙNG NHTRAVEL -->
    <div style="padding: 4rem 10rem; background-color: #fff; text-align: center; position: relative; overflow: hidden;opacity: 0; transform: translateY(30px); transition: all 0.8s ease;"
        data-animate="fade-in-up">

        <h2> Booking cùng NHTravel</h2>

        <p style="color: #666; font-size: 1rem; margin-bottom: 3rem;">
            Chỉ với 3 bước đơn giản và dễ dàng có ngay trải nghiệm tuyệt vời!
        </p>

        <div style="position: absolute; top: 140px; left: 0; right: 0; z-index: 0;">
            <hr class="mt-5" style="width:100%; height:150px; border-top:4px dashed #007bff; border-radius:50%;">
        </div>

        <div class="container">
            <div class="row" style="position: relative; z-index: 1;">

                <div class="col-lg-4" style="transition: transform 0.3s, box-shadow 0.3s;"
                    onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0, 0, 0, 0.1)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <button class="btn btn-white text-white"
                        style="border-radius: 60%; background-color: deepskyblue; width: 50px; height: 50px; font-size: 1.2rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;"><b>1</b></button>
                    <p><img src="../../../assets/images/homecustomer/step1.png" alt="Tìm nơi muốn đến"
                            style="width: 100px;"></img></p>

                    <h4 style="font-weight: bold;">Tìm nơi muốn đến</h4>
                    <p style="color: #666;">Bất cứ nơi đâu bạn muốn đến, chúng tôi có tất cả những gì bạn cần</p>
                </div>

                <div class="col-lg-4" style="transition: transform 0.3s, box-shadow 0.3s;"
                    onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0, 0, 0, 0.1)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <button class="btn btn-white text-white"
                        style="border-radius: 60%; background-color: deepskyblue; width: 50px; height: 50px; font-size: 1.2rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;"><b>2</b></button>
                    <p><img src="../../../assets/images/homecustomer/step2.png" alt="Đặt vé"
                            style="width: 100px;"></img></p>

                    <h4 style="font-weight: bold;">Đặt vé</h4>
                    <p style="color: #666;">NHTravel sẽ hỗ trợ bạn đặt vé trực tiếp nhanh chóng và thuận tiện</p>
                </div>

                <div class="col-lg-4" style="transition: transform 0.3s, box-shadow 0.3s;"
                    onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0, 0, 0, 0.1)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                    <button class="btn btn-white text-white"
                        style="border-radius: 60%; background-color: deepskyblue; width: 50px; height: 50px; font-size: 1.2rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;"><b>3</b></button>
                    <p><img src="../../../assets/images/homecustomer/step3.png" alt="Thanh toán"
                            style="width: 100px;"></img></p>
                    <h4 style="font-weight: bold;">Thanh toán</h4>
                    <p style="color: #666;">Hoàn thành bước thanh toán và sẵn sàng cho chuyến đi ngay thôi</p>
                </div>
            </div>

        </div>
    </div>

    <div class="container">

        <!-- Điểm đến yêu thích -->
        <div class="row" data-animate="fade-in-up"
            style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
            <!-- Tiêu đề -->
            <div class="text-center mb-3">
                <h2 style="font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif; letter-spacing: 1px;"
                    class="text-primary"><b>Điểm đến yêu thích</b></h2>
                <span class="text-secondary">Tour du lịch Trong nước với NHTravel. Hành hương đầu xuân - Tận hưởng bản
                    sắc
                    Việt.</span>
            </div>
        </div>

        <!-- Ảnh + Pagination -->
        <div class="row" data-animate="fade-in-up"
            style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
            <template v-for="(value, index) in paginatedTours" :key="index">
                <div class="col-lg-3 mb-4">
                    <div class="position-relative">
                        <div class="card h-100 shadow-sm"
                            style="width: 20rem; height: 30rem; border-radius: 12px; border: none; overflow: hidden; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);"
                            onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0, 0, 0, 0.15)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 2px rgba(0,0,0,0.07)'">
                            <div class="position-relative">
                                <img :src="value.url" class="card-img-top"
                                    style="height: 250px; width: 100%; object-fit: cover; border-radius: 12px 12px 0 0;">
                                <div class="position-absolute bottom-0 start-0">
                                    <button class="btn text-white py-1 px-2"
                                        style="background-color: rgba(0, 0, 0, 0.6); border-radius: 0 10px 0 12px; font-size: 0.9rem;">
                                        <i class="fa-solid fa-map-marker-alt me-1"></i>
                                        {{ value.dia_diem }}
                                    </button>
                                </div>
                            </div>

                            <div class="card-body d-flex flex-column justify-content-between text-start"
                                style="height: 230px;">
                                <div>
                                    <h5 class="card-title truncate-2-lines fw-bold"
                                        style="max-width: 100%; color: #333;">{{
                                            value.ten_tour }}</h5>

                                    <div class="text-secondary mt-2" style="font-size: 0.9rem;">
                                        <i class="fa-solid fa-clock me-2 text-primary"></i>
                                        <span>
                                            {{ formatDate(value.ngay_di) }} → {{ formatDate(value.ngay_ve) }}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div class="d-flex align-items-baseline">
                                        <span class="text-secondary me-1" style="font-size: 13px;">Người lớn:</span>
                                        <h4 class="mb-0 fw-bold" style="color: #ff9800; font-size: 1.5rem;">
                                            {{ formatVND(value.gia_nguoi_lon) }}
                                        </h4>
                                    </div>

                                    <div class="d-flex align-items-baseline text-secondary mt-1 mb-2">
                                        <span class="me-1" style="font-size: 12px;">Trẻ em:</span>
                                        <span class="fw-semibold" style="font-size: 14px;">
                                            {{ formatVND(value.gia_tre_em) }}
                                        </span>
                                    </div>

                                    <div class="d-flex justify-content-between"
                                        style="align-items: center; border-top: 1px solid #eee; padding-top: 10px;">
                                        <router-link :to="`/chi-tiet-tour/${value.id}`">
                                            <span class="text-primary fw-bold" style="transition: color 0.3s;"
                                                onmouseover="this.style.color='#0077cc'"
                                                onmouseout="this.style.color='#0099ff'"><u>Xem chi
                                                    tiết</u></span>
                                        </router-link>
                                        <router-link :to="`/dat-tour/${value.id}`">
                                            <button class="btn text-white fw-bold"
                                                style="background-color: #ff5722; transition: background-color 0.3s;"
                                                onmouseover="this.style.backgroundColor='#e64a19'"
                                                onmouseout="this.style.backgroundColor='#ff5722'">
                                                <i class="fa-brands fa-opencart me-2"></i>Đặt tour
                                            </button>
                                        </router-link>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="position-absolute top-0 start-0">
                            <button class="btn btn-danger text-white py-1 px-3"
                                style="border-radius: 12px 0 12px 0; font-size: 0.9rem;"><b>DEAL
                                    Giá sốc!</b></button>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- PAGINATION -->
        <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-2 mb-4" data-animate="fade-in-up"
             style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease; gap: 8px;">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="btn rounded-circle d-flex align-items-center justify-content-center"
                :style="{ width: '42px', height: '42px', border: '2px solid ' + (currentPage === 1 ? '#ddd' : '#0099ff'),
                          color: currentPage === 1 ? '#ccc' : '#0099ff', background: 'white',
                          transition: 'all 0.3s', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                class="btn rounded-circle d-flex align-items-center justify-content-center"
                :style="{ width: '42px', height: '42px', fontWeight: '700', fontSize: '0.95rem',
                          border: page === currentPage ? 'none' : '2px solid #e0e0e0',
                          background: page === currentPage ? 'linear-gradient(135deg, #0099ff, #0077cc)' : 'white',
                          color: page === currentPage ? 'white' : '#666',
                          boxShadow: page === currentPage ? '0 4px 12px rgba(0, 153, 255, 0.35)' : 'none',
                          transition: 'all 0.3s' }">
                {{ page }}
            </button>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="btn rounded-circle d-flex align-items-center justify-content-center"
                :style="{ width: '42px', height: '42px', border: '2px solid ' + (currentPage === totalPages ? '#ddd' : '#0099ff'),
                          color: currentPage === totalPages ? '#ccc' : '#0099ff', background: 'white',
                          transition: 'all 0.3s', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>

        <!-- TRẢI NGHIỆM SẮC XUÂN VIỆT NAM -->
        <div class="position-relative text-center mt-5" data-animate="fade-in-up"
            style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
            <img src="../../../assets/images/homecustomer/nui.jpg" style="width: 1290px; height: 400px;">
            <div class="position-absolute top-50 translate-middle" style="margin-left: 32rem;">
                <div class="row">
                    <div class="col-lg-7 text-start" style="margin-top: 8rem;">
                        <h5 class="me-5" style="color: #0099ff;"><b>TRẢI NGHIỆM SẮC XUÂN VIỆT NAM</b></h5>
                        <hr class="text-white">
                        <div>
                            <h2 class="text-white me-5 "><b>LỄ HỘI HOA 3 MIỀN</b></h2>
                        </div>
                        <span class="text-white">
                            Hòa mình vào sắc xuân rực rỡ khắp ba miền Việt Nam: ngắm hoa đào miền Bắc, hoa giấy và nét
                            cổ
                            kính miền Trung, mai vàng rực rỡ miền Nam, cùng trải nghiệm văn hóa – ẩm thực – lễ hội đặc
                            sắc
                            trên mọi nẻo đường.
                        </span>
                    </div>
                    <div class="col-lg-5" style="margin-top: 10rem;">
                        <video autoplay loop muted playsinline preload="auto"
                            poster="../../../assets/images/homecustomer/Poster.png"
                            style="width: 600px; height: 300px; object-fit: contain;">
                            <source src="../../../assets/images/homecustomer/flower.mp4" type="video/mp4">
                            Trình duyệt của bạn không hỗ trợ video.
                        </video>

                    </div>
                </div>
            </div>
        </div>

        <!-- BÀI VIẾT -->
        <h2 data-animate="fade-in-up"
            style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease; margin-top: 5rem;"
            class="text-center fw-bold mb-5 text-primary">Cẩm nang Du lịch</h2>

        <div class="row" data-animate="fade-in-up"
            style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
            <template v-for="(value, index) in listBaiViet" :key="index">
                <div class="col-lg-4 mb-5">
                    <router-link :to="`/chi-tiet-bai-viet/${value.id}`" style="text-decoration: none; color: inherit;">
                        <div class="card h-100 shadow-sm" style="
                                border: none; 
                                border-radius: 12px; 
                                overflow: hidden; 
                                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                            "
                            onmouseover="this.style.boxShadow='0 15px 30px rgba(0, 0, 0, 0.15)'; this.style.transform='translateY(-5px)'"
                            onmouseout="this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.1)'; this.style.transform='translateY(0)'">

                            <img :src="value.hinh_anh" class="card-img-top" style="height: 250px; object-fit: cover;">

                            <div class="card-body">
                                <h5 class="card-title text-truncate fw-bold" style="color: #333;">
                                    {{ value.tieu_de }}
                                </h5>
                                <p class="card-text text-secondary mb-3" style="font-size: 0.95rem;">
                                    {{ value.mo_ta_ngan }}
                                </p>
                                <span class="text-primary fw-bold" style="font-size: 0.9rem;">
                                    Đọc thêm →
                                </span>
                            </div>

                        </div>
                    </router-link>
                </div>
            </template>
        </div>
    </div>


    <!-- Khách hàng đánh giá  -->
    <div class="row bg-white text-center" data-animate="fade-in-up"
        style="opacity: 0; transform: translateY(30px); transition: all 0.8s ease;">
        <h2 class="mt-4" style="font-family: 'Arial Black', Impact, sans-serif;">Khách hàng đánh giá</h2>
        <p class="mt-2 mb-3">Mục tiêu hàng đầu của chúng tôi là sự hài lòng của khách hàng</p>

        <!-- Đánh giá của người dùng -->
        <div class="position-relative">
            <!-- Ảnh -->
            <img src="../../../assets/images/homecustomer/danhgia.jpg">

            <!-- Đánh giá -->
            <div class="position-absolute top-0 start-50 translate-middle-x">

                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-inner">

                        <div v-for="(value, index) in danhGiaList" :key="index" class="carousel-item"
                            :class="{ active: index === 0 }">

                            <div class="text-center p-4">
                                <p style="font-size: 1.1rem; font-style: italic;">"{{ value.binh_luan }}"</p>
                                <p style="margin-top: 1rem; font-weight: bold;">⭐ {{ value.diem }}/5</p>
                            </div>

                        </div>

                    </div>

                    <!-- Nút điều hướng -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" style="background-color: #555;"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" style="background-color: #555;"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import * as bootstrap from "bootstrap";

export default {
    data() {
        return {
            listTour: [],
            currentPage: 1,
            toursPerPage: 4,
            danhGiaList: [
                { id: 1, id_tour: 1, diem: 5, binh_luan: "Chuyến đi Nha Trang thật sự tuyệt vời. Hướng dẫn viên rất nhiệt tình, vui vẻ và luôn tạo không khí thoải mái cho đoàn. Các điểm tham quan được sắp xếp hợp lý, giúp mọi người vừa được trải nghiệm biển đảo, vừa có thời gian nghỉ ngơi chụp ảnh." },
                { id: 2, id_tour: 1, diem: 4, binh_luan: "Lịch trình được bố trí khá hợp lý, đi từ sáng đến chiều nhưng không quá mệt. Tôi thích nhất là được tham gia các hoạt động trải nghiệm như lặn ngắm san hô và đi thuyền." },
                { id: 3, id_tour: 2, diem: 3, binh_luan: "Chuyến đi Đà Nẵng mang lại nhiều kỷ niệm, các địa điểm nổi tiếng như Bà Nà Hills hay Ngũ Hành Sơn rất đẹp. Tuy nhiên do thời tiết nắng gắt nên việc di chuyển hơi vất vả. Nếu công ty chuẩn bị thêm nước uống hoặc khăn lạnh cho đoàn thì sẽ tuyệt vời hơn." },
                { id: 4, id_tour: 3, diem: 5, binh_luan: "Phú Quốc đúng là thiên đường biển. Nước biển trong xanh, bãi cát mịn và không khí trong lành. Tôi rất ấn tượng với chuyến đi cáp treo Hòn Thơm, cảm giác ngắm toàn cảnh từ trên cao thực sự khó quên." },
                { id: 5, id_tour: 2, diem: 4, binh_luan: "Tour giá cả hợp lý so với chất lượng dịch vụ. Nhân viên tư vấn từ lúc đăng ký đến khi đi đều rất tận tình. Tôi ấn tượng nhất là được ghé thăm các làng nghề truyền thống và thưởng thức ẩm thực địa phương." }
            ],
            listDiaDiem: [
                { id: 1, dia_diem: "Hà Nội", hinh_anh: "https://vietmytravel.com/wp-content/uploads/2019/04/vietmytravel_du-l%E1%BB%8Bch-h%C3%A0-n%E1%BB%99i.jpg" },
                { id: 2, dia_diem: "Ninh Bình", hinh_anh: "https://i.pinimg.com/1200x/e0/12/65/e01265f9116c51d9f2a0bddc628f5510.jpg" },
                { id: 3, dia_diem: "Đà Nẵng", hinh_anh: "https://i.pinimg.com/1200x/b1/b6/2e/b1b62ebf11a34189ae0ee007550a30e2.jpg" },
                { id: 4, dia_diem: "Cần Thơ", hinh_anh: "https://cdn.nhandan.vn/images/d233c8299c7755bbf317d96e7a85fcf76f122b8bec1cf47c6fed69884ee6e90197a1a52235ea7b286c8b22ded92e7550648fb2c5e9c154b96547b2ea607cb2cf/can_tho_1-1629939987931.jpg" }
            ],
            listBaiViet: [],
            diaDiem: "",
            ngayDi: "",
            nganSach: "",
            searchText: "",
            errors: {
                diaDiem: "",
            },
            // Location Suggestion Data
            currentCity: null,
            suggestedTours: [],
            isLoadingLocation: false,
            currentLocationStatus: "",
            map: null,
            userMarker: null,
            userLat: null,
            userLon: null,
            weatherStore: {},
            isLoadingData: true,
        }
    },
    computed: {
        uniqueLocations() {
            if (!this.listTour || this.listTour.length === 0) return [];
            
            const locs = [];
            const seen = new Set();
            
            this.listTour.forEach(tour => {
                if (tour.latitude && tour.longitude && !seen.has(tour.dia_diem)) {
                    seen.add(tour.dia_diem);
                    let dist = null;
                    if (this.userLat && this.userLon) {
                        dist = this.getDistance(this.userLat, this.userLon, tour.latitude, tour.longitude);
                    }
                    locs.push({
                        dia_diem: tour.dia_diem,
                        latitude: tour.latitude,
                        longitude: tour.longitude,
                        distance: dist,
                        description: tour.mo_ta_ngan || "Khám phá địa điểm du lịch tuyệt vời này cùng NHTravel."
                    });
                }
            });

            if (this.userLat && this.userLon) {
                return locs.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
            }
            return locs;
        },
        totalPages() {
            return Math.ceil(this.listTour.length / this.toursPerPage);
        },
        paginatedTours() {
            const start = (this.currentPage - 1) * this.toursPerPage;
            return this.listTour.slice(start, start + this.toursPerPage);
        }
    },
    watch: {
        uniqueLocations: {
            handler(newVal) {
                if (newVal && newVal.length > 0) {
                    this.fetchWeatherForSidebar();
                }
            },
            immediate: false
        }
    },
    mounted() {
        this.loadData();
        this.getDanhGia();

        // Delay animation setup để chắc chắn DOM đã render
        setTimeout(() => {
            this.initFadeInAnimation();
        }, 500); // có thể chỉnh về 300 nếu thấy mượt
    },
    methods: {
        initFadeInAnimation() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target); // Chỉ trigger 1 lần
                    }
                });
            }, { threshold: 0.1 });

            const targets = document.querySelectorAll('[data-animate="fade-in-up"]');
            targets.forEach(el => observer.observe(el));
        },
        // Pagination methods
        goToPage(page) {
            this.currentPage = page;
            this.$nextTick(() => this.initFadeInAnimation());
        },
        prevPage() {
            if (this.currentPage > 1) this.goToPage(this.currentPage - 1);
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.goToPage(this.currentPage + 1);
        },
        nextSlide() {
            const carouselEl = document.getElementById('carouselVideo');
            if (carouselEl) {
                const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
                bsCarousel.next();
            }
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,);
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VI');
        },
        loadData() {
            axios.get('/home-page')
                .then((res) => {
                    this.listTour = res.data.data_tour.map(tour => {
                        return {
                            ...tour,
                            url: (tour.anh && tour.anh.length > 0) ? tour.anh[0].url : 'default.jpg'
                        }
                    });
                    this.listBaiViet = res.data.data_bv;
                    
                    // Fetch weather info for sidebar
                    this.fetchWeatherForSidebar();

                    // Render interactive map with weather
                    this.$nextTick(() => {
                        if (typeof window.L !== 'undefined') {
                            this.initMap();
                        }
                    });
                })
                .finally(() => {
                    this.isLoadingData = false;
                });
        },
        submitSearch() {
            this.errors.diaDiem = ""; // reset lỗi

            if (!this.searchText.trim()) {
                this.errors.diaDiem = "Vui lòng nhập điểm đến!";
                return;
            }

            const query = {
                location: this.searchText.trim(),
            };

            if (this.ngayDi) query.startDate = this.ngayDi;
            if (this.nganSach === "1") query.maxPrice = 5000000;
            else if (this.nganSach === "2") query.maxPrice = 10000000;
            else if (this.nganSach === "3") query.maxPrice = 50000000;

            this.$router.push({ path: "/tour-all", query });
        },
        getDanhGia() {
            axios.get("/danh-gia")
                .then(res => {
                    this.danhGiaList = res.data.map(item => {
                        return {
                            diem: item.diem,
                            binh_luan: item.binh_luan,
                            avatar: item.nguoi_dung?.avatar ?? "https://i.pinimg.com/736x/57/7c/c8/577cc844392618013ce82797abd4169e.jpg"
                        }
                    });
                });

        },
        detectLocation() {
            if (!navigator.geolocation) {
                alert("Trình duyệt không hỗ trợ định vị!");
                return;
            }
            this.isLoadingLocation = true;
            this.currentLocationStatus = "Đang xác định tọa độ...";

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    this.userLat = lat;
                    this.userLon = lon;
                    
                    // Update Map with User Location
                    if (this.map) {
                        const userPos = [lat, lon];
                        if (this.userMarker) {
                            this.userMarker.setLatLng(userPos);
                        } else {
                            const userIcon = window.L.divIcon({
                                className: '',
                                html: "<div style='background-color:#007bff; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,123,255,0.8); animation: pulse 2s infinite;'></div>",
                                iconSize: [24, 24],
                                iconAnchor: [12, 12]
                            });
                            this.userMarker = window.L.marker(userPos, { icon: userIcon }).addTo(this.map)
                                .bindPopup("<b>Vị trí của bạn</b>").openPopup();
                        }
                        this.map.flyTo(userPos, 10);
                    }

                    this.fetchCityName(lat, lon);
                },
                (error) => {
                    this.isLoadingLocation = false;
                    alert("Không thể lấy vị trí: " + error.message);
                }
            );
        },
        fetchCityName(lat, lon) {
            this.currentLocationStatus = "Đang tìm tên thành phố...";
            // Sử dụng Nominatim OpenStreetMap (Free)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
            
            axios.get(url)
                .then(res => {
                    const address = res.data.address;
                    let city = address.city || address.province || address.state || address.town;
                    if (city) {
                        city = city.replace(/Thành phố /i, "").replace(/Tỉnh /i, "").trim();
                        this.currentCity = city;
                        this.fetchSuggestedTours(city);
                    } else {
                        this.isLoadingLocation = false;
                        alert("Không xác định được tên thành phố!");
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.isLoadingLocation = false;
                    this.currentLocationStatus = "Lỗi khi lấy tên địa điểm.";
                });
        },
        fetchSuggestedTours(city) {
            this.currentLocationStatus = `Đang tìm tour gần ${city}...`;
            axios.get('/tour-suggest', {
                params: { location: city }
            })
            .then(res => {
                this.suggestedTours = res.data.map(tour => ({
                     ...tour,
                     url: (tour.anh && tour.anh.length > 0) ? tour.anh[0].url : 'https://via.placeholder.com/300'
                }));
            })
            .finally(() => {
                this.isLoadingLocation = false; 
            });
        },
        getDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
            return R * 2 * Math.asin(Math.sqrt(a));
        },
        focusLocation(loc) {
            if (!this.map) return;
            this.map.flyTo([loc.latitude, loc.longitude], 12);
            // Search for marker and open popup logic could be added here if needed
        },
        fetchWeatherForSidebar() {
            this.uniqueLocations.forEach(loc => {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true`;
                axios.get(url).then(res => {
                    const weather = res.data.current_weather;
                    let emoji = "☀️";
                    if(weather.weathercode >= 1 && weather.weathercode <= 3) emoji = "⛅";
                    if(weather.weathercode >= 51 && weather.weathercode <= 67) emoji = "🌧️";
                    if(weather.weathercode >= 71) emoji = "❄️";
                    if(weather.weathercode >= 80) emoji = "🌩️";

                    this.weatherStore = {
                        ...this.weatherStore,
                        [loc.dia_diem]: {
                            temp: weather.temperature,
                            emoji: emoji
                        }
                    };
                }).catch(err => console.log("Weather error for", loc.dia_diem, err));
            });
        },
        initMap() {
            if (!this.listTour || this.listTour.length === 0) return;
            
            if (this.map) {
                this.map.remove();
            }

            this.map = window.L.map('tourMap', {
                maxBounds: [
                    [8.18, 102.14], // Southwest Vietnam
                    [23.39, 109.46]  // Northeast Vietnam
                ],
                maxBoundsViscosity: 1.0,
                minZoom: 5
            }).setView([16.16667, 107.83333], 5);

            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map);

            const customIcon = window.L.divIcon({
                className: '',
                html: "<div style='background-color:#ff5722; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5);'></div>",
                iconSize: [22, 22],
                iconAnchor: [11, 11]
            });

            const mapTours = {};
            this.listTour.forEach(tour => {
                if (tour.latitude && tour.longitude) {
                    const key = `${tour.latitude},${tour.longitude}`;
                    if (!mapTours[key]) {
                        mapTours[key] = { lat: tour.latitude, lng: tour.longitude, dia_diem: tour.dia_diem, tours: [] };
                    }
                    mapTours[key].tours.push(tour);
                }
            });

            for (const key in mapTours) {
                const loc = mapTours[key];
                const marker = window.L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(this.map);
                
                marker.on('click', () => {
                    this.fetchWeatherAndShowPopup(marker, loc);
                });
            }
        },
        fetchWeatherAndShowPopup(marker, locInfo) {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${locInfo.lat}&longitude=${locInfo.lng}&current_weather=true`;
            
            axios.get(url).then(res => {
                const weather = res.data.current_weather;
                let condition = "Quang đãng";
                let emoji = "☀️";
                if(weather.weathercode >= 1 && weather.weathercode <= 3) { condition = "Có mây"; emoji = "⛅"; }
                if(weather.weathercode >= 51 && weather.weathercode <= 67) { condition = "Mưa vài nơi"; emoji = "🌧️"; }
                if(weather.weathercode >= 71) { condition = "Mưa tuyết / Xấu"; emoji = "❄️"; }
                if(weather.weathercode >= 80) { condition = "Mưa rào"; emoji = "🌩️"; }

                let popupContent = `
                    <div style="min-width: 220px; font-family: Arial, sans-serif;">
                        <h6 style="color: #ff5722; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #eee; padding-bottom: 5px;">
                            📍 ${locInfo.dia_diem}
                        </h6>
                        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
                            <div>
                                <div style="font-size: 1.4rem; font-weight: bold; color: #333;">${weather.temperature}°C</div>
                                <div style="font-size: 0.8rem; color: #666;">${condition}</div>
                            </div>
                            <div style="font-size: 2rem;">${emoji}</div>
                        </div>
                        <p style="font-size: 0.85rem; font-weight: bold; margin-bottom: 5px;">Có ${locInfo.tours.length} tours tại đây:</p>
                        <ul style="padding-left: 15px; margin-bottom: 0; font-size: 0.85rem;">
                `;
                
                const displayTours = locInfo.tours.slice(0, 3);
                displayTours.forEach(t => {
                    popupContent += `<li><a href="/chi-tiet-tour/${t.id}" style="color: #007bff; text-decoration: none; font-weight:bold;">${t.ten_tour}</a></li>`;
                });
                if(locInfo.tours.length > 3) {
                    popupContent += `<li><i style="color: #999;">...và ${locInfo.tours.length - 3} tour khác.</i></li>`;
                }
                
                popupContent += `</ul></div>`;
                
                marker.bindPopup(popupContent, { minWidth: 250 }).openPopup();
            }).catch(err => {
                marker.bindPopup(`<b>${locInfo.dia_diem}</b><br>Đang có ${locInfo.tours.length} tour.`).openPopup();
            });
        }
    }
}
</script>
<style>
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
@keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
}
.location-item:hover {
    background-color: #f0f7ff !important;
}
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #006ce4;
}
</style>
