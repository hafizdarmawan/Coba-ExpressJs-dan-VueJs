<template>
  <div class="container mt-custom">
      <div class="row">
          <div class="card border-0 rounded shadow-sm">
              <div class="card-body">
                  <h4>Data Post</h4>
                  <hr>
                  <router-link :to="{name:'posts.create'}" class="btn btn-ms btn-primary">Tambah Post</router-link>
                <table class="table table-striped table-bordered mt-4">
                    <thead class="thead-dark">
                            <tr>
                                <th scope="col">TITLE</th>
                                <th scope="col">CONTENT</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(post,index) in posts" :key="index">
                            <td>{{post.title}}</td>
                            <td>{{post.content}}</td>
                            <td class="text-center">
                                <router-link :to="{name:'posts.edit', params:{id:post.id}}" class="btn btn-warning shadow">Edit</router-link>
                                <button @click.prevent="postDelete(post.id)" class="btn btn-sm btn-danger ml-1">DELETE</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {onMounted,ref} from 'vue'
import axios from 'axios'

export default {
    setup(){
        // reactive state
        let posts = ref([])

        // onMounted
        onMounted(() => {
            // panggil function "getDataPosts"
            getDataPosts()
        })

        // function getDataPosts
        function getDataPosts(){
            // get Api from express backend
            axios.get('http://localhost:3000/api/posts')
            .then(response => {
                // assign state posts with response data
                posts.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        function postDelete(id) {

        //delete data post by ID
        axios.delete(`http://localhost:3000/api/posts/delete/${id}`)
        .then(() => {

            //panggil function "getDataPosts"  
            getDataPosts()

        }).catch(error => {
            console.log(error.response.data)
        })
        }


        return {
            posts,
            getDataPosts,
            postDelete
        }
    }
}
</script>

<style>

</style>