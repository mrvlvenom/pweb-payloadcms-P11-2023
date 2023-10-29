<template>
  <span class="text-gray-700 font-bold text-2xl">Create User</span>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">Nama</label>
      <input
        v-model="inputName"
        class="border-2 py-1 border-gray-400 rounded-md"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">What's on your To Do List</label>
      <input
        v-model="inputCRUD"
        class="border-2 py-1 border-gray-400 rounded-md"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">Date</label>
      <input
        type="datetime-local"
        v-model="inputDate"
        class="border-2 py-1 border-gray-400 rounded-md"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">Category</label>
      <select v-model="inputCategory" class="border-2 py-1 border-gray-400 rounded-md">
        <option value="Low">Low</option>
        <option value="Urgent">Urgent</option>
        <option value="High">High</option>
      </select>
    </div>
  </div>
  <button
    @click="addUser"
    class="px-4 py-2 mt-1 bg-gray-700 w-fit h-fit text-gray-100 font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300"
  >
    Submit
  </button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputName: "",
      inputDeadline: "",
      inputCategory: "", 
      Categories: [], 
    };
  },
  methods: {
    addTodo() {
      if (this.inputName === "" || this.inputDeadline === "" || this.inputCategory === "") return;

      const newTodo = {
        name: this.inputName,
        deadline: this.inputDeadline,
        Category: this.inputCategory,
        status: "1", 
      };

      axios
        .post('http://localhost:3000/api/Todo', newTodo)
        .then((response) => {
          console.log('Todo added successfully:', response.data);
          this.$emit('todo-added', response.data);

          this.inputName = "";
          this.inputDeadline = "";
          this.inputCategory = "";
          this.$emit("close-popup");
        })
        .catch((error) => {
          console.error('Error adding todo:', error);
        });
      window.location.reload();
    },
    startSpeechRecognition() {
      const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new speechRecognition();
      recognition.lang = "id-ID";
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.inputName = result;
      };
      recognition.start();
    },
    fetchCategoriesFromAPI() {
      axios
        .get('http://localhost:3000/api/Category')
        .then((response) => {
          this.Categories = response.data.docs;
        })
        .catch((error) => {
          console.error('Error fetching Categories from API:', error);
        });
    },
  },
  created() {
    this.fetchCategoriesFromAPI();
  },
};

</script>


