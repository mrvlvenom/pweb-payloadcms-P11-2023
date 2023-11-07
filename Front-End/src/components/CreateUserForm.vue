<template>
  <div>
    <span class="text-gray-700 font-bold text-2xl">Create User</span>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-gray-700 font-semibold">Tugas</label>
        <input v-model="inputTugas" class="border-2 py-1 border-gray-400 rounded-md" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-gray-700 font-semibold">Deadline</label>
        <input
          type="datetime-local"
          v-model="inputDeadline"
          class="border-2 py-1 border-gray-400 rounded-md"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sky-800 font-semibold">Category</label>
        <select v-model="inputCategory" class="px-3 py-2 bg-slate-100 rounded-md focus:outline-sky-800 cursor-pointer">
          <option v-for="Category in priorities" :key="Category.id" :value="Category.id" class="cursor-pointer">{{ Category.name }}</option>
        </select>
      </div>
    </div>
    <button
      @click="addTodo"
      class="px-4 py-2 mt-1 bg-gray-700 w-fit h-fit text-gray-100 font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300"
    >
      Submit
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputTugas: "",
      inputDeadline: "",
      inputCategory: "",
      priorities: [],
    };
  },
  methods: {
    addTodo() {
      console.log("Button clicked");
      const newTodo = {
        Tugas: this.inputTugas,
        Deadline: this.inputDeadline,
        Category: this.inputCategory,
      };
      axios
        .post("http://localhost:3000/api/todo", newTodo)
        .then((response) => {
          console.log("Todo added successfully:", response.data); //aku lupa apa aja tadi yang kuedit
          this.inputTugas = "";
          this.inputDeadline = "";
          this.inputCategory = "";
          this.$emit("close-popup");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
        window.location.reload();
    },
    fetchPrioritiesFromAPI() {
      axios
        .get("http://localhost:3000/api/category")
        .then((response) => {
          this.priorities = response.data.docs;
        })
        .catch((error) => {
          console.error("Error fetching priorities from API:", error);
        });
    },
  },
  created() {
    this.fetchPrioritiesFromAPI();
  },
};
</script>
