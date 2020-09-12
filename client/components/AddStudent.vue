<template>


    <div class="row">
        <div class="offset-xl-2 col-xl-8">
            <v-card style="padding: 40px">
                <div class="row">
                    <div class="col-xl-12" style="font-weight: bold;">
                        Add Student
                    </div>
                </div>

                <v-form ref="form" v-model="valid">
                    <div class="row">
                        <div class="col-xl-12">
                            <v-text-field
                                    :rules="fieldRules"
                                    v-model="student.name"
                                    outlined
                                    label="Name*"
                                    required>
                            </v-text-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12">
                            <v-text-field
                                    :rules="fieldRules"
                                    v-model="student.email"
                                    outlined
                                    label="Email*"
                                    rows="3">
                            </v-text-field>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-7">
                            <v-text-field
                                    :rules="fieldRules"
                                    v-model="student.phone"
                                    outlined
                                    label="Phone*"
                                    rows="3">
                            </v-text-field>
                        </div>
                        <div class="col-xl-5">
                            <v-text-field
                                    :rules="fieldRules"
                                    v-model="student.dateOfBirth"
                                    outlined
                                    label="Date of Birth*"
                                    rows="3">
                            </v-text-field>
                        </div>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!valid" class="v-btn-save" text @click="addStudent">Save</v-btn>
                        <v-btn class="v-btn-close" text @click="close">Close</v-btn>
                    </v-card-actions>

                </v-form>

            </v-card>
        </div>
    </div>



</template>



<script>
    import { Students } from '../../imports/api/students';
    export default {
        name: 'AddStudent',
        data() {
            return {
                valid: false,
                fieldRules: [ v => !!v || 'This field is required!' ],
                id: 0,
                student: {
                    name: '',
                    email: '',
                    phone: '',
                    dateOfBirth: ''
                }
            }
        },
        methods: {
            addStudent() {
                var student = {
                    name: this.student.name,
                    email: this.student.email,
                    phone: this.student.phone,
                    dateOfBirth: this.student.dateOfBirth,
                    subjects: []
                };
                Students.insert(student);
                this.$router.push('/');
            },
            close() {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    .v-btn-save {
        text-transform: none;
        background-color: #42b983;
        color: #fff !important;
    }

    .v-btn-close {
        text-transform: none;
    }
</style>

