// header 요소
const header = document.getElementById("header");

// 상태 변수
let lastScroll = 0;
let isMenuScrolling = false; 
// let ignoreScroll = false;  <-- 제거

// header 숨김 기준 스크롤
const scrollThreshold = 150;

// ---------------------------
// 메뉴 클릭 → smooth scroll + header 숨김
// ---------------------------
document.querySelectorAll(".menu a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if(target) {
      // 메뉴 이동 상태 활성화
      isMenuScrolling = true;

      // 부드러운 스크롤
      target.scrollIntoView({ behavior: "smooth" });

      // header 숨기기
      header.classList.add("header-hide");

      // 스크롤 애니메이션 끝난 후 처리
      setTimeout(() => {
        header.classList.remove("header-hide"); // 헤더 내려오기
      }, 800);

      setTimeout(() => {
        isMenuScrolling = false;
        lastScroll = window.pageYOffset;
      }, 1000);

      
    }
  });
});

// ---------------------------
// 스크롤 시 header hide / show
// ---------------------------
window.addEventListener("scroll", () => {

  // ---------------------------
  // 수정: ignoreScroll 제거, 메뉴 이동 중이면 무시
  // ---------------------------
  if (isMenuScrolling) return;

  let currentScroll = window.pageYOffset;

  // 아래로 스크롤
  if(currentScroll > lastScroll && currentScroll > scrollThreshold){
    header.classList.add("header-hide");
  }
  // 위로 스크롤
  else if(currentScroll < lastScroll){
    header.classList.remove("header-hide");
  }

  lastScroll = currentScroll;
});
