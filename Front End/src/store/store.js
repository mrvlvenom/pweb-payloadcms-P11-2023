import { reactive } from "vue";

// Fungsi untuk menyimpan data ke local storage
const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Fungsi untuk mengambil data dari local storage
const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Inisialisasi statusOptions dari local storage saat aplikasi dimuat
const initialStatusOptions = getFromLocalStorage("statusOptions");

export const userStore = reactive({
  users: getFromLocalStorage("users") || [], // Mengambil data pengguna dari local storage dengan kunci "users"
  statusOptions: initialStatusOptions || ["Finished", "On going", "Not Yet"], // Menggunakan statusOptions dari local storage jika ada, jika tidak, menggunakan nilai default

  createUser(user) {
    this.users.push(user);
    saveToLocalStorage("users", this.users); // Menyimpan data pengguna ke local storage dengan kunci "users"
  },

  deleteUser(userId) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    console.log(userIndex);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      saveToLocalStorage("users", this.users); // Menyimpan data pengguna setelah menghapus ke local storage
    }
  },

  editUser(updatedUser) {
    const userIndex = this.users.findIndex((user) => user.id === updatedUser.id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1, updatedUser);
    } else {
      this.users.push(updatedUser);
    }
    saveToLocalStorage("users", this.users); // Menyimpan data pengguna setelah mengedit ke local storage
  },

  updateStatusOptions(statusOptions) {
    this.statusOptions = statusOptions;
    saveToLocalStorage("statusOptions", this.statusOptions); // Menyimpan data statusOptions ke local storage dengan kunci "statusOptions"
  }
});
