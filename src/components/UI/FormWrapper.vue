<template>
  <div class="form-wrapper">
    <slot />
  </div>
</template>

<style lang="scss">
.form-wrapper {
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin-inline: auto;
    flex-direction: column;
  }

  input {
    background-color: #f7f7f7;
    border: 0;
    padding: 17.5px 24px;
    max-width: 100%;

    border-radius: 8px;

    &:hover {
      background-color: #eaeaea;
    }

    &::placeholder {
      color: var(--color-secondary);
    }

    &:focus,
    &:focus-visible {
      outline: none;
      border: 2px solid #2f80ed;
      background-color: #ebf3fe;
    }
  }

  form label {
    display: block;
    margin: 10px 0;
    max-width: 100%;
  }

  @include media-md {
    form {
      box-shadow: 0px 4px 22px rgba(52, 53, 65, 0.15);
      border-radius: 24px;
      padding: 64px;
      margin: 40px 0;
    }

    form li {
      padding: 10px 0;
    }
  }
}
</style>
