<template>
  <div>
    <h1>API Component</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <button @click="editItem(item)">Edit</button>
            <button @click="deleteItem(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form v-if="showForm" @submit.prevent="saveItem">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="item.name">
      <label for="description">Description:</label>
      <input type="text" id="description" v-model="item.description">
      <button type="submit">{{ formAction }}</button>
      <button type="button" @click="cancelForm">Cancel</button>
    </form>
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      item: {
        id: null,
        name: '',
        description: '',
      },
      showForm: false,
      formAction: '',
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      axios.get('http://127.0.0.1:8080/web/api/v2/data')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addItem() {
      this.item = {
        id: null,
        name: '',
        description: '',
      };
      this.showForm = true;
      this.formAction = 'Add';
    },
    editItem(item) {
      this.item = {
        id: item.id,
        name: item.name,
        description: item.description,
      };
      this.showForm = true;
      this.formAction = 'Update';
    },
    deleteItem(item) {
      axios.delete(`http://127.0.0.1:8080/web/api/v2/data/${item.id}`)
        .then(response => {
          this.getItems();
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveItem() {
      if (this.formAction === 'Add') {
        axios.post('http://127.0.0.1:8080/web/api/v2/data', this.item)
          .then(response => {
            this.getItems();
            this.cancelForm();
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.formAction === 'Update') {
        axios.put(`http://127.0.0.1:8080/web/api/v2/data/${this.item.id}`, this.item)
          .then(response => {
            this.getItems();
            this.cancelForm();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    cancelForm() {
      this.showForm = false;
    },
  },
};
</script>