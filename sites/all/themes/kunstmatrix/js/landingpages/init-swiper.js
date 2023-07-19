const isMobilePortrait =
    (window.innerWidth || document.documentElement.clientWidth) < 768;

const spaceCardsSwiper1 = new Swiper(".swiper.space-cards-swiper-1", {
    slidesPerView: isMobilePortrait ? 1 : 2,
    spaceBetween: isMobilePortrait ? 0 : 20,
    pagination: {
        el: ".swiper-pagination.space-cards-swiper-1",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next.space-cards-swiper-1",
        prevEl: ".swiper-button-prev.space-cards-swiper-1",
    },
});

const spaceCardsSwiper2 = new Swiper(".swiper.space-cards-swiper-2", {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination.space-cards-swiper-2",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next.space-cards-swiper-2",
        prevEl: ".swiper-button-prev.space-cards-swiper-2",
    },
});

let exhibsCt = 0;
const exhibWrapper = document.getElementById("exhib_swiper_1");
if (exhibWrapper) {
    // console.log(exhibWrapper.getElementsByClassName("node-exhibition"));
    exhibsCt = exhibWrapper.getElementsByClassName("node-exhibition").length;
    console.log("exhibsCt", exhibsCt);
    if (exhibsCt < 4) {
        exhibWrapper.classList.add("centered");
    }
}

const exhibCardsSwiper = new Swiper(".swiper.exhib-swiper-1", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination.exhib-swiper-1",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next.exhib-swiper-1",
        prevEl: ".swiper-button-prev.exhib-swiper-1",
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: exhibsCt > 2 ? 3 : exhibsCt,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: exhibsCt > 4 ? 5 : exhibsCt,
            spaceBetween: 20,
        },
    },
});

const pricingCardsSwiper = new Swiper(".swiper.pricing-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination.pricing-swiper",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next.pricing-swiper",
        prevEl: ".swiper-button-prev.pricing-swiper",
    },
    // breakpoints: {
    //   480: {
    //     slidesPerView: 2,
    //     spaceBetween: 20,
    //   },
    //   720: {
    //     slidesPerView: 3,
    //     spaceBetween: 20,
    //   },
    //   1024: {
    //     slidesPerView: 4,
    //     spaceBetween: 20,
    //   },
    //   1280: {
    //     slidesPerView: 5,
    //     spaceBetween: 20,
    //   },
    // },
    variableWidth: false,
});