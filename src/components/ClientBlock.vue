<template>
  <div class="client-block mt-3 mx-3">
    <span><slot name="name">Иван Иванов</slot></span>
    <span><slot name="start">Начало: 14:35</slot></span>
    <span><slot name="footer"></slot></span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">


.client-block {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dedede;
  flex-direction: column;
  border-radius: 10px;
  -webkit-box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35);
  -moz-box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35);
  box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35);
  cursor: pointer;

  -webkit-transition: all 0.5s 0s ease;
  -moz-transition: all 0.5s 0s ease;
  -o-transition: all 0.5s 0s ease;
  transition: all 0.5s 0s ease;

  &:active {
    -webkit-box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35) inset;
    -moz-box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35) inset;
    box-shadow: 0px 5px 7px 2px rgba(34, 60, 80, 0.35) inset;
  }
}
</style>
