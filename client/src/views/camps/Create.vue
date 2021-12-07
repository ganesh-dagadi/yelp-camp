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
import axios from "axios";
export default {
  name: 'UserIndex',
  data(){
    return {
      msg : this.$route.query.msg,
      title : 'title',
      descp : '',
      text: '',
      image : {},
      numImages : 0,
      imageContent : '',
      imageURL : 'hihi',
      cloudName: 'dxm68x3tm',
      uploadPreset : 'eumctncn',
    }
  },
  methods:{
      submitForm(event){
          event.preventDefault()
          this.cloudinaryUpload()
        //   this.API_upload()
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
          const uploadData = {
              file : this.imageContent,
              upload_preset : this.uploadPreset,
              folder : 'Yelp_Camp'
          }

         try{
           const res = await axios.post(`https://api.cloudinary.com/v1_1/dxm68x3tm/upload` , uploadData)
           this.imageURL = res.data.secure_url
         }catch(err){
             console.log(err)
         }          
          
      },
    //   async API_upload(){
    //       const postData = {
    //           title : this.title,
    //           descp : this.descp,
    //           text : this.text,
    //           image : this.imageURL
    //       }
    //       axios.post()
    //   }
  }
}
</script>