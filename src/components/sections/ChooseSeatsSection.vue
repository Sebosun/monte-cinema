<script>
export default {
  props: {
    array: { type: Array, required: true },
  },
  methods: {
    boxClasses(seat) {
      return [
        "choose-seats__box",
        {
          "choose-seats__box--user-selected": seat.taken,
          "choose-seats__box--reserved": seat.reserved,
        },
      ];
    },
  },
};
</script>

<template>
  <div class="choose-seats">
    <div
      v-for="(row, index) in array"
      class="choose-seats__container"
      :key="index"
    >
      <div class="choose-seats--indicator">{{ row.row }}</div>
      <button
        @click="$emit('takeSeat', seat)"
        v-for="(seat, arrIndex) in row.array"
        :key="seat.value"
        :class="boxClasses(seat)"
      >
        {{ arrIndex + 1 }}
      </button>

      <div class="choose-seats--indicator">{{ row.row }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.choose-seats {
  padding: 40px;

  display: flex;
  gap: 10px;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 1.596024513244629px 5.187079429626465px 0px #00000004;
  box-shadow: 0px 5.360713958740234px 17.422321319580078px 0px #00000006;
  box-shadow: 0px 24px 78px 0px #00000014;

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow: auto;
  }

  &__box {
    border: 0;
    height: 35px;
    width: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fbcfd0;

    transition: color 0.2s ease-in-out, background-color 0.3s ease-in-out;
    &:hover {
      cursor: pointer;
    }
  }

  &__box--reserved {
    background: var(--color-secondary);
  }

  &__box--user-selected {
    background: var(--color-brand);
    color: var(--color-background);
  }

  @include media-sm {
    &__container {
      margin: 10px 20px;
      overflow: auto;
    }
    &__box {
      flex: 1;
      align-self: stretch;
      width: 100%;
    }

    &--indicator {
      margin-inline: 0;
    }
  }
  @include media-md {
    &--indicator {
      margin-inline: 0px 20px;
    }
    &--indicator:last-child {
      margin-inline: 20px 0;
    }
  }
}
</style>
