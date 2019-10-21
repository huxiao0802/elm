<template>
  <div class="headers">
     <slot name="left"></slot>
     <slot name="title"></slot>
     <slot name="right"></slot>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .headers{
        width: 100%;
        height: 0.95rem;
        background: #3190e8;
        box-sizing: border-box;
        padding: 0px 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }
</style>