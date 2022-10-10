<template>
  <div class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col">
          <slot/>
        </div>
        <div class="col">
          <button type="button" class="btn btn-sm btn-outline-primary float-end">View My Learning Journeys</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniNav',
  props: ['message']
}
</script>