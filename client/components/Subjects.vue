<template>
    <div>
        <div class="row">
            <div class="col-xl-12">
                <template>
                    <v-data-table
                            :headers="headers"
                            :items="subjects"
                            :items-per-page="10"
                            class="elevation-1">
                    </v-data-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { Subjects } from '../../imports/api/subjects';
    export default {
        name: 'Subjects',
        meteor: {
            subjects() {
                return Subjects.find({}).fetch();
            }
        },
        data() {
            return {
                headers: [
                    {text: 'Name', align: 'start', value: 'name'},
                    {text: 'Students', value: 'students', sortable: false}
                ]
            }
        }
    }
</script>
