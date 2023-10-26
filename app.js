//Fetching Data
// const API_KEY = "8f0e4b62-8d88-4f97-8961-9f484c5fd193";

let selectedGeneres = "action";
let currentPage = 1;
let searchValue = "";

const fetchData = async () => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const slider = document.querySelector(".swiper-wrapper");
        result.data.forEach((child) => {
          slider.innerHTML += `<a  class="swiper-slide slide1">${child.name}</a>`;
        });

        var swiper = new Swiper(".mySwiper", {
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },

          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });

        console.log(result);
      })
      .then(() => {
        const categoryList = document.getElementsByClassName("swiper-slide");
        console.log(categoryList);

        for (let i = 0; i < categoryList.length; i++) {
          categoryList[i].addEventListener("click", () => {
            console.log(categoryList[i].innerHTML);
            selectedGeneres = categoryList[i].innerHTML;
            currentPage = 1;
            searchValue = "";
            fetchGames(currentPage, searchValue, selectedGeneres);
            document.getElementById("searchForm").value = searchValue;
          });
        }
      });
  } catch (err) {
    console.log(err, "error");
  }
};

fetchData();

const fetchGames = async (page, query = "", genres) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=20&page=${page}&q=${query}&genres=${genres}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const specialOffer = document.querySelector(".specialoffer");
      specialOffer.innerHTML = "";

      result.data.map((child) => {
        specialOffer.innerHTML += `<div class="key" style="background-image: url(${child.header_image})"><div class="keyname" style="background: linear-gradient( -45deg, rgba(64, 121, 153, 1) 5%, rgba(42, 62, 89, 1) 95% );">${child.name}</div></div>`;
      });

      console.log(result);
    })
    .catch((error) => console.log("error", error));
};
fetchGames(currentPage, searchValue, selectedGeneres);

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

nextButton.addEventListener("click", () => {
  currentPage++;
  fetchGames(currentPage, searchValue, selectedGeneres);
});

prevButton.addEventListener("click", () => {
  if (currentPage == 1) {
    fetchGames(currentPage, searchValue, selectedGeneres);
  } else {
    currentPage--;
    fetchGames(currentPage, searchValue, selectedGeneres);
  }
});

const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("input", (e) => {
  console.log(e.target.value);
  // fetchGames(currentPage, e.target.value);
});

const searchbutton = document.querySelector(".search-button");
searchbutton.addEventListener("click", () => {
  console.log(searchForm.value);
  searchValue = searchForm.value;
  fetchGames(currentPage, searchValue, selectedGeneres);
});

// when click new category, remove text button value, reset,

// find html removign function

// click next page and still save search value
// nextButton.searchform.value??

//
