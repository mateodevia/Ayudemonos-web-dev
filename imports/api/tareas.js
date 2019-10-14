import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { GruposBack } from "./grupos";
export const Tareas = new Mongo.Collection("tareas");

if (Meteor.isServer) {
  Meteor.publish("tareas", () => {
    let tareas = Tareas.find({}).fetch();

    for (i in tareas) {
      let tarea = tareas[i];
      let hoy = new Date();
      let diferencia = hoy - tarea.exp;
      let sePaso = diferencia > 0;
      if (sePaso && tarea.porcentageDone === 0) {
        Meteor.call("tareas.pedirAyuda", tarea._id);
        console.log("monto y verifico");
      }
    }

    return Tareas.find({});
  });
}

Meteor.methods({
  "tareas.insert": (
    nombreP,
    descriptionP,
    groupId,
    dia,
    mes,
    año,
    usuarios
  ) => {
    let dueDateP = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
    let d = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
    d.setDate(d.getDate() - 2);
    console.log(año, mes, dia);

    console.log("original", dueDateP);
    console.log("exp", d);

    Tareas.insert({
      nombre: nombreP,
      description: descriptionP,
      fechaCreacion: new Date(),
      currentOwners: usuarios,
      creator: Meteor.user.userId,
      porcentageDone: 0,
      hasTraspased: false,
      delayed: false,
      grupoId: groupId,
      dueDate: dueDateP,
      exp: d
    });
  },
  "tareas.tomar": taskId => {
    let tarea = Tareas.findOne({ _id: taskId });
    let encontro = false;

    for (let i = 0; i < tarea.currentOwners.length; i++) {
      if (tarea.currentOwners[i] == Meteor.user().username) {
        encontro = true;
      }
    }
    if (encontro) {
      Tareas.update({ _id: taskId }, { $set: { delayed: false } });
    } else {
      Tareas.update(
        { _id: taskId },
        { $push: { currentOwners: Meteor.user().username } }
      );
      Tareas.update({ _id: taskId }, { $set: { delayed: false } });
    }

    //Tareas.update({ "_id" : ObjectId("5d9eada4349da0a208beedab") }, { $push: { currentOwners: this.userId } });
    //Tareas.update({ "_id" : ObjectId("5d9eada4349da0a208beedab") }, { $set:{delayed: false } });
  },
  "tareas.pedirAyuda": taskId => {
    Tareas.update({ _id: taskId }, { $set: { delayed: true } });
    /*  if (Meteor.isServer) {
    Meteor.publish("tareasAyuda", () => {

      var groupsIbelong= GruposBack.find({usuarios:Meteor.user.userId}, { sort: { createdAt: -1 } }).fetch()
        for (group in groupsIbelong){

                var resp=[];
                resp.push(Tareas.find({
                    $and:[{delayed},{groupId:group}]
                }))
                resp.push(Tareas.find({groupId:group }));

        }
        return resp;

    });
  }*/
  },
  "tareas.marcarPorcentaje": (taskId, porcent) => {
    Tareas.update({ _id: taskId }, { $set: { porcentageDone: porcent } });
  }
});
