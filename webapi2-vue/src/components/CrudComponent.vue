<template>
	<div>
		<h1>CRUD Example</h1>

		<form @submit.prevent="createItem" class="add">
			<div>
				<label for="name">Name: </label>
				<input type="text" v-model="newName"
				placeholder="name" />
			</div>

			<div>
				<label for="description">Description: </label>
				<input type="text" v-model="newDescription"
				placeholder="description" />
			</div>

			<button type="submit" style="margin-top: 6px;">Add Item</button>
		</form>

		<input type="text" v-model="searchQuery" placeholder="Search items" 
		style="margin-bottom: 10px;" />

		<table style="border: black solid 1px; border-collapse: collapse;">
			<thead>
				<tr>
					<th style="border: black solid 1px; padding: 6px;">ID</th>
					<th style="border: black solid 1px; padding: 6px;">Name</th>
					<th style="border: black solid 1px; padding: 6px;">Description</th>
					<th style="border: black solid 1px; padding: 6px;">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in filteredItems" :key="item.id">
					<td style="border: black solid 1px; padding: 6px;">{{ item.id }}</td>
					<td style="border: black solid 1px; padding: 6px;">{{ item.name }}</td>
					<td style="border: black solid 1px; padding: 6px;">{{ item.description }}</td>
					<td style="border: black solid 1px; padding: 6px;">
						<button @click="editItem(item)" style="margin-right: 6px;">Edit</button>
						<button @click="confirmDeleteItem(item.id)">Delete</button>
					</td>
				</tr>
			</tbody>
		</table>

		<form v-if="showForm" @submit.prevent="saveItem" class="update">
			<div>
				<label for="name">Name: </label>
				<input type="text" id="name" v-model="item.name">
			</div>
			<div>
				<label for="description">Description: </label>
				<input type="text" id="description" v-model="item.description">
			</div>
			<button type="submit" @click="confirmUpdateItem(item)" style="margin-right: 6px">Update</button>
			<button type="button" @click="cancelForm">Cancel</button>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				newName: '',
				newDescription: '',
				searchQuery: '',
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
		created() {
			this.getItems();
		},
		computed: {
			filteredItems() {
				if (this.searchQuery) {
					return this.items.filter(item =>
						item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
						);
				}
				return this.items;
			},
		},
		methods: {
			getItems() {
				axios.get('http://127.0.0.1:8080/web/api/v2/data')
				.then(response => {
					this.items = response.data;
				})
				.catch(error => {
					console.error(error);
				});
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
			cancelForm() {
				this.showForm = false;
			},
			createItem() {
				axios.post('http://127.0.0.1:8080/web/api/v2/data', {
					name: this.newName,
					description: this.newDescription,
				})
				.then(response => {
					this.newName = '';
					this.newDescription = '';
					this.getItems();
				})
				.catch(error => {
					console.error(error);
				});
			},
		    confirmUpdateItem(item) {
		      if (confirm('Are you sure you want to update this item?')) {
		        this.updateItem(item);
		      }
		    },			
			updateItem(item) {
				axios.put(`http://127.0.0.1:8080/web/api/v2/data/${item.id}`, item)
				.then(response => {
					this.getItems();
					this.cancelForm();
				})
				.catch(error => {
					console.error(error);
				});
			},
		    confirmDeleteItem(itemId) {
		      if (confirm('Are you sure you want to delete this item?')) {
		        this.deleteItem(itemId);
		      }
		    },			
			deleteItem(itemId) {
				axios.delete(`http://127.0.0.1:8080/web/api/v2/data/${itemId}`)
				  .then(response => {
				    this.getItems();
				  })
				  .catch(error => {
				    console.error(error);
				  });
			},
		},
	};
</script>