const allPostAPI = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  displayAllPost(data.posts);
};

const displayAllPost = posts => {
  const allNewsContainer = document.getElementById('allNewsContainer');
  posts.forEach(post => {
    console.log(post);
    const div = document.createElement('div');
    div.innerHTML = `
                  <div
                class="bg-[#797DFC1A] grid grid-cols-12 rounded-lg md:rounded-2xl"
              >
                <div class="col-span-2 flex items-center justify-center relative">
                  <img class="rounded-xl" src="${post.image}" alt="" />
                  <i class="fa-solid fa-circle absolute top-[25%] right-0"></i>
                </div>
                <div class="col-span-10 p-4 md:p-10 space-y-5">
                  <div
                    class="flex gap-6 text-[14px] text-[#12132DCC] font-medium"
                  >
                    <p>#<span>${post.category}</span></p>
                    <p>Author: <span>${post.author.name}</span></p>
                  </div>
                  <div>
                    <h2 class="text-sm text-[#12132D] font-bold">
                      ${post.title}
                    </h2>
                    <p class="text-[16px] text-[#12132D99]">${post.description}</p>
                  </div>
                  <hr class="text-black" />
                  <div
                    class="flex gap-4 justify-between text-[16px] text-[#12132D99]"
                  >
                    <div class="flex gap-3 items-center">
                      <i class="fa-regular fa-comment"></i>
                      <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-3 items-center">
                      <i class="fa-solid fa-eye"></i>
                      <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-3 items-center">
                      <i class="fa-regular fa-clock"></i>
                      <p><span>${post.posted_time}</span> min</p>
                    </div>
                    <div class="flex gap-3 items-center">
                      <i class="fa-solid fa-envelope-open"></i>
                    </div>
                  </div>
                </div>
              </div>
    `;
    allNewsContainer.appendChild(div);
  });
};
allPostAPI();
