<script>
export default {
  props: {
    array: { type: Array, required: true },
  },
};
</script>

<template>
  <div>
    <div v-for="(item, index) in array" class="booking__container" :key="index">
      <div>{{ item.row }}</div>
      <button
        @click="$emit('takeSeat', i)"
        v-for="(i, arrIndex) in item.array"
        :key="i.value"
        class="square"
        :class="{
          'square--user-checked': i.taken,
          'square--reserved': i.reserved,
        }"
      >
        <div>{{ arrIndex + 1 }}</div>
      </button>
      <div>{{ item.row }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.booking__container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;
}
.square {
  transition: color 0.2s ease-in-out, background-color 0.3s ease-in-out;

  border: 0;
  height: 35px;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbcfd0;
  &:hover {
    cursor: pointer;
  }
}

.square--reserved {
  background: #ccc;
}

.square--user-checked {
  background: red;
}
</style>
