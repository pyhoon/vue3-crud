<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="confirm" class="btn btn-primary">Confirm</button>
        <button @click="cancel" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit('confirmed');
    },
    cancel() {
      this.$emit('canceled');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.modal-body {
  margin-bottom: 10px;
}

.modal-footer {
  text-align: right;
}
</style>