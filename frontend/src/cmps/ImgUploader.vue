<template>

<!-- <label @drop.prevent="handleFile" @dragover.prevent>
      <input type="file" @change="handleFile" hidden />
      <img :src="img" alt="" />
    </label> -->
  <div className="upload-preview">
    <label @drop.prevent="uploadImg" @dragover.prevent>
    <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }" />
    <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
    <!-- <input type="file" @change="handleFile" accept="img/*" id="imgUpload" /> -->
  </label> 
  </div>
</template>

<script>
import { uploadService } from '../services/upload.service.js'

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl)
    },
    async handleFile(ev) {
            // console.log("ev:", ev)
            const { url ,height, width} = await uploadService.uploadImg(ev)
            this.imgUrl = url
        }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  }
}
</script>
