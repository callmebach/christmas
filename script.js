document.addEventListener("DOMContentLoaded", function () {
    const snowContainer = document.querySelector(".snow-container");

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
                snowflake.remove(); // Remove when it goes off the bottom edge
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

        // Mảng chứa các nội dung pop-up
    const popupContents = [
        "1 thỏi son 🎄🎁",
        "Quay video nói yêu anh :3❤️✨",
        "Đu 1 trend tiktok 🎅🎉",
        "Anh yêu emm 🎁❤️",
        "Gấu bông 🌟🎄",
        "Let me see >_< ❤️❤️❤️"
    ];

    // Lấy các phần tử cần thiết
    const popUp = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const giftIcons = document.querySelectorAll(".gif");
    const popupText = popUp.querySelector("p");

    // Hiển thị pop-up với nội dung ngẫu nhiên khi bấm vào icon hộp quà
    giftIcons.forEach((gift) => {
        gift.addEventListener("click", () => {
            if (popupContents.length > 0) {
                const randomIndex = Math.floor(Math.random() * popupContents.length); // Chọn ngẫu nhiên chỉ số
                popupText.textContent = popupContents[randomIndex]; // Cập nhật nội dung pop-up
                popupContents.splice(randomIndex, 1); // Xóa nội dung đã chọn khỏi mảng
                popUp.style.display = "flex";
            } else {
                popupText.textContent = "Em bé đã chọn hết quá rồii :(("; // Thông báo khi hết nội dung
                popUp.style.display = "flex";
            }
        });
    });

    // Ẩn pop-up khi bấm vào dấu "X"
    closePopup.addEventListener("click", () => {
        popUp.style.display = "none";
    });

    // Ẩn pop-up khi click ra ngoài vùng nội dung
    window.addEventListener("click", (event) => {
        if (event.target === popUp) {
            popUp.style.display = "none";
        }
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    
});
