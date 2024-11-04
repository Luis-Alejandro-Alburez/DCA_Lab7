/******************** LABORATORIO III ****************************
 *
 * Modifica la clase Extended (reescríbela) añadiéndole un método match estático.
 * El métoddo debe recuperar el objeto teacher, objeto student y, opcionalmente,
 * el nombre del curso.  Tu tarea es encontrar la correspondencia entre el
 * estudiante y el profesor.
 *
 * En caso de que no se proporcione el nombre del curso, el método debe devolver:
 *
 *    + Una matriz vacía si no hay coincidencias (el profesor no imparte cursos en los
 *      que está interesado el estudiante o imparte cursos de un nivel inferior)
 *    + Una matriz con objetos {course, level}, si el profesor enseña los cursos que le
 *      interesan al estudiante.
 *
 * Si el nombre del curso se pasa como último argumento, entonces el método debe devolver
 * el objeto {course, level} en caso de una coincidencia correcta o undefined en caso contrario.
 *
 * Pruebe su solución utilizando el siguiente código:
 *
 *
 */

class User {
  constructor({ name, surname, email, role }) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.courses = {}; // Stores courses and levels in an object
    this.messages = []; // Message history
  }

  addCourse(course, level) {
    this.courses[course] = level;
    console.log(
      `${this.name} ha agregado el curso: ${course} con nivel: ${level}`
    );
  }

  removeCourse(course) {
    if (this.courses[course]) {
      delete this.courses[course];
      console.log(`${this.name} ha eliminado el curso: ${course}`);
    } else {
      console.log(`El curso ${course} no existe en la lista.`);
    }
  }

  editCourse(course, level) {
    if (this.courses[course]) {
      this.courses[course] = level;
      console.log(
        `${this.name} ha actualizado el curso: ${course} al nivel: ${level}`
      );
    } else {
      console.log(`El curso ${course} no existe en la lista.`);
    }
  }

  sendMessage(from, message) {
    const fullMessage = `De: ${from.name} (${from.role})\nPara: ${this.name} (${this.role})\nMensaje: ${message}\n`;
    this.messages.push(fullMessage);
    this.sendEmail(from, this, message);
  }

  sendEmail(from, to, message) {
    console.log(`Simulando envío de email de ${from.name} a ${to.name}...`);
  }

  showMessagesHistory() {
    if (this.messages.length === 0) {
      console.log(`${this.name} no ha recibido mensajes.`);
    } else {
      console.log(`Historial de mensajes para ${this.name}:`);
      this.messages.forEach((message, index) => {
        console.log(`Mensaje ${index + 1}:\n${message}`);
      });
    }
  }
}

// ExtendedUser class that extends User
class ExtendedUser extends User {
  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  set fullName(fullName) {
    [this.name, this.surname] = fullName.split(" ");
  }

  // Static method to find course match between teacher and student
  static match(teacher, student, courseName = null) {
    if (courseName) {
      // Check for specific course match
      if (
        teacher.courses[courseName] &&
        student.courses[courseName] <= teacher.courses[courseName]
      ) {
        return { course: courseName, level: student.courses[courseName] };
      }
      return undefined;
    } else {
      // Check for any course match
      let matches = [];
      for (let course in student.courses) {
        if (
          teacher.courses[course] &&
          student.courses[course] <= teacher.courses[course]
        ) {
          matches.push({ course: course, level: student.courses[course] });
        }
      }
      return matches;
    }
  }
}

// Teacher and Student classes extending ExtendedUser
class Teacher extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "teacher" });
  }
}

class Student extends ExtendedUser {
  constructor({ name, surname, email }) {
    super({ name, surname, email, role: "student" });
  }
}

let student1 = new Student({
  name: "Rafael",
  surname: "Fife",
  email: "rfife@rhyta.com",
});
let student2 = new Student({
  name: "Kelly",
  surname: "Estes",
  email: "k_estes@dayrep.com",
});
let teacher1 = new Teacher({
  name: "Paula",
  surname: "Thompkins",
  email: "PaulaThompkins@jourrapide.com",
});

student1.addCourse("maths", 2);
student1.addCourse("physics", 4);
teacher1.addCourse("maths", 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse("maths", 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse("physics", 4);
match = ExtendedUser.match(teacher1, student1, "physics");
console.log(match); // -> {course: 'physics', level: 4}
