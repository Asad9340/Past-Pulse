let count = 1;
const spinner = document.getElementById('spinner');
const spinner2 = document.getElementById('spinner2');
const parentDiv = document.getElementById('parentDiv');

const allPostAPI = async () => {
  spinner.classList.remove('hidden');
  parentDiv.classList.add('hidden');
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  setTimeout(() => {
    displayAllPost(data.posts);
  }, 2000);
};

const displayAllPost = posts => {
  const allNewsContainer = document.getElementById('allNewsContainer');
  allNewsContainer.innerHTML = '';
  posts.forEach(post => {
    let isActive = '';
    if (post.isActive) {
      isActive = `<i class="fa-solid fa-circle absolute top-0 right-4 text-xs text-green-700"></i>`;
    } else {
      isActive = `<i class="fa-solid fa-circle absolute top-0 right-4 text-xs text-red-700"></i>`;
    }
    spinner.classList.add('hidden');
    parentDiv.classList.remove('hidden');
    const div = document.createElement('div');
    div.innerHTML = `
                  <div
                class="bg-[#F3F3F5] hover:bg-[#7D79FC1A] border border-white hover:border hover:border-[#797DFC] duration-500 grid grid-cols-1 md:grid-cols-12 px-2 rounded-lg md:rounded-2xl"
              >
                <div class="col-span-2 flex items-center justify-center mt-3 md:mt-0">
                <div class="inline-block relative ">
                  <img class="rounded-full w-24" src="${post.image}" alt="" />
                  ${isActive}
                </div>
                </div>
                <div class="col-span-10 p-4  space-y-5">
                  <div
                    class="flex gap-6 text-[14px] text-[#12132DCC] font-medium"
                  >
                    <p>#<span>${post.category}</span></p>
                    <p>Author: <span>${post.author.name}</span></p>
                  </div>
                  <div>
                    <h2 class="text-base text-[#12132D] font-bold">
                      ${post.title}
                    </h2>
                    <p class="text-sm text-[#12132D99]">${
                      post.description
                    }</p>
                  </div>
                  <hr class="text-black" />
                  <div
                    class="flex gap-4 justify-between text-[16px] text-[#12132D99]"
                  >
                    <div class="flex gap-2 md:gap-4 lg:gap-6 justify-between">
                      <div class="flex gap-2 items-center text-sm lg:text-base">
                      <i class="fa-regular fa-comment"></i>
                      <p>${post.comment_count}</p>
                      </div>
                      <div class="flex gap-2 items-center text-sm lg:text-base">
                      <i class="fa-solid fa-eye"></i>
                      <p>${post.view_count}</p>
                      </div>
                      <div class="flex gap-2 items-center text-sm lg:text-base">
                      <i class="fa-regular fa-clock"></i>
                      <p><span>${post.posted_time}</span> min</p>
                      </div>
                    </div>
                    <div class="flex gap-2 items-center">
                      <button onclick="cardHandler('${post.title.replace(
                        "'",
                        '@'
                      )}','${
      post.view_count
    }')" class="bg-green-300 hover:bg-green-500 hover:duration-300 rounded-full px-3 py-2"><i class="fa-solid fa-envelope-circle-check"></i></button>
                    </div>
                  </div>
                </div>
              </div>
    `;
    allNewsContainer.appendChild(div);
  });
};

const cardHandler = (title, view_count) => {
  const markReadCount = document.getElementById('markReadCount');
  markReadCount.innerHTML = count++;
  const cardHandlerContainer = document.getElementById('cardHandlerContainer');
  const div = document.createElement('div');
  div.innerHTML = `
            <div
                  class="flex gap-4 justify-between p-4 bg-white my-3 rounded-xl text-[16px] font-semibold"
                >
                  <div><h2>${title.replace('@', "'")}</h2></div>
                  <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-eye"></i>
                    <p>${view_count}</p>
                  </div>
            </div>
  `;
  cardHandlerContainer.appendChild(div);
};

const latestPost = async () => {
  spinner2.classList.remove('hidden');
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await res.json();
  setTimeout(() => {
    showLatestPost(data);
  }, 2000);
};
const showLatestPost = data => {
  const newsContainer = document.getElementById('newsContainer');
  data.forEach(news => {
    spinner2.classList.add('hidden');
    const div = document.createElement('div');
    div.innerHTML = `
                <div
              class="p-5 border border-[#12132D26] rounded-xl flex flex-col items-start"
            >
              <div><img class="rounded-xl mb-4" src="${
                news.cover_image
              }" alt="" /></div>
              <div class="flex gap-4 items-center">
                <i class="fa-regular fa-calendar"></i>
                <p class="text-[16px] text-[#12132D99]">${
                  news.author.posted_date
                    ? news.author.posted_date
                    : 'No publish date'
                }</p>
              </div>
              <div class="space-y-3 my-4">
                <h3 class="text-sm font-bold">${news.title}</h3>
                <p class="text-[16px] text-[#12132D99]">${news.description}</p>
              </div>
              <div class="flex gap-3">
                <div><img class="rounded-full w-10" src="${
                  news.profile_image
                }" alt="" /></div>
                <div>
                  <h4 class="text-[16px] text-[#12132D]">${
                    news.author.name
                  }</h4>
                  <p class="text-[14px] text-[#12132D99]">${
                    news.author.designation
                      ? news.author.designation
                      : 'Unknown'
                  }</p>
                </div>
              </div>
            </div>
    `;
    newsContainer.appendChild(div);
  });
};

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', async () => {
  const parentDiv = document.getElementById('parentDiv');
  parentDiv.classList.add('hidden');
  spinner.classList.remove('hidden');
  let searchBox = document.getElementById('searchBox');
  searchBoxValue = searchBox.value.toLowerCase();
  if (
    searchBoxValue === 'comedy' ||
    searchBoxValue === 'coding' ||
    searchBoxValue === 'music'
  ) {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchBox.value}`
    );
    const data = await res.json();
    setTimeout(() => {
      spinner.classList.add('hidden');
      parentDiv.classList.remove('hidden');
      displayAllPost(data.posts);
    }, 2000);
  } else {
    alert('Enter value like comedy,music coding...');
    setTimeout(() => {
      spinner.classList.add('hidden');
      allPostAPI();
    }, 2000);
  }
});
latestPost();
allPostAPI();
