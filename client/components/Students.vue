<template>
    <div>
        <div class="row">
            <div class="col-xl-12">
                <v-btn
                        @click="onAddStudent()"
                       small
                       text
                       class="v-btn-add">
                    Add Student
                </v-btn>
            </div>
        </div>

        <AddSubjectDialog
                v-on:close="closeAddSubjectDialog"
                v-on:save="addSubject"
                v-model="dialog"/>

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
                                    @click="openAddSubjectDialog(item)"
                            >
                                mdi-plus
                            </v-icon>
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="onEditStudent(item)"
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
    import { Subjects } from '../../imports/api/subjects';
    import AddSubjectDialog from '../dialogs/AddSubjectDialog'

    w_students = Students;
    w_subjects = Subjects;

    export default {
        name: 'Students',
        components: { AddSubjectDialog },
        meteor: {
            students() {
                return Students.find({}).fetch();
            },
            subjects() {
                return Subjects.find({}).fetch();
            }
        },
        data() {
            return {
                student: null,
                dialog: false,
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
            onAddStudent() {
                this.$router.push( '/add-student/');
            },
            onEditStudent(student) {
                this.$router.push( '/edit-student/' + student._id );
            },
            removeStudent(student) {
                if (confirm('Are you sure you want to delete this student?')) {
                    var getStudent = Students.findOne({ _id: student._id });
                    if (getStudent !== undefined) {

                        getStudent.subjects.forEach(subject => {
                            var regex = new RegExp(["^", subject, "$"].join(""), "i");
                            var getSubject = Subjects.findOne({ name: regex });
                            Subjects.update(
                                { _id: getSubject._id },
                                {$pull : {'students': getStudent.name }}
                            );
                        });

                        Students.remove({ _id: getStudent._id });
                        this.snackbar = true;
                    }
                }
            },
            addSubject(name) {
                this.dialog = false;
                var getStudent = Students.findOne({ _id: this.student._id });

                if (getStudent.subjects.length === 0) {
                    Students.update({_id: getStudent._id}, {
                        $push: { 'subjects': name }
                    });
                } else {
                    var isDuplicate = false;
                    getStudent.subjects.forEach(x => {
                        if (x.toUpperCase() === name.toUpperCase()) {
                            isDuplicate = true;
                        }
                    });

                    if (!isDuplicate) {
                        Students.update({_id: getStudent._id}, {
                            $push: { 'subjects': name }
                        });
                    }
                }
                this.addToSubjectCollection(name, getStudent.name);
            },
            addToSubjectCollection(subjectName, studentName) {
                var regex = new RegExp(["^", subjectName, "$"].join(""), "i");
                var getSubject = Subjects.findOne({ name: regex });
                if (getSubject === undefined) {
                    var subject = { name: subjectName, students: [studentName] };
                    Subjects.insert(subject);
                } else {
                    Subjects.update({_id: getSubject._id}, {
                        $push: { 'students': studentName }
                    });
                }
            },
            openAddSubjectDialog(student) {
                this.student = student;
                this.dialog = true;
            },
            closeAddSubjectDialog() {
                this.dialog = false;
                this.student = null;
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
