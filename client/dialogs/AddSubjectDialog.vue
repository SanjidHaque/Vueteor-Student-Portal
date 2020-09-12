<template>
    <v-form ref="form" v-model="valid">
        <v-row justify="center">
            <v-dialog v-model="value" persistent max-width="400px">

                <v-card>
                    <v-card-title>
                        <span style="font-weight: bold;"> Add Subject </span>
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

                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!valid" class="v-btn-save" text @click="onAddSubject">Save</v-btn>
                        <v-btn class="v-btn-close" text @click="closeDialog">Close</v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-row>
    </v-form>
</template>

<script>

    export default {
        name: 'AddSubjectDialog',
        props: ['value'],
        data() {
            return {
                dialog: false,
                valid: false,
                fieldRules: [ v => !!v || 'This field is required!' ],
                name: '',
            }
        },
        methods: {
            onAddSubject() {
                this.$emit('save', this.name);
                this.$refs.form.reset();
            },
            closeDialog() {
                this.$emit('close', false);
                this.$refs.form.reset();
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

