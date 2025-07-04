

function showWarning() {
    let warning = document.getElementById("warningMessage");

    // Kiểm tra nếu thông báo đang hiển thị, reset lại thời gian
    if (warning.style.display === "block") {
        clearTimeout(warningTimeout); // Xóa timeout trước đó
    } else {
        warning.style.display = "block";
    }

    // Đặt lại timeout để ẩn sau 3 giây
    warningTimeout = setTimeout(() => {
        warning.style.display = "none";
    }, 3000);
}

// Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key)) ||
        (event.ctrlKey && event.key === "U")
    ) {
        event.preventDefault();
        showWarning();
    }
});

// Chặn chuột phải
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    showWarning();
});


    



           // Cập nhật năm thực tế
           document.getElementById('current-year').textContent = new Date().getFullYear();

           // Cập nhật thời gian thực
           function updateTime() {
               const now = new Date();
               const formattedTime = now.toLocaleString('vi-VN', { 
                   weekday: 'long', 
                   year: 'numeric', 
                   month: 'long', 
                   day: 'numeric', 
                   hour: '2-digit', 
                   minute: '2-digit', 
                   second: '2-digit' 
               });
               document.getElementById('real-time').innerText = formattedTime;
           }
           
           setInterval(updateTime, 1000);
           updateTime(); 
           
           
    setInterval(updateTime, 1000);
    updateTime();
    document.addEventListener("DOMContentLoaded", function() {
        const loadingOverlay = document.querySelector(".loading-overlay");

        document.body.addEventListener("click", function(event) {
            let target = event.target.closest("button, a"); // Lấy phần tử <button> hoặc <a> gần nhất

            if (target) {
                event.preventDefault(); // Ngăn chặn hành động mặc định

                // Hiển thị hiệu ứng loading
                loadingOverlay.style.display = "flex";

                // Giữ hiệu ứng loading trong 3 giây rồi mới thực hiện hành động
                setTimeout(() => {
                    loadingOverlay.style.display = "none";

                    // Nếu là liên kết thì chuyển hướng SAU KHI LOADING XONG
                    if (target.tagName === "A" && target.href) {
                        window.location.href = target.href;
                    }
                }, 3000); // Hiệu ứng chạy trong 3 giây
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
        const backToTopBtn = document.getElementById("backToTop");
    
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
    
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    function onCaptchaSuccess() {
        document.getElementById('loading').style.display = 'block';
  
        // Giả lập quá trình xử lý sau xác minh (1.5s)
        setTimeout(() => {
          document.getElementById('overlay').style.display = 'none';
          document.getElementById('main-content').style.display = 'block';
        }, 3000);
      }
      grecaptcha.ready(function () {
        grecaptcha.execute('6Le1rRYrAAAAAKt07uCfmbqyogPZGvZlUtomhKCX', { action: 'homepage' })
          .then(function (token) {
            // Có thể xử lý token nếu cần
            console.log("Token reCAPTCHA:", token);
          });
      });

      
