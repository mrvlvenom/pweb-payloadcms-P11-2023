<template>
  <div class="flex justify-center items-center mt-20">
    <div class="p-4 w-1/2">
      <h2 class="text-2xl font-bold text-gray-700 mb-4 flex items-center">
        <div @click="$router.go(-1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"

          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              class="cursor-pointer"

            />
          </svg>
        </div>
        Edit User
      </h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-gray-700 font-semibold">Tugas</label>
          <input
            v-model="inputNewTugas"
            class="border rounded-md px-3 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-gray-700 font-semibold">Deadline</label>
          <input
            type="datetime-local"
            v-model="inputNewDL"
            class="border rounded-md px-3 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-gray-700 font-semibold">Category</label>
          <select
            v-model="inputNewCategory"
            class="border rounded-md px-3 py-2 border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>
      <button
        @click="updateUser"
        class="px-4 py-2 mt-4 bg-gray-700 text-gray-100 font-bold text-sm rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { //nama-nama di sini kuganti
      id: this.$route.params.id,
      inputNewTugas: "",
      inputNewDL: "",
      inputNewCategory: "Low",
    };
  },
  methods: {
    getUserById() {
      axios.get(`http://localhost:3000/api/todo/${this.id}`)
        .then(response => { //variabel sudah sesuai dengan di payload
          const user = response.data;
          this.inputNewTugas = user.Tugas;
          this.inputNewDL = user.Deadline.slice(0, -1) //somehow tipedata date-time local nda mau nerima kalau ada hruuf Z di belakang data date
          this.inputNewCategory = user.Category.name || "Low"; //ambil kategori, bagian namanya aja
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateUser() {
      var idKat
      if(this.inputNewCategory == "Low") {idKat = "6543221feee092768f5e5b20"} //ini id Kategori Low di payloadku, ganti sama id punyamu sendiri
      else if(this.inputNewCategory == "High") {idKat = "65432207eee092768f5e5b0c"} //ini juga sama
      else {idKat = "654321c8eee092768f5e5af0"} //ini juga
      const updatedUser = {
        Tugas: this.inputNewTugas, //pastikan nama variabel yang mau di put/post sama dnegan yang ada di payload
        Deadline: this.inputNewDL,
        Category: idKat,
      };

      axios.put(`http://localhost:3000/api/todo/${this.id}`, updatedUser)
        .then(response => {
          // Handle the response if needed
          this.$router.push("/");
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getUserById();
  },
};
</script>

