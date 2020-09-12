<template>
    <v-form ref="form"
            v-model="valid">
        <v-row justify="center">
            <v-dialog v-model="value" persistent max-width="700px">

                <v-card>
                    <v-card-title>
                        <span> {{ headerText }} </span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>

                            <div class="row">
                                <div class="col-xl-12">
                                    <v-text-field
                                            :rules="fieldRules"
                                            v-model="name"
                                            outlined
                                            label="Name*"
                                            required>
                                    </v-text-field>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-12">
                                    <v-textarea
                                            :rules="fieldRules"
                                            v-model="email"
                                            outlined
                                            label="Email*"
                                            rows="3">
                                    </v-textarea>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xl-7">
                                    <v-textarea
                                            :rules="fieldRules"
                                            v-model="phone"
                                            outlined
                                            label="Phone*"
                                            rows="3">
                                    </v-textarea>
                                </div>
                                <div class="col-xl-5">
                                    <v-textarea
                                            :rules="fieldRules"
                                            v-model="dateOfBirth"
                                            outlined
                                            label="Date of Birth*"
                                            rows="3">
                                    </v-textarea>
                                </div>
                            </div>


                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!valid" class="v-btn-save" text @click="editStudent">Save</v-btn>
                        <v-btn class="v-btn-close" text @click="$emit('close', false)">Close</v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-row>
    </v-form>
</template>

<script>

    export default {
        name: 'UpdateStudentDialog',
        props: ['value', 'editMode', 'headerText', 'student'],
        data() {
            return {
                dialog: false,
                valid: false,
                fieldRules: [ v => !!v || 'This field is required!' ],
                name: '',
                email: '',
                phone: '',
                dateOfBirth: ''
            }
        },
        created() {
            if (this.student !== undefined) {
                this.initialStudentObject();
            }
        },
        methods: {
            initialStudentObject() {
                // this.name = this.student.name;
                // this.email = this.student.email;
                // this.phone = this.student.phone;
                // this.dateOfBirth = this.student.dateOfBirth;
            },
            editStudent() {
                var student;
                student = {
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    dateOfBirth: this.dateOfBirth
                };
                if (!this.editMode) {
                    this.$refs.form.reset();
                }

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

