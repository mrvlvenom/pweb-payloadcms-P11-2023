<template>
  <div class="m-5 flex flex-col items-center justify-center gap-5">
    <div class="block p-6 lg:w-1/2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <!-- Profil 1 -->
      <div class="profile-container">
        <img src="../assets/Januar.jpg" alt="Profile Image" class="w-12 h-12 rounded-full" />
        <div class="profile-info">
          <h2 class="text-xl font-semibold text-gray-900">{{ asist[0].name }}</h2>
          <p class="text-gray-500">{{ asist[0].nrp }}</p>
          <p class="text-gray-500">{{ asist[0].additionalInfo }}</p>
        </div>
      </div>

      <!-- Profil 2 -->
      <div class="profile-container">
        <img src="../assets/rehana.jpg" alt="Profile Image" class="w-12 h-12 rounded-full" />
        <div class="profile-info">
          <h2 class="text-xl font-semibold text-gray-900">{{ asist[1].name }}</h2>
          <p class="text-gray-500">{{ asist[1].nrp }}</p>
          <p class="text-gray-500">{{ asist[1].additionalInfo }}</p>
        </div>
      </div>

      <!-- Profil 3 -->
      <div class="profile-container">
        <img src="../assets/Angel.jpg" alt="Profile Image" class="w-12 h-12 rounded-full" />
        <div class="profile-info">
          <h2 class="text-xl font-semibold text-gray-900">{{ asist[2].name }}</h2>
          <p class="text-gray-500">{{ asist[2].nrp }}</p>
          <p class="text-gray-500">{{ asist[2].additionalInfo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asist: [
        {
          name: "M. Januar Eko Wicaksono",
          nrp: 5027221006,
          profileImage: "../assets/Januar.jpg",
          additionalInfo: "Tertawalah sebelum tertawa itu dilarang"
        },
        {
          name: "Rehana Putri Salsabila",
          nrp: 5027221015,
          profileImage: "URL_GAMBAR_PROFILE_2",
          additionalInfo: "Life is beautiful journey"
        },
        {
          name: "Angella Christie",
          nrp: 5027221047,
          profileImage: "URL_GAMBAR_PROFILE_3",
          additionalInfo: "Enjoy the little things"
        }
      ]
    };
  }
};
</script>

<style>
.profile-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.profile-image {
  flex-shrink: 0; 
}
.profile-info {
  flex: 1;
}
</style>
