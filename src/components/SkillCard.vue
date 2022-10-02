<template>
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{SkillName}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Skill ID: {{SkillID}}</h6>
    <p class="card-text" v-if="deleted == true">This skill has been deleted.</p>
    <a v-bind:href="SkillURL" class="card-link">Edit</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'SkillCard',
  props: {
    SkillName: String,
    SkillID : Number,
    deleted : Boolean,
    SkillURL : String,
  }
}
</script>
