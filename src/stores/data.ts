import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useDataStore = defineStore('data', {
  state: () =>
    useLocalStorage<any>('data', {
      step: 0,
      name: null,
      age: null,
      gender: null,
      incomeBefore: null,
      incomeAfter: null,
      nik: null,
      nikFile: null,
      kk: null,
      kkFile: null,
      province: null,
      regency: null,
      district: null,
      village: null,
      rt: null,
      rw: null,
      address: null
    }),

  getters: {
    data(): object {
      return this.$state
    }
  },

  actions: {
    setStep(step: number) {
      this.step = step
    },

    setName(name: string | null) {
      this.name = name
    },

    setAge(age: number | null) {
      this.age = age
    },

    setGender(gender: string | null) {
      this.gender = gender
    },

    setIncomeBefore(income: number | null) {
      this.incomeBefore = income
    },

    setIncomeAfter(income: number | null) {
      this.incomeAfter = income
    },

    setNik(nik: number | null) {
      this.nik = nik
    },

    setNikFile(nikFile: string | null) {
      this.nikFile = nikFile
    },

    setKk(kk: number | null) {
      this.kk = kk
    },

    setKkFile(kkFile: string | null) {
      this.kkFile = kkFile
    },

    setProvince(province: number | null) {
      this.province = province
    },

    setRegency(regency: number | null) {
      this.regency = regency
    },

    setDistrict(district: number | null) {
      this.district = district
    },

    setVillage(village: number | null) {
      this.village = village
    },

    setRt(rt: number | null) {
      this.rt = rt
    },

    setRw(rw: number | null) {
      this.rw = rw
    },

    setAddress(address: string | null) {
      this.address = address
    },

    clear() {
      this.setStep(0)
      this.setName(null)
      this.setAge(null)
      this.setGender(null)
      this.setIncomeBefore(null)
      this.setIncomeAfter(null)
      this.setNik(null)
      this.setNikFile(null)
      this.setKk(null)
      this.setKkFile(null)
      this.setProvince(null)
      this.setRegency(null)
      this.setDistrict(null)
      this.setVillage(null)
      this.setRt(null)
      this.setRw(null)
      this.setAddress(null)
    }
  }
})
