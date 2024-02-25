import {defineStore} from "pinia"
import axios from "axios"

export const useAtStore = defineStore({
    id:"at",
    state:()=>({
        pesa:0
    }),
    getters:{
        getBal:(state)=>{
            return state.pesa
        }
    },
    actions:{
        async getBalance(){
           // const data = await axios.get("https://bruce-mpesa.herokuapp.com/mpesa/balance")
            //if (data.data.status=="Success") {
                this.pesa = "30,753.56"
           // }
        }
    }
})