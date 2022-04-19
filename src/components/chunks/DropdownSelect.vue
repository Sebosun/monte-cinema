<template>
  <div class="dropdown-select" @click="isOpen = !isOpen">
    <div class="dropdown-select__display">
      <div class="dropdown-select__display--selected">
        {{ selectedGenreText }}
      </div>
      <div class="dropdown-select__display--svg-wrapper">
        <svg viewBox="0 0 1030 638" width="10">
          <path
            d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
            fill="black"
          />
        </svg>
      </div>
    </div>
    <transition name="fade" appear>
      <ul v-if="isOpen" class="dropdown-select__sub-menu">
        <li
          v-for="(item, i) in transformedItemsArray"
          :key="i"
          class="dropdown-select__item"
          @click="$emit('select', item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    selected: {
      type: String,
      required: true,
    },
    itemsArray: {
      type: Array,
      required: true,
    },
    resetTerm: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    selectedGenreText() {
      return this.selected ? this.selected : this.resetTerm;
    },
    transformedItemsArray() {
      if (this.selected === "") {
        return this.itemsArray;
      } else {
        const newArr = [...this.itemsArray];
        newArr.unshift({ name: this.resetTerm });
        return newArr;
      }
    },
  },
};
</script>

<style lang="scss">
.dropdown-select {
  padding: 8px 0;
  position: relative;
  text-align: center;
  display: flex;
  transition: 0.4s;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.03);

  ul {
    list-style-type: none;
    padding: 0;
  }

  &:hover {
    cursor: pointer;
    background: darken(#f4f4f5, 10);
  }

  &__sub-menu {
    position: absolute;
    max-height: 200px;
    top: calc(100% - 10px);

    transform: translate(-50%, 0);
    left: 50%;
    width: 100%;

    text-align: left;
    color: black;
    background: darken(#fff, 3);

    overflow: auto;

    &:first-of-type {
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    &:last-of-type {
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }

  &__item {
    padding: 10px 20px;
    &:hover {
      cursor: pointer;
      background: darken(#f4f4f5, 10);
    }
  }

  &__display {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--selected {
      margin-left: 20px;
      padding: 6.5px 0;
    }
    &--svg-wrapper {
      padding: 10px 20px;
      margin-right: 5px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
