<template>
    
    <div class="container">
        {{image}}
        <p>{{msg}}</p>
         <h1> Create camp </h1>

        <form>
            <div>
                <label for="Title">Title</label>
                <input v-model="title" type="text">
            </div>
            
            <div>
                <label for="Title">descp</label>
                <input v-model="descp" type="text">
            </div>
             <div>
                <label for="Title">descp</label>
                <textarea v-model="text" cols="30" rows="10"></textarea>
            </div>

            <div>
            <input type="file"  accept="image/png , image/jpeg" @change="handleFileChange($event)">
            <button v-show="numImages < 2" @click="submitForm">Submit</button>
            </div>
            
            
        </form>
        <p> image {{imageURL}}</p>
    </div>

   
</template>

<script>
// @ is an alias to /src
import axios_instance from "../../config/axios_config";
import axios from "axios"
export default {
  name: 'UserIndex',
  data(){
    return {
      msg : this.$route.query.msg,
      title : '',
      descp : '',
      text: '',
      image : {},
      numImages : 0,
      imageContent : '',
      imageURL : '',
      cloudName: 'dxm68x3tm',
      uploadPreset : 'eumctncn',
    }
  },
  methods:{
      submitForm(event){
          event.preventDefault()
          this.cloudinaryUpload()
      },
      handleFileChange : function (event){
          this.image = event.target.files[0];
          this.numImages = event.target.files.length
          let reader = new FileReader();
          reader.addEventListener(
              "load" , 
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
          const uploadData = new FormData()
          uploadData.append('file' , this.imageContent);
          uploadData.append('upload_preset' , this.uploadPreset);
          uploadData.append('folder' , 'Yelp_Camp')
         try{
        const res = await axios({
            method : "post",
            url : `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`,
             transformRequest : [(data , headers)=>{
                delete headers.common.access_token
                delete headers.common.refresh_token
                return data
            }],
            data : uploadData,
        })
           this.imageURL = res.data.secure_url
           this.API_upload()
         }catch(err){
             console.log(err)
         }          
          
      },
      async API_upload(){
          const postData = {
              title : this.title,
              descp : this.descp,
              text : this.text,
              image : this.imageURL
          }
          axios_instance.post('/camps' , postData)
          .then(res=>{
              console.log(res , 'in response of create post')
              this.$router.push(`/?${res.status}`)
          })
          .catch(err=>{
              console.log(err,  'in error of create post')
          })
      }
  }
}
</script>