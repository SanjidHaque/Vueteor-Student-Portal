<template>
    <div>
        <div class="row">
            <div class="col-xl-12">
                <v-btn
                       small
                       text
                       class="v-btn-add">
                    Add Student
                </v-btn>
            </div>
        </div>

        <div class="row">
            <div class="col-xl-12">
                <template>
                    <v-data-table
                            :headers="headers"
                            :items="students"
                            :items-per-page="10"
                            class="elevation-1">

                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                    style="font-weight: bold;"
                                    small
                                    class="mr-2"
                            >
                                mdi-plus
                            </v-icon>
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editStudent(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                    small
                                    @click="removeStudent(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </template>
                <template>
                    <div class="text-center ma-2">
                        <v-snackbar v-model="snackbar">
                            {{ text }}

                            <template v-slot:action="{ attrs }">
                                <v-btn
                                        color="green"
                                        text
                                        v-bind="attrs"
                                        @click="snackbar = false"
                                >
                                    Close
                                </v-btn>
                            </template>
                        </v-snackbar>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { Students } from '../../imports/api/students';


    w_students = Students;
    export default {
        name: 'Students',
        meteor: {
            students() {
                return Students.find({}).fetch();
            }
        },
        data() {
            return {
                student: null,
                dialog: false,
                editMode: false,
                headerText: '',
                snackbar: false,
                text: 'Student removed successfully',
                headers: [
                    {text: 'Name', align: 'start', value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Phone', value: 'phone'},
                    {text: 'Date of birth', value: 'dateOfBirth'},
                    {text: 'Subjects', value: 'subjects'},
                    {text: 'Actions', value: 'actions', sortable: false}
                ]
            }
        },
        methods: {
            editStudent(student) {
                this.$router.push( '/edit-student/' + student._id );
            },
            removeStudent(student) {
                if (confirm('Are you sure you want to delete this student?')) {
                    if (Students.findOne({ _id: student._id  })) {
                        Students.remove({ _id: student._id  });
                        this.snackbar = true;
                    }
                }
            }
        }
    }
</script>


<style scoped>
    .v-btn-add {
        background-color: #42b983!important;
        color: #fff!important;
        padding: 20px!important;
        outline: 0;
    }
    .mdi-plus::before {
        font-weight: bold;
    }
</style>
