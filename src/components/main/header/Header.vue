<template>
  <Popover class="relative bg-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Work Dashboard</span>
            <img class="h-8 w-auto sm:h-10" src="@/assets/logo.png" alt="" />
          </a>
           <p class="pl-2 font-mono text-white text-2xl">Work Dashboard</p>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <p class="font-mono text-white text-xl">{{ timeNow }}</p>
        </div>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <p class="font-mono text-green-300 text-sm">💲{{bal}}</p>
        </div>
      </div>
    </div>

  </Popover>
</template>


<script>
import { useAtStore } from '@/stores/at';
import { storeToRefs } from 'pinia';
import { Popover} from '@headlessui/vue'
export default{
  data(){
    return{
      timeNow:0,
      bal:0
    }
  },
  components:{
    Popover
  },
  computed:{
  },
  methods:{
    redoDate(){
      this.timeNow = Date ()
    }
  },
  mounted(){
    const useStore = useAtStore();
    const {getBal} = storeToRefs(useStore);
    const {getBalance} = useStore
    this.bal = getBal
    getBalance();
   setInterval(() => {
        // eslint-disable-next-line vue/no-use-computed-property-like-method
        this.redoDate();
      }, 1000);
  }
}
</script>