<template>
    <div class="container">
        <p>{{campData}}</p>
        <h1> Create camp </h1>

        <form>
            <div>
                <label for="Title">Title</label>
                <input v-model="campData.title" type="text">
            </div>
            
            <div>
                <label for="descp">descp</label>
                <input v-model="campData.descp" type="text">
            </div>
             <div>
                <label for="text">text</label>
                <textarea v-model="campData.text" cols="30" rows="10"></textarea>
            </div>

            <div>
            <input type="file"  accept="image/png , image/jpeg" @change="handleFileChange($event)">
            <button v-show="numImages < 2" @click="submitForm">Submit</button>
            </div>
            
            
        </form>
    </div>
</template>

<script>
 import axiosInstance from "../../config/axios_config";
 import axios from 'axios'
 import router from "../../router/index";
export default {
    name : 'Camps Show',
    data(){
        return {
            campData : {
                title : '',
                descp : '',
                text : '',
                image : ''
            },
            numImages:0,
            newImage : '',
            image : {},
            imageContent : '',
            cloudName: 'dxm68x3tm',
            uploadPreset : 'eumctncn'
        }
    },
    methods:{
        submitForm(event){
            event.preventDefault();
            if(this.numImages == 0){
                this.API_call()
            }else{
                this.cloudinaryUpload()
            }
        },
        handleFileChange : function (event){
            this.image = event.target.files[0];
            this.numImages = event.target.files.length;

            let reader = new FileReader();
            reader.addEventListener(
                "load",
                function(){
                    this.imageContent = reader.result
                }.bind(this),
                false
            );

            if(this.image && this.image.name){
                reader.readAsDataURL(this.image)
            }
        },
        async cloudinaryUpload(){
            const uploadData = new FormData();
            uploadData.append('file', this.imageContent);
            uploadData.append('upload_preset' , this.uploadPreset);
            uploadData.append('folder' , 'Yelp_Camp')
            try{
                const res = await axios({
                    method : "post",
                    url : `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`,
                    data : uploadData
                })
                this.campData.image = res.data.secure_url;
                this.API_call();
            }catch(err){
                console.log(err)
            }
        },

        async API_call(){
            const putData = {
                title : this.campData.title,
                descp : this.campData.descp,
                text : this.campData.text,
                image : this.campData.image
            }
            try{
              const res = await axiosInstance.put(`/camps/${this.campData._id}` , putData);
              if(res.status == 200){
                  router.push('/')
              }
            }catch(err){
                console.log(err)
            }
        } 

    },
    beforeMount(){
        axiosInstance.get(`/camps/${this.$route.params.id}`)
        .then(res=>{
            this.campData = res.data.camp
            this.oldImage = res.data.camp.image
        })
        .catch(err=>{
             router.push(`/notfound?err=${err.data.status}`)
        })
    }
}
</script>