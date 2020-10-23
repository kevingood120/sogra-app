<script>

let timer = null

export default {
    model: {
        event:'update:selected',
        prop: 'selectedItem',
    },
    props: {
        data: Array,
        textRender: Function,
        selectedItem: Object,
        query: String
    }, 
    data: () => ({
        isOpen: false,
    }),
    methods: {
        selectItem(item) {
            this.$emit('update:selected', item)
            this.isOpen = false
        },
        listItemClasses(item) {
            return {
                'list-group-item': true,
                'active': item.idProduct === this.selectedItem?.idProduct,
                'd-flex': true,
                'justify-content-between': true,
                'align-items-baseline': true,
                'list-group-item-action': true
            }
        },
        changeValueInput(query) {
            this.$emit('update:query', query)
        },
        changeInput(ev) {
            this.changeValueInput(ev.target.value)
        },
        inputBlur() {
            const isSelected = !!this.selectedItem && Object.keys(this.selectedItem).length > 0
            if(isSelected)
                this.changeValueInput(this.textRender(this.selectedItem))

            clearTimeout(timer)
            timer = setTimeout(() => this.isOpen = false, 350)
            
        },
        inputFocus(ev) {
            ev.stopPropagation()
            this.isOpen = true
        }
    },
    watch: {
        selectedItem(newValue) {
            const isNull = !!newValue && Object.keys(newValue).length === 0
            if(isNull)
                this.changeValueInput('')
            else
                this.changeValueInput(this.textRender(newValue))
        }
    }
}
</script>

<template>
  <div class="position-relative">
      <input 
        :placeholder="$attrs.placeholder"
        ref="inputRef"
        :value="query" 
        @focus="inputFocus"
        @blur="inputBlur"
        @input="changeInput" 
        type="text" 
        class="form-control"
    >
          <div v-if="isOpen" class="wrapper position-absolute shadow overflow-auto mt-2">
              <div class="wrapper-2">
                    <ul class="list-group list-group-flush" v-if="data && data.length > 0">
                        <li 
                            @click="selectItem(item)" 
                            :class="listItemClasses(item)" 
                            v-for="(item, index) in data" 
                            :key="index">
                            <slot name="item" :item="item">
                                {{item}}
                            </slot>
                        </li>
                    </ul>
              </div>
          </div>
  </div>
</template>

<style scoped>

    div.wrapper {
        left: 0;
        right: 0;
        float: left;
        background-color: white;
        z-index: 20000;
    }

    div.wrapper-2 {
        float: left;
        background-color: white;
        z-index: 20000;
    }
    
    .list-group-item {
        cursor: pointer;
    }

</style>