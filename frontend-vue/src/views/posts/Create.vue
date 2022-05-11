<template>
    <div class="container mt-custom">
        <div class="row">
            <div class="card border-0 rounded shadow-sm">
                <div class="card-body">
                    <h4>Tambah Post</h4>
                    <hr>
                    <div v-if="validation.errors" class="mt-2 alert alert-danger">
                        <ul class="mt-0 mb-0">
                            <li v-for="(error,index) in validation.errors" :key="index">{{`${error.param}: ${error.msg}`}}</li>
                        </ul>
                    </div>
                    <form @submit.prevent="store">
                        <div class="form-group">
                            <label for="" class="font-weight-bold mb-2">Title</label>
                            <input type="text" class="form-control" v-model="post.title" placeholder="Masukan Judul Post">
                        </div>
                        <div class="form-group mt-3">
                            <label for="content" class="font-weight-bold mb-2">CONTENT</label>
                            <textarea class="form-control" rows="4" v-model="post.content" placeholder="Masukkan Konten Post"></textarea>
                            </div>
                        <button type="submit" class="btn btn-primary mt-3">SIMPAN</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {reactive,ref} from 'vue'
import {useRouter} from 'vue-router'
import axios from 'axios'

export default {
    setup(){
        // state posts
        const post = reactive({
            title:'',
            content:''
        })

        // state validation
        const validation = ref([])

        // vue router
        const router = useRouter()

        // method store
        function store(){
            let title = post.title
            let content = post.content

            axios.post('http://localhost:3000/api/posts/store',{
                title:title,
                content:content
            }).then(() => {
                // redirect
                router.push({
                    name:'posts.index'
                })
            }).catch(error => {
                validation.value = error.response.data
        })
    }
    return {
        post,
        validation,
        router,
        store
    }
 }
}
</script>

<style>

</style>