<template>
  <GridLayout
    class="textForm"
    rows="*"
    columns="auto, auto"
  >
    <Label
      col="0"
      class="textForm_label"
      :width="labelWidth"
      verticalAlignment="center"
      :text="textFormLabel"
    />
    <TextField
      col="1"
      class="textForm_editable"
      :width="textFieldWidth"
      verticalAlignment="center"
      color="black"
      isEnabled="true"
      editable="true"
      :maxLength="16"
      keyboardType="keyboardType"
      :returnKeyType="returnKeyType"
      :text="value"
      @textChange="$emit('onTextChange', value)"
    />
  </GridLayout>
</template>
<script lang="ts">
export default {
  name: "TextForm",
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80
    },
    textFieldWidth: {
      type: [String, Number],
      default: "100%"   
    },
    keyboardType: {
      type: String,
      default: 'url',
      validator: function(value) {
        // The value must match one of these strings
        return (
          ['datetime', 'phone', 'number', 'url', 'email'].indexOf(value) !== -1
        )
      }
    },
    returnKeyType: {
      type: String,
      default: "done",
      validator: function(value) {
        // The value must match one of these strings
        return ['done', 'go', 'next', 'search', 'send'].indexOf(value) !== -1
      }
    },
    textFormLabel: {
      type: String,
      default: "Pepe"
    },
    value: {
      // type: [String, Number],
      validator: prop => typeof prop === 'string' || prop === 'number' || prop === null,
      required: true
    },
  },
}
</script>
<style lang="scss" scoped>
  .textForm {
    margin: {
      top: 0;
      bottom: 0;
    }
  }
  .textForm_label {
    font-size: 16;
    color: black;
  }
  .textForm_editable {
    font-size: 16;
  }
</style>