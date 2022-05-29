import Course from "./course/course_model.js";
import CourseProfilJoint from "./joint/course_profil_model.js";
import ProfilSiswa from "./siswa/profil_siswa_model.js";
import MateriJoint from "./joint/materi_profil_model.js";
import CourseMateri from "./course/course_materi_model.js";
import BadgesProfilJoint from "./joint/badges_profil_model.js";
import Badges from "./badges/badges_model.js";
import CourseExercise from "./course/course_exercise_model.js";
import ExerciseJoint from "./joint/exercise_profil_model.js";

ProfilSiswa.belongsToMany(Course, {
    through: CourseProfilJoint,
    foreignKey: 'id_profil_siswa'
});

Course.belongsToMany(ProfilSiswa, {
    through: CourseProfilJoint,
    foreignKey: 'id_course'
});

/////

CourseProfilJoint.belongsTo(Course, {
    foreignKey: 'id_course'
})

Course.hasMany(CourseProfilJoint, {
    foreignKey: 'id_course'
})

/////

MateriJoint.belongsTo(CourseMateri, {
    foreignKey: 'id_materi'
})

CourseMateri.hasMany(MateriJoint, {
    foreignKey: 'id_materi'
})

/////

ProfilSiswa.belongsToMany(CourseMateri, {
    through: MateriJoint,
    foreignKey: 'id_profil_siswa'
});


CourseMateri.belongsToMany(ProfilSiswa, {
    through: MateriJoint,
    foreignKey: 'id_materi'
});

/////

ProfilSiswa.belongsToMany(Badges, {
    through: BadgesProfilJoint,
    foreignKey: 'id_profil_siswa'
});


Badges.belongsToMany(ProfilSiswa, {
    through: BadgesProfilJoint,
    foreignKey: 'id_badges'
});


/////

BadgesProfilJoint.belongsTo(Badges, {
    foreignKey: 'id_badges'
})

Badges.hasMany(BadgesProfilJoint, {
    foreignKey: 'id_badges'
})


/////

ProfilSiswa.belongsToMany(CourseExercise, {
    through: ExerciseJoint,
    foreignKey: 'id_profil_siswa'
});

CourseExercise.belongsToMany(ProfilSiswa, {
    through: ExerciseJoint,
    foreignKey: 'id_exercise'
});

/////

ExerciseJoint.belongsTo(CourseExercise, {
    foreignKey: 'id_exercise'
})

CourseExercise.hasMany(ExerciseJoint, {
    foreignKey: 'id_exercise'
})


export {
    CourseProfilJoint,
    MateriJoint,
    BadgesProfilJoint,
    ExerciseJoint
};